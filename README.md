# Chatbox Chat App [API]

Deployed: [Link](https://chatbox-api.up.railway.app/)

This is the backend of a Chat app created using NodeJS, ExpressJS, MongoDB and SocketIO.

# Routes

| Route  | Method | Description |
|---|---|---|
| ```/api/user/signup```  | ```PUT``` | Register user |
| ```/api/user/login```  | ```POST``` | Login user |
| ```/api/user/logout```  | ```GET``` | Logout user |
| ```/api/user/details```  | ```GET``` | Get user details |
| ```/api/user/details```  | ```PUT``` | Update user details |
| ```/api/user/all```  | ```GET``` | Get details of all users |
| ```/api/chat/create```  | ```PUT``` | Create a chat |
| ```/api/chat/all```  | ```GET``` | Get details of all chats of the logged in user |
| ```/api/chat/:id```  | ```GET``` | Get details of a chat by its ID |
| ```/api/chat/:id```  | ```DELETE``` | Delete a chat by its ID |
| ```/api/message/create```  | ```PUT``` | Create a message |
| ```/api/message/id/:id```  | ```GET``` | Get message details using its ID |
| ```/api/message/chat/:id```  | ```GET``` | Get message details using chat ID |

# Environment Variables

- ```NODE_ENV``` - Node environment : ```"production" | "development"```
- ```PORT``` - Server port number
- ```MONGODB_URI``` - URI of the MongoDB database
- ```JWT_SECRET_KEY``` - JWT secret key used for generating authentication tokens
- ```CLIENT_URL``` - URL of the frontend
