import requests

def processApikey(api_key):
    url = 'https://100105.pythonanywhere.com/api/v1/process-api-key/'
    payload = {
        "api_key" : api_key,
        "api_service_id" : "DOWELL100011"
    }
    response = requests.post(url, json=payload)
    return response.text