# Time Capsule 

This project is a backend service that allows users to create digital time capsules. A time capsule contains a message, a list of recipient email addresses, and a future timestamp. When the scheduled time arrives, the system automatically sends the message to the specified recipients through email.

The application is built using Node.js, Express, MongoDB, Nodemailer, and a cron-based scheduler that checks for due capsules every minute.

## Features

- Create time capsules containing a title, message, recipients, and scheduled time.
- Automatically send messages at the exact time specified.
- Store capsules in MongoDB.
- Background scheduler using node-cron to check for pending capsules.
- SMTP-based email delivery with Nodemailer.

## Project Structure

```
src/
  server.js
  config/
    db.js
  models/
    Capsule.js
  controllers/
    capsuleController.js
  routes/
    capsuleRoutes.js
  services/
    mailer.js
  jobs/
    capsuleScheduler.js
```

## API Endpoints

POST /api/capsules  
Creates a new time capsule.

GET /api/capsules  
Returns all capsules.

GET /api/capsules/:id  
Returns a single capsule by ID.

## Environment Variables

Create a .env file with the following:

```
PORT=your-port
MONGO_URI=your-mongodb-connection
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL="Title <your-email@gmail.com>"
```

The SMTP password must be an App Password when using Gmail.

## Running the Project

Install dependencies:

```
npm install
```

Start MongoDB if running locally:

```
mongod
```

Start the server:

```
npm run dev
```

## How the Scheduler Works

A cron job runs once every minute. It checks for all capsules where:
- sent is false
- sendAt is less than or equal to the current time

For each due capsule, the message is sent by email, and the capsule is marked as sent.

## Testing

To test the system, user must create a capsule with a scheduled time a few minutes in the future. Wait for the scheduler to run and check your email inbox for the delivered message.

## Notes
- Do not commit SMTP credentials or other sensitive information.
- The project will be further extended with authentication, message encryption, and a frontend interface.

