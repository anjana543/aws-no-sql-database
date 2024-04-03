const AWS = require('aws-sdk');

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  try {
    const productData = JSON.parse(event.body);

    if (!productData.id || !productData.title || !productData.description || !productData.price) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required product data' })
      };
    }

    const params = {
      TableName: process.env.TABLE_PRODUCTS,
      Item: productData
    };

    await docClient.put(params).promise();

    return {
      statusCode: 200, // Created
      body: JSON.stringify({ message: 'Product created successfully' })
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
};
