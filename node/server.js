import express from 'express';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import bodyParser from 'body-parser';

// Initialize Firebase SDK
// import * as serviceAccount from './key.json';
const serviceAccount = JSON.parse(
  await readFile(
    new URL('./key.json', import.meta.url)
  )
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://notifications-88fb7.firebaseio.com`,
});

// Create an instance of the Express app
const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define an API endpoint that accepts a message
app.post('/send', (req, res) => {
  const { message } = req.body;

  // Send the message to all devices using Firebase SDK
  const payload = {
    notification: {
      title: 'New Message',
      body: message,
    },
  };
  admin.messaging().sendToTopic('allDevices', payload)
    .then(() => {
      res.status(200).send('Message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending message:', error);
      res.status(500).send('Error sending message');
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});