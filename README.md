# Discussion-forum

Micro-application for discussion forum, where it is possible to create an account, log in, within the platform the user can create topics of interest and can also exchange messages with other users on the subject of their topic, it is also possible to add data of user.


## Technologies
  - Node.js
  - Express
  - TypeScript
  - Sequelize (ORM for interacting with the database)
  - MySQL (relational database)
  - Docker
  - React
  - Material-UI
  - CSS

## Features
  - User registration
  - Login
  - Create a topic
  - View topics from other users
  - Add posts to as many topics as you want
  - Edit profile data

## Environment Setup

1. Make sure you have Docker installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the cloned repository:
   ```bash
   cd discussion-forum
4. Install dependencies:
   ```bash
   npm run install:apps
5. Start the containers:
   ```bash
   npm run compose:up
6. View backend container logs:
   ```bash
   docker logs -f app_backend
7. Go to the frontend folder:
   ```bash
   cd frontend
8. Start the frontend:
   ```bash
   npm run dev


## Request format

1. The user creation route expects post('/user'):
  ```bash
  {
    name: 'User name',
    lastName: 'User last name',
    phone: 'User cell phone',
    email: 'User email',
    password: 'User password'
  }

2. To log in you need to go through post('/login'):
  ```bash
  {
    email: 'User email',
    password: 'User password'
  }

3. The topic creation route expects post('/topic'):
  - You must be logged in
  ```bash
  {
    name: 'Topic name',
    type: 'Topic type'
  }

4. In the message route you need post('/message'):
  - You must be logged in
  ```bash:
  {
    message: 'Message',
    topicId: 'The topic id the message belongs to'
  }

## Contact

- E-mail de contato: moraissamuel009@gmail.com
- Phone: (38) 988449448
- Linkedin: https://www.linkedin.com/in/samuel-morais-garcia-4a823b244/
