// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Create an express application
const app = express();
const port = 3000;

// Use body-parser middleware for parsing incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a nodemailer transporter using SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP server host
  port: 587, // Replace with your SMTP server port
  secure: false, // Set to true if your SMTP server requires a secure connection
  auth: {
    user: 'yourusername', // Replace with your SMTP server username
    pass: 'yourpassword' // Replace with your SMTP server password
  }
});

// Initialize an array to store leave requests
let leaveRequests = [];

// Handle POST requests to /leave endpoint
app.post('/leave', async (req, res) => {
  const { name, startDate, endDate } = req.body;
  leaveRequests.push({ name, startDate, endDate });

  // Configure email options
  const mailOptions = {
    from: 'noreply@example.com', // Set the sender's email address
    to: 'manager@example.com', // Set the recipient's email address
    subject: 'New Leave Request', // Set the subject of the email
    text: `A new leave request has been submitted by ${name}. Please click on the following link to approve or deny the request: http://localhost:3000/leave/${leaveRequests.length}` // Set the email content
  };

  try {
    // Send the email using the nodemailer transporter
    await transporter.sendMail(mailOptions);
    res.send('Leave request submitted successfully!');
  } catch (error) {
    console.error('Error occurred while sending email:', error); // Log any errors that occur during the email sending process
    res.status(500).send('Error sending email'); // Send an appropriate error message in the response
  }
});

// Handle GET requests to /leave endpoint
app.get('/leave', (req, res) => {
  res.send(leaveRequests); // Send the leave requests array as the response
});

// Handle undefined routes with an error message
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Start the express server
const server = app.listen(port, (err) => {
  if (err) {
    console.error('Error starting the server:', err); // Log any errors that occur during the server start-up process
  } else {
    console.log(`Server running on port ${server.address().port}`); // Print a message indicating that the server is running
  }
});
