import json
import boto3
import os

s3_client = boto3.client('s3')

bucket_name = os.environ['BUCKET_NAME']

def handler(event, context):
    
    object_list = []
    
    bucket = s3_client
    
    objects_s3 = bucket.list_objects_v2(Bucket="backendstack-devpchkendrasource5961c0d7-1h7cpkjavn0ew")
        
    if 'Contents' in objects_s3:
        for obj in objects_s3['Contents']:
            if obj['Key'].endswith('pdf'):
                object_list.append(obj['Key'])
                print(obj['Key'])
    else:
        print("Bucket is empty.")

    response = buildResponse(object_list)
    
    return response

def buildResponse(body):
    return {
        "statusCode" : 200,
        "headers" : {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json'
        },
        "body" : json.dumps(body)
    }
    