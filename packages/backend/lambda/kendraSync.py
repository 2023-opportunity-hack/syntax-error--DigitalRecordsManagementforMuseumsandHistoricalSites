import json 
import os
import boto3

kendra_index = os.environ['AWS_KENDRA']
Data_Source_Id = os.environ['KENDRA_DATA_SOURCE']

client = boto3.client('kendra')

def handler(event, context):
    
    response = client.start_data_source_sync_job(
        Id=Data_Source_Id,
        IndexId=kendra_index
    )   
    result  = buildResponse(response)
    print(result)
    
    return result

def buildResponse(body):
    return {
        "statusCode" : 200,
        "headers" : {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json'
        },
        "body" : json.dumps({
            "response": body
        })
    }
    
