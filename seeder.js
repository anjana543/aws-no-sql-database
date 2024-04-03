const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const productData = [
    { 
        id: '123e4567-e89b-12d3-a456-426614174000', 
        title: 'Awesome Product 1',
        description: 'This is a great product you need!', 
        price: 19.99 
    },
];

const stockData = [
    { 
        product_id: '123e4567-e89b-12d3-a456-426614174000', 
        count: 100 
    },
];

async function populateTables() {
    try {
        for (const product of productData) {
            await docClient.put({ TableName: 'Products', Item: product }).promise();
        }

        for (const stock of stockData) {
            await docClient.put({ TableName: 'Stocks', Item: stock }).promise();
        }

        console.log('Tables populated successfully!');
    } catch (error) {
        console.error('Error populating tables:', error);
    }
}

populateTables();
