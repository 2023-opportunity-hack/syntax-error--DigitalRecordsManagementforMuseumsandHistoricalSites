# S3 Object Metadata Uploader

This documentation outlines the functionality of a Python script designed to upload metadata files for objects in an Amazon S3 bucket. The script utilizes the AWS SDK for Python (Boto3) and AWS Lambda to automate this process.

## Prerequisites

Before using this script, ensure you have the following prerequisites in place:

- Python environment with the required dependencies installed.
- Appropriate AWS IAM (Identity and Access Management) permissions to access and modify S3 objects.
- AWS Lambda set up and configured with the necessary permissions to execute the script.

## Script Overview

The Python script is designed to run as an AWS Lambda function. It responds to S3 events triggered by new object uploads to a specified bucket. The script extracts information from the object key, creates a JSON metadata file, and uploads it back to the same S3 bucket.

### Script Components

- `bucket_name`: The name of the target S3 bucket. It's retrieved from an environment variable.

- `handler(event, context)`: The main Lambda function handler that gets triggered by S3 events. It performs the following steps:
  - Extracts information from the S3 event, including the object key.
  - Parses the object key to obtain attribute and attribute value.
  - Creates a JSON metadata file with the extracted data.
  - Uploads the metadata file back to the same S3 bucket.

- `buildResponse(body)`: A helper function to format the Lambda function response. It returns a JSON response with appropriate headers and a status code.

## Usage

1. Ensure you have the AWS CLI and AWS SDK for Python (Boto3) installed.

2. Configure your AWS credentials using the AWS CLI:
