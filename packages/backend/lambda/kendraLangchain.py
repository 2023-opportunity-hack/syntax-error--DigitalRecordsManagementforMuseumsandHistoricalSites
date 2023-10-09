import json 
import os
from langchain.retrievers import AmazonKendraRetriever
# from lib.kendra_index_retriever import KendraIndexRetriever
from langchain.llms import AI21
from langchain.llms.bedrock import Bedrock
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
import array as arr

kendra_index = os.environ['AWS_KENDRA']

api_key = "9X0fitzYDmsI7GK67DPX2PFaXAV2bfx8"

def create_chain():
    
    region = "us-east-1" # defining the aws region 
    kendra_index_id = kendra_index # providing the aws kendra index id


    #  Using the imported AWS Kendra Retreiver in the run chain function to use as a retreiver in the RetrievalQA function
    retriever = AmazonKendraRetriever(index_id=kendra_index)
    
    # LLM declared with default parameters
    AI21_model = AI21(ai21_api_key=api_key) 
    
    # Defining the prompt template with variables of "Context" & "Question"
    prompt_template = """
    The following is a friendly conversation between a human and an AI. 
    The AI is talkative and provides lots of specific details from its context.
    If the AI does not know the answer to a question, it truthfully says it 
    does not know.
    {context}
    Instruction: Based on the above documents, provide a detailed answer for, {question} Answer "don't know" if not present in the document. Solution:
    """
    # referencing the prompt tempelate
    PROMPT = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )
    # passing the prompt as a variable in the RetrievalQA function
    chain_type_kwargs = {"prompt": PROMPT}
    
    # returning the RetrievalQA chain with all the parameters
    return RetrievalQA.from_chain_type(
        AI21_model, 
        chain_type="stuff", 
        retriever=retriever, 
        chain_type_kwargs=chain_type_kwargs, 
        return_source_documents=True
    )
    
# function for starting the chain 
def start_chain(chain, prompt: str):
    result = chain(prompt)
    # To make it compatible with samples
    return {
        "answer": result['result'],
        "source_documents": result['source_documents']
    }
    
def handler(event, context):
    
    print(json.dumps(event))
    
    body_ = json.loads(event['body'])
    
    print(body_)
    
    prompt_ = body_['prompt']
    
    chain = create_chain()
    
    result = start_chain(chain, prompt_)
    
    print(result)
    
    print(json.dumps(result['answer']))
    
    response = result['answer']
    
    sources_list = []
    
    
    if 'source_documents' in result:
        print('Sources:')
        for d in result['source_documents']:
            sources_list.append(d.metadata)
            print(d.metadata)

    result  = buildResponse(response, sources_list)
    
    return result


def buildResponse(body, body_2):
    
    source_1 = body_2[0]
    source_2 = body_2[1],
    source_3 = body_2[2]
    
    return {
        "statusCode" : 200,
        "headers" : {
            'Access-Control-Allow-Origin' : '*',
            'Content-Type' : 'application/json'
        },
        "body" : json.dumps({
            "answer": body,
            "sources": body_2
        })
    }