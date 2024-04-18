# Node + React Chat Application

This project is a real-time text chat application implemented with Express.js, React.js and MongoDB.

## Description

This application serves as a basic understanding of real-time event driven concepts of Node with the help of Socket.IO. It is a text chatting application designed to register, authenticate, and facilitate instant connections and communication between users. Some of the features include custom authentication, message notification, chat history and ability to see online users.

## Technologies Used

### Client:

- React with Vite
- TailwindCSS
- daisyUI - Tailwind components
- Socket.IO Client - Socket.IO client instance for real-time communication
- Zustand - State management solution

### Server:

- Express.js - server solution
- MongoDB - document database for storing user and chat information
- Socket.io - Socket.IO server instance for real-time communication
- jsonwebtoken - JWT for authentication

## Application flow

### Registration:

- register with your full name, username, password and gender
- client and server will both validate the inputs
- server will create a user account inside the database. the password will be hashed before insertion and an avatar will be generated based on selected gender
- a JWT token is created for you and it will be set to cookies, meaning you will be automatically logged in
- user details will be inserted into local storage
- auth and socket contexts are created

### Login

- client and server will validate the username and password and set a JWT to cookies
- user details will be inserted into local storage
- auth and socket contexts are set

### Logout

- local storage will be cleaned of user data
- JWT token is cleaned from cookies

### Home Page

- users are requested from the server.
- the socket client is connecting to the socket server, triggering a connection event. on connection event the server will store all the connected clients in order to send the clients a list of connected (active) users
- when selecting a conversation, the client will request conversation details and messages that will eventually be stored inside the global state using Zustand
- an event listener is waiting for newMessage events for the selected conversation and every incoming message will be stored inside the global state
- when a message is sent, a post request is made to the server, where the message will be saved to the database and a newMessage event will be emitted to the receiver socket

## Configuration, Build and Run

### Configuration

Please create a .env file at the root of the project. You have an env.example file attached where you can find the environment variables needed for this project. You can use OpenSSL to generate a JWT secret. Inside chat-app/client/src/context/SocketContext.jsx you can set the Socket.IO server location. In production, it must be changed to the actual server DNS or IP address.

```console
openssl rand -base64 32
```

### Build

First, you will have to build the project. I configured the project so that you have a single point of control for the client and server. When you run the build command, the dependencies will be installed and an optimized build will be created for the client.

```console
npm run build
```

### Run

If the command was successful, you can start the application. By default, you can access the application at http://localhost:5000 inside the browser.

```console
npm start
```

## Showcase

Please look into the showcase folder for images regarding the client presentation.

## Implementation details and thoughts

On the frontend, I tried to use multiple state management solutions. Due to the small size of the project, I thought that the useContext built into React would be adequate for managing authentication. I also wanted a global state that manages individual conversations and messages, just to experiment with other options than useContext. I decided to go with Zustand, which I found to be very easy to start with and use. It is not as big and feature-rich as Redux, but it takes out a lot of the boilerplate and complexity of use. If you are looking for a more complete state management solution than Zustand I recommend looking into Jotai.
