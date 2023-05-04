# Dowell Permutation API Documentation
## Calling Dowell Permutation API
### URL
```py
url = 'https://100050.pythonanywhere.com/permutationapi/api/'
```

### ```1. Use this payload to find permutation ```
#### Request
```py
{
    "inserted_id": "63a2b47c2be81449d3a30d9a", # use "inserted_id": None or null for the first API call.
    "nextVariable":"B",
    "n":4,
    "r":3,
    "command":"findPermutation"
}
```
#### Response
```py
{
  "n": 4,
  "r": 3,
  "numberOfPermutations": 24,
  "permutationsVariables": [
    [
      "B",
      "A"
    ],
    [
      "A",
      "B"
    ]
  ],
  "inserted_id": "63a2b47c2be81449d3a30d9a"
}
```
### ```2. Use this payload to save permutation ```
#### Request
```py
{
    "inserted_id":"63a2b47c2be81449d3a30d9a",
    "selectedPermutation":    [
      "A",
      "B"
    ],
    "command":"savePermutation"
}
```
#### Response
```py
{
  "message": "Selected permutation ['A', 'B'] is saved successfully."
}
```
### ```3. Use this payload to show permutation ```
#### Request
```py
{
    "inserted_id":"63a2b47c2be81449d3a30d9a",
    "command":"showPermutation"
}
```
#### Response
```py
{
  "n": 4,
  "r": 3,
  "numberOfPermutations": 24,
  "permutationsVariables": [
    "A",
    "B"
  ],
  "inserted_id": "63a2b47c2be81449d3a30d9a"
}
```
