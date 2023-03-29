import type { APIGatewayEvent } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import { serfSkins } from 'src/values/serfSkins'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

// 🌲 incoming request GET xxx /skin?eth=<ethereum address>
// needs rewriting when authentication works

export const handler = async (event: APIGatewayEvent) => {
  logger.info('Invoked skin function')

  try {
    const { eth } = event.queryStringParameters
    // if no account is provided, or zero address, serve random serf skin
    if (eth === undefined ||
        eth === '0x0000000000000000000000000000000000000000') {
      const dummyB64 = serfSkins[Math.floor((Math.random()*serfSkins.length))]
      const img = Buffer.from(dummyB64.split(',')[1], 'base64')
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/png',
          'Access-Control-Allow-Origin': '*',
        },
        body: img,
        isBase64Encoded: true
      }
    }

    // otherwise look for a saved skin in the database
    logger.info('Trying to serve cape for user ' + eth)
    // get cape ID from database
    await prisma.$connect()
    const record = await prisma.User.findFirst({
      where: {
        address: eth.toLowerCase()
        }
    })
    await prisma.$disconnect();
    // extract skin
    let img
    if (record && record.image !== '') {
        logger.info('Skin is ' + record.image)
        img = Buffer.from(record.image.split(',')[1], 'base64')
    } else {
      logger.info('Did not find a skin for ' + eth)
      const dummyB64 = serfSkins[Number(eth.slice(0,16)) % serfSkins.length]
      img = Buffer.from(dummyB64.split(',')[1], 'base64')
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Access-Control-Allow-Origin': '*',
      },
      body: img,
      isBase64Encoded: true
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
}
