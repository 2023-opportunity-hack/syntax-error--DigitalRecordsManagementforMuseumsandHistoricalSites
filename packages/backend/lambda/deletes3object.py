import json
import boto3
import os

s3_client = boto3.client('s3')

bucket_name = os.environ['BUCKET_NAME']

def handler(event, context):
    
    body_ = event['body']
    print(body_)
    print(type(body_))
    
    body_1 = json.loads(body_)
    print(body_1)
    print(type(body_1))
    
    object_Id = body_1.get("key")
    print(object_Id)
    
    object_metadata_Id =  object_Id + ".metadata.json"
    print(object_metadata_Id)
    
    # deleting the object as per object key
    response_object_Id = s3_client.delete_object(
        Bucket= bucket_name,
        Key= object_Id,
    )
    print(response_object_Id)
    
    # deleting the metadata.json object 
    response_object_metadata_Id = s3_client.delete_object(
        Bucket= bucket_name,
        Key= object_metadata_Id,
    )
    print(response_object_metadata_Id)
    
    response = buildResponse("Success")
    
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
    