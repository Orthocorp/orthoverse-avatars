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
  logger.info('Invoked nameFromAddress function')

  let result

  try {
    const { id } = event.queryStringParameters
    if (
      id === undefined || (id.slice(0,2) !== '0x'|| id.length !== 42)
    ) {
        result = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: {message: "Error: invalid Ethereum address provided"}
        }
    } else if (id === '0x0000000000000000000000000000000000000000') {
        result = {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: {"name": getName('')}
        }
    } else {
      await prisma.$connect()
      const record = await prisma.User.findFirst({
        where: {
          address: id.toLowerCase()
        }
      })
      await prisma.$disconnect();
      // extract cape
      let name
      if (record) {
        logger.info("Found record", record)
        name = record.name
      } else {
        logger.info("No record found")
        name = getName(id.toLowerCase())
      }
      result = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: {"name": name}
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
