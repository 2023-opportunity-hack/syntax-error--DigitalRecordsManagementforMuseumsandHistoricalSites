import urllib
import boto3
import os


textract = boto3.client('textract')
s3 = boto3.client('s3')

bucket_name = os.environ['BUCKET_NAME']

def handler(event, context):
    
    
    
    object_key = event['Records'][0]['s3']['object']['key']
    print(object_key)
    
    text_extraction = textract.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': bucket_name,
                'Name': object_key,
            }
        }
    )
    
    page=""
    
    blocks = [x for x in text_extraction['Blocks'] if x['BlockType'] == "LINE"]
    
    for block in blocks:
        page += " " + block['Text']
    
    print(page)
    
    # updated key
    key_val = object_key.rsplit(".")[0]
    
    update_key = key_val + ".txt"
    
    upload_file = s3.put_object(Bucket=bucket_name, Key=update_key, Body=page)
    
    print(upload_file)
    
    return "Success"