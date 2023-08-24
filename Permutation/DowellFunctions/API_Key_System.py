import requests
def processApikey(api_key):
    url = f'https://100105.pythonanywhere.com/api/v3/process-services/?type=api_service&api_key={api_key}'
    payload = {
        "service_id": "DOWELL10008"
    }
    response = requests.post(url, json=payload)
    return response.text
