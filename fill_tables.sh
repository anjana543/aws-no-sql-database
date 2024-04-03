#!/bin/bash

# Insert test data into Products table
aws dynamodb put-item \
  --table-name Products \
  --item '{
    "id": {"S": "1"},
    "title": {"S": "Product 1"},
    "description": {"S": "Description for Product 1"},
    "price": {"N": "100"}
  }'

# Insert test data into Stocks table
aws dynamodb put-item \
  --table-name Stocks \
  --item '{
    "product_id": {"S": "1"},
    "count": {"N": "50"}
  }'
