import type { APIGatewayEvent } from 'aws-lambda'
import Jimp from 'jimp'

import { logger } from 'src/lib/logger'
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

  // 🌲 incoming request GET xxx /capes?id=[0..13188]
  // needs rewriting when authentication works

  let result

  try {
    const { id } = event.queryStringParameters
    if (
      id === undefined ||
      isNaN(id) ||
      parseInt(id) > 13188 ||
      parseInt(id) < 0
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
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
              body: img,
            }
            console.log(result)
          })
        }
      )
    } else {
      logger.info('Tried to serve cape ' + id)
      jimpImg = await Jimp.read(
        'http://localhost:8910/capes/' + parseInt(id).toString() + '-cape.png'
      ).then((jimpImg) => {
        jimpImg.getBase64Async(Jimp.MIME_PNG).then((dummyB64) => {
          const img = Buffer.from(dummyB64.split(',')[1], 'base64')
          logger.info('Trying to send page for identified cape')
          result = {
            statusCode: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            body: img,
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
