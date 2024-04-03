const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME_PRODUCTS = process.env.TABLE_NAME_PRODUCTS;
const TABLE_NAME_STOCKS = process.env.TABLE_NAME_STOCKS;

exports.handler = async (event) => {
    try {
        const { productId } = event.pathParameters;
        
        const product = await dynamoDB.get({ 
            TableName: TABLE_NAME_PRODUCTS,
            Key: { id: productId }
        }).promise();

        // Implement logic to fetch stock data for the product
        
        return {
            statusCode: 200,
            body: JSON.stringify(product),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching product', error }),
        };
    }
};
