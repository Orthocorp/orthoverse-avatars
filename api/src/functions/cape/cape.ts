import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import fs from 'fs'
import Jimp from 'jimp'
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

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked cape function')
 
// 🌲 incoming request GET xxx /skin?address=0x0000000000000000000000000000000000000002
// needs rewriting when authentication works

  try {
    const {id} = event.queryStringParameters
    if ((id === undefined || isNaN(id)) || (parseInt(id) > 13188 || parseInt(id) < 0)) {
      logger.info('Tried to serve invisible cape')
      Jimp.read('http://localhost:8910/capes/cape_invisible.png').then( (jimpImg) => {
        const dummyB64 = jimpImg.getBase64Async(Jimp.MIME_PNG)
        const img = Buffer.from(dummyB64.split(",")[1], "base64")
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: img
        }
      })
    } else {
      logger.info('Tried to serve cape ' + id)
      jimpImg = await Jimp.read('http://localhost:8910/capes/' + parseInt(id).toString() + '-cape.png').then( jimpImg => {
        const dummyB64 = jimpImg.getBase64Async(Jimp.MIME_PNG)

        const img = Buffer.from(dummyB64.split(",")[1], "base64")

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: img
        }
      })
    }

    logger.info(jimpImg)

    const dummyB64 = jimpImg.getBase64Async(Jimp.MIME_PNG)

    const img = Buffer.from(dummyB64.split(",")[1], "base64")

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: img
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: {
        message: error.message,
      },
    }
  }
}
