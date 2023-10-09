# Kendra Data Source Attribute Updation Lambda

This documentation provides an overview of the AWS Lambda function designed to update Amazon Kendra data source attributes. The Lambda function is written in Python and is intended to be triggered by an API Gateway or another event source.

## Prerequisites

Before using this Lambda function, ensure the following prerequisites are met:

- AWS Lambda function is created and configured.
- Appropriate IAM roles and permissions are set up to allow the Lambda function to interact with Amazon Kendra.
- Environment variables are correctly configured for the Kendra index and data source ID.

## Functionality

The primary purpose of this Lambda function is to update Amazon Kendra data source attributes based on input provided through an API Gateway or another event source. Here's an overview of how it works:

1. The function expects an event containing a JSON payload, which includes an "attribute" field specifying the attribute to be added or updated in the Kendra index.

2. The Lambda function extracts the "attribute" field from the JSON payload and uses it to update the Kendra index's DocumentMetadataConfiguration. It configures the attribute with specific properties for search, including facetable, searchable, displayable, and sortable.

3. After updating the Kendra index, the function initiates a data source synchronization job to ensure that the changes are applied to the indexed data.

4. A success response is generated and returned, indicating that the attribute update and data source synchronization were initiated successfully.

## Environment Variables

The Lambda function relies on the following environment variables:

- `AWS_KENDRA`: Specifies the ID of the Amazon Kendra index to be updated.
- `KENDRA_DATA_SOURCE`: Specifies the ID of the Amazon Kendra data source associated with the index.

Ensure that these environment variables are correctly set before deploying or using the Lambda function.

## Usage

To use this Lambda function to update Amazon Kendra data source attributes:

1. Deploy the Lambda function to your AWS environment.

2. Configure the Lambda function's environment variables with the appropriate Kendra index and data source IDs.

3. Set up an event trigger for the Lambda function, such as an API Gateway endpoint or another event source that provides the necessary JSON payload with the "attribute" field.

4. When the Lambda function is triggered, it will update the Kendra index and start a data source synchronization job automatically.

5. Monitor the Lambda function's logs and responses for successful execution.

## Response Format

The Lambda function returns a JSON response with the following format:

```json
{
    "statusCode" : 200,
    "headers" : {
        'Access-Control-Allow-Origin' : '*',
        'Content-Type' : 'application/json'
    },
    "body" : "Success"
}
