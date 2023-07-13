from DowellFunctions.Dowell_Connection import dowellConnection
from math import factorial

def findPermutation(data):
    outputData = {}
    inserted_id = data['inserted_id']
    nextVariable = data['nextVariable']
    if(inserted_id == ""):
        n = data['n']
        r = data['r']
        outputData = {
            'n':n,
            'r':r,
            'numberOfPermutations' : int(factorial(n)/factorial(n-r)),
            'permutationsVariables' : [nextVariable],
            'success': True,
        }
        callDowellConnection = dowellConnection('insert', outputData, None)
        outputData['inserted_id'] = callDowellConnection['inserted_id']
    else:
        dowellConnectionOutput = dowellConnection('fetch', {
                '_id':inserted_id,
            } ,None)

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
                    'inserted_id': inserted_id,
                    'success': True,
                }
            else:
                outputData = {
                    'message': f"{r} items are already selected, here is your final permutation {permutationsVariables}",
                    'n' : n,
                    'r' : r,
                    'numberOfPermutations' : numberOfPermutations,
                    'finalPermutation' : permutationsVariables,
                    'inserted_id' : inserted_id,
                    'success': True,
                }
        else:
            outputData['success'] = True
            outputData['message'] = f"Provided inserted_id : {inserted_id} is not present in the database."
    return outputData

def savePermutation(data):
    inserted_id = data['inserted_id']
    dowellConnection('update', {
            '_id':inserted_id,
        },{
            'permutationsVariables':data['selectedPermutation'],
        })

    outputData = {
        'message':f"Selected permutation {data['selectedPermutation']} is saved successfully.",
        'success': True
    }
    return outputData