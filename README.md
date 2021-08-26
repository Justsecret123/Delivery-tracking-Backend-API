# Test the Express API (Port: 5000)

## Subscribe 

```
> cd backend
> npm run test-subscribe
```

OR 

```
> cd backend 
> npm run start
> **Route : (POST) localhost:5000/users/subscribe**
``` 

### Data format : JSON

#### Request Body : 

- adresse: *String* 
- email: *String* 
- login: *String* **required** & **unique**
- password: *String* **required**
- nom: *String*
- prenom: *String* 
- telephone: *String*

#### Response body (res.data)

- id: *String*. Equals to null if the insertion has failed. 
- message: *String*. 

### Return messages

- Code 200 : { "message": "User added", "id": *TheNewlyInsertedUserId* }
- Code 400 : { "message": "User not added", "id": null"}
- Code 401 : { "message": "The login is already taken", "id": null"}


### Additional notes

> - **Method : POST**

## DELETE

```
> cd backend 
> npm run start
> **Route : (DELETE) localhost:5000/users/delete**
```

### Data format : JSON

#### Request body 

- id : *String*

#### Response body (res.data)

- message : *String*

### Return messages 

- Code 200 : {"message: "User deleted ! "}
- Code 400 : {"message": "Operation failed" + *MongoDB log message*}. In this case, the request couldn't be processed by the server. Either caused by bad formatting of *id* or any kind of server crash. 
- Code 401 : {"message": "The user doesn't exist."}. In this case, the inputted *id* did not match any document. 

### Additional notes

> - **Method : DELETE**

# Prerequisites

- Database: Local MongoDB installation (as a Service, preferably)
- Npm, Node.js
- ARC, POSTMAN, or any API test client