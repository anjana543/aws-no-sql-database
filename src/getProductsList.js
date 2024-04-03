const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME_PRODUCTS = process.env.TABLE_NAME_PRODUCTS;
const TABLE_NAME_STOCKS = process.env.TABLE_NAME_STOCKS;

exports.handler = async (event) => {
    try {
        // Fetch products from the Products table
        const productsData = await dynamoDB.scan({ TableName: TABLE_NAME_PRODUCTS }).promise();
        const products = productsData.Items;

        // Fetch stocks from the Stocks table
        const stocksData = await dynamoDB.scan({ TableName: TABLE_NAME_STOCKS }).promise();
        const stocks = stocksData.Items;

        // Create a map to store stock information using product IDs as keys
        const stockMap = {};
        for (const stock of stocks) {
            stockMap[stock.product_id] = stock;
        }

        // Iterate through products array and add stock information to each product
        const productsWithStock = products.map(product => {
            const stockInfo = stockMap[product.id];
            const count = stockInfo ? stockInfo.count : 0; // If stock info exists, add count, otherwise default to 0
            return { ...product, count };
        });

        // Return the combined array of products with stock information
        return {
            statusCode: 200,
            body: JSON.stringify(productsWithStock)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching products', error })
        };
    }
};
