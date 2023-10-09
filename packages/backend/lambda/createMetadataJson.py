import boto3
from botocore.exceptions import ClientError
import os
import json

bucket_name = os.environ['BUCKET_NAME']

def handler(event, context):
    
    print(event)
    
    doc = event['Records'][0]['s3']['object']['key']
    print(doc)
    
     # spliting the key to get various values
    doc_info = doc.split("-",3)
    print(doc_info)
    
    # getting doc attribute
    doc_attribute = doc_info[0]
    print(doc_attribute)
    
    # getting doc attribute value
    doc_attribute_value = doc_info[1]
    print(doc_attribute_value)
    
    
    # creating the file with variables
    attribute_file = {
        "Attributes": {
            doc_attribute: doc_attribute_value
        }
    }
    
    file_metadata_object = json.dumps(attribute_file, indent=4)
    
    file_name_ = doc + ".metadata.json"
    print(file_name_)
    
    s3 = boto3.client("s3")
    
    s3.put_object(
        Body=file_metadata_object,
        Bucket=bucket_name,
        Key=file_name_,
        )
     # upload successful 
    print("Upload Successful")
    
    
    response = "Success"
    
    result = buildResponse(response)
    
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
    

