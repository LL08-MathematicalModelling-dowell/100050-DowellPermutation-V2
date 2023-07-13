import json
import requests

def dowellConnection(command,field,update_field):
    url = "http://uxlivinglab.pythonanywhere.com"
    payload = json.dumps({
        "cluster": "dowellfunctions",
        "database": "dowellfunctions",
        "collection": "permutations",
        "document": "permutations",
        "team_member_ID": "1195001",
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