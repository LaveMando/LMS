// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.json());

// Replace with your email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com', // Your email address
    pass: 'your_password', // Your email password
  },
});

app.post('/api/apply-leave', (req, res) => {
  // Handle the leave application data and database operations here
  const { employeeName, employeeEmail, startDate, endDate, reason } = req.body;

  // Send email to the manager
  const mailOptions = {
    from: 'your_email@gmail.com', // Your email address
    to: 'manager_email@example.com', // Manager's email address
    subject: 'Leave Application Request',
    text: `Leave application request from ${employeeName} (${employeeEmail}) for the period ${startDate} to ${endDate}. Reason: ${reason}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error: Unable to send email.');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Leave application submitted successfully.' });
    }
  });

  // Handle other database operations or any necessary tasks

  // You can also handle the logic for saving the leave application to a database here

  // Send a response to the client
  res.status(200).json({ message: 'Leave application submitted successfully.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
