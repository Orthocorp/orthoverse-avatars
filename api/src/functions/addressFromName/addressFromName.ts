import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
import { getName } from 'src/values/generateNames'
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
export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked addressFromName function')

  let result

  try {
    const { name } = event.queryStringParameters
    if ( name === undefined || name.length < 2) {
      result = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: {message: "Error: invalid name provided"}
      }
    } else if (name.slice(0,2) === 'Gæ') {
        // request for a guest account received
        result = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: {"address": "0x0000000000000000000000000000000000000000"}
        }
    } else {
      // try to get an address for name
      await prisma.$connect()
      const record = await prisma.User.findFirst({
        where: {
          name
        }
      })
      await prisma.$disconnect();
      let address
      if (record) {
        // we found a name
        logger.info("Found record", record)
        address = record.address
        result = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: {"address": address}
        }
      } else {
        // we didn't find a name, so create a record for this new ethereum address
        logger.info("No record found for " + name)
        // add new user to database for the given address
        result = {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: {"message": "Address lookup for non-existent name"}
        }
      }
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
