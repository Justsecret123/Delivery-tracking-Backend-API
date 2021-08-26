# Test the Express API

## Subscribe 

```
> cd backend
> npm run test-subscribe

OR 
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

#### Response body

- id: *String*. Equals to null if the insertion has failed. 
- message: *String*. 

### Return messages

- Code 400 : { "message": "User not added", "id": null"}
- Code 401 : { "message": "The login is already taken", "id": null"}
- Code 200 : { "message": "User added", "id": *TheNewlyInsertedUserId* }

### Additional notes

> - **Method : POST**
> - **Server's port : 5000**

# Prerequisites

- Database: Local MongoDB installation (as a Service, preferably)
- Npm, Node.js
- ARC, POSTMAN, or any API test client