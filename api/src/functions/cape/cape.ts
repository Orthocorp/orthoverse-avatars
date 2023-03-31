import type { APIGatewayEvent } from 'aws-lambda'
import Jimp from 'jimp'
import { logger } from 'src/lib/logger'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// import { serfSkins} from 'src/values/serfSkins'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

export const handler = async (event: APIGatewayEvent) => {
  logger.info('Invoked cape function')

  // 🌲 incoming request GET xxx /capes?id=<ethereum address>
  // needs rewriting when authentication works

  let result

  try {
    const { id } = event.queryStringParameters
    if (
      id === undefined  || (id.slice(0,2) !== '0x'|| id.length !== 42)
    ) {
      logger.info('Tried to serve invisible cape')
      Jimp.read('http://localhost:8910/capes/cape_invisible.png').then(
        (jimpImg) => {
          jimpImg.getBase64Async(Jimp.MIME_PNG).then((dummyB64) => {
            const img = Buffer.from(dummyB64.split(',')[1], 'base64')
            logger.info('Trying to send page for no cape')
            result = {
              statusCode: 200,
              headers: {
                'Content-Type': 'image/png',
                'Access-Control-Allow-Origin': '*',
              },
              body: img,
              isBase64Encoded: true
            }
            console.log(result)
          })
        }
      )
    } else {
      logger.info('Trying to serve cape for user ' + id)
      // get cape ID from database
      await prisma.$connect()
      const record = await prisma.User.findFirst({
        where: {
          address: id.toLowerCase()
        }
      })
      await prisma.$disconnect();
      // extract cape
      let cape_name
      if (record) {
        logger.info("Found a cape record")
        cape_name = record.cape
      } else {
        logger.info("No record found for " + id)
        cape_name = 'cape_invisible.png'
      }
      jimpImg = await Jimp.read(
        'http://localhost:8910/capes/' + cape_name
      ).then((jimpImg) => {
        jimpImg.getBase64Async(Jimp.MIME_PNG).then((dummyB64) => {
          const img = Buffer.from(dummyB64.split(',')[1], 'base64')
          logger.info('Trying to send page for identified cape')
          result = {
            statusCode: 200,
            headers: {
              'Content-Type': 'image/png',
              'Access-Control-Allow-Origin': '*',
            },
            body: img,
            isBase64Encoded: true
          }
          console.log(result)
        })
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: {
        message: error.message,
      },
    }
  }

  return result
}
