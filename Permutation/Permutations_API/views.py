from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
import json
import requests
from math import factorial

def get_event_id():
    url="https://uxlivinglab.pythonanywhere.com/create_event"
    data={
        "platformcode":"FB" ,
        "citycode":"101",
        "daycode":"0",
        "dbcode":"pfm" ,
        "ip_address":"192.168.0.41",
        "login_id":"lav",
        "session_id":"new",
        "processcode":"1",
        "location":"22446576",
        "objectcode":"1",
        "instancecode":"100051",
        "context":"afdafa ",
        "document_id":"3004",
        "rules":"some rules",
        "status":"work",
        "data_type": "learn",
        "purpose_of_usage": "add",
        "colour":"color value",
        "hashtags":"hash tag alue",
        "mentions":"mentions value",
        "emojis":"emojis",
    }
    r=requests.post(url,json=data).json()
    return r["event_id"]

def dowellConnection(data):
    url = "http://uxlivinglab.pythonanywhere.com"
    command = data['command']
    field = data['field']
    update_field = data['update_field']
    payload = json.dumps({
        "cluster": "Documents",
        "database": "Documentation",
        "collection": "permutation",
        "document": "permutation",
        "team_member_ID": "100084007",
        "function_ID": "ABCDE",
        "command": command,
        "field": field,
        "update_field": update_field,
        "platform": "bangalore"
        })
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.request("POST", url, headers=headers, data=payload).json()
    data = json.loads(response)
    return data

def permutationsFunction(data):
    outputData = {}
    inserted_id = data['inserted_id']
    if(data['command']=='findPermutation'):
        nextVariable = data['nextVariable']
        if(inserted_id == None):
            n = data['n']
            r = data['r']
            outputData = {
                'eventId':get_event_id(),
                'n':n,
                'r':r,
                'numberOfPermutations' : int(factorial(n)/factorial(n-r)),
                'permutationsVariables' : [nextVariable],
            }
            callDowellConnection = dowellConnection({
                'command':'insert',
                'field':outputData,
                'update_field':None,
            })
            outputData['inserted_id'] = callDowellConnection['inserted_id']
        else:
            dowellConnectionOutput = dowellConnection({
                'command' : 'fetch',
                'update_field' : None,
                'field':{
                    '_id':inserted_id,
                },
            })
            if(dowellConnectionOutput['isSuccess'] == True):
                permutationsVariables = dowellConnectionOutput['data'][0]['permutationsVariables']
                n = dowellConnectionOutput['data'][0]['n']
                r = dowellConnectionOutput['data'][0]['r']
                numberOfPermutations = dowellConnectionOutput['data'][0]['numberOfPermutations']
                if(len(permutationsVariables) < r):
                    permutationsList = []
                    for j in range(len(permutationsVariables)+1):
                        permutations = list(permutationsVariables)
                        permutations.insert(j, nextVariable)
                        permutationsList.append(permutations)
                    outputData = {
                        'n':n,
                        'r':r,
                        'numberOfPermutations' : numberOfPermutations,
                        'permutationsVariables' : permutationsList,
                    }
                    outputData['inserted_id'] = inserted_id
                else:
                    outputData['message'] = f"{r} items are already selected."
            else:
                outputData['message'] = f"Provided inserted_id : {inserted_id} is not present in the database."
    elif(data['command'] == 'savePermutation'):
        dowellConnection({
            'command':'update',
            'field':{
                '_id':inserted_id,
            },
            'update_field':{
                'permutationsVariables':data['selectedPermutation'],
            }
        })
        outputData['message'] = f"Selected permutation {data['selectedPermutation']} is saved successfully."
    elif(data['command'] == 'showPermutation'):
        dowellConnectionOutput = dowellConnection({
            'command':'fetch',
            'field':{
                '_id':inserted_id,
            },
            'update_field':{
            },
        })
        outputData = {
            'n' : dowellConnectionOutput['data'][0]['n'],
            'r' : dowellConnectionOutput['data'][0]['r'],
            'numberOfPermutations' : dowellConnectionOutput['data'][0]['numberOfPermutations'],
            'permutationsVariables' : dowellConnectionOutput['data'][0]['permutationsVariables'],
            'inserted_id' : dowellConnectionOutput['data'][0]['_id'],
        }
    else:
        outputData['message'] = f"{data['command']} is not a valid command, use command from findPermutation, savePermutation, showPermutation only."
    return outputData

@csrf_exempt
def permutationsAPI(request):
    if (request.method=="POST"):
        requestData=json.loads(request.body)
        outputData = permutationsFunction(requestData)
        return JsonResponse(outputData)
    else:
        return HttpResponse("Method Not Allowed")   

'''
Payload

# findPermutation
data={
    'inserted_id':'63a1fa7308a1b053ce80b5c9',
    'nextVariable':'Audi',
    'n':4,
    'r':2,
    'command':'findPermutation',
}

# savePermutation
data = {
    'inserted_id':'63a1fa7308a1b053ce80b5c9',
    'selectedPermutation':['BMW','Tata'],
    'command':'savePermutation',
}

# showPermutation
data = {
    'inserted_id':'63a1fa7308a1b053ce80b5c9',
    'command':'showPermutation',
}
''' 