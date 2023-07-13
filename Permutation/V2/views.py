from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from V2.PermutationFunction import findPermutation, savePermutation
from DowellFunctions.API_Key_System import processApikey
import json

@csrf_exempt
def permutationsAPI(request, command, api_key):
    if (request.method=="POST"):
        data=json.loads(request.body)
        if(command == "find"):
            validate_api_count = processApikey(api_key)
            data_count = json.loads(validate_api_count)
            if data_count['success'] :
                if data_count['count'] >= 0 :
                    return JsonResponse(findPermutation(data))
                else:
                    return JsonResponse({
                        "success": False,
                        "message": data_count['message'],
                        "credits": data_count['count']
                    })
            else:
                return JsonResponse({
                    "success": False,
                    "message": data_count['message']
                })
        elif(command == 'save'):
            return JsonResponse(savePermutation(data))
        else:
            return JsonResponse({
                "success":True,
                "message": f"{command} is not a valid command, use either 'save' or 'find' command."
            })
    else:
        return HttpResponse("Method Not Allowed")   