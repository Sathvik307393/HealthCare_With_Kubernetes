import dynamoose from 'dynamoose'

import rawModels from './models/index.js'

export default function dynamoDbFactory ({ config, logger }) {
  const storage = {}

  const defineModel = (model) => {
    storage[model.modelName] = model.setupModel({ logger })
  }

  const setup = () => {
    try {
      if (!config.isProd) {
        dynamoose.aws.sdk.config.update({
          accessKeyId: config.dynamo.aws_access_key_id,
          region: config.dynamo.aws_region,
          secretAccessKey: config.dynamo.aws_secret_access_key,
        })

        dynamoose.aws.ddb.local(config.dynamo.endpoint)
      }

      dynamoose.aws.sdk.config.update({
        httpOptions: {
          timeout: Number(config.dynamo.timeout),
          connectTimeout: Number(config.dynamo.connectTimeout),
        },
        maxRetries: Number(config.dynamo.maxRetries),
      })

      Object.values(rawModels)
        .forEach(defineModel)

      logger.info({
        description: 'DynamoDB initialized successfully',
      })

      return storage
    } catch (error) {
      logger.warn({
        description: 'DynamoDB initialization failed - proceeding without DynamoDB',
        error: error.message,
      })

      // Don't throw - DynamoDB is optional for auth/login flow
      return storage
    }
  }

  setup()

  return {
    storage,
    setup,
  }
}
