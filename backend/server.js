const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/Images', express.static(path.join(__dirname, 'public', 'Images')));

// Razorpay setup
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_8W9P6kstfNxPWV',  
  key_secret: 'R0UyX6tVREuWsSMor4fUzBwu'  
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  port: process.env.DB_PORT || 3306
});

// Remove the duplicate db.connect() and add retry logic
// const connectWithRetry = () => {
//   db.connect((err) => {
//     if (err) {
//       console.error('Database connection failed:', err.stack);
//       console.log('Retrying in 5 seconds...');
//       setTimeout(connectWithRetry, 5000);
//     } else {
//       console.log('Connected to database.');
//     }
//   });
// };

// connectWithRetry();

// POST route for charity data submission
app.post('/test', upload.fields([{ name: 'photos' }, { name: 'annualReport' }]), (req, res) => {
  const photoPath = req.files['photos'] ? req.files['photos'][0].path : null;
  const annualReportPath = req.files['annualReport'] ? req.files['annualReport'][0].path : '';

  const sql = "INSERT INTO charityadd (charity_name, category, goal_description, event_description, photo_org, achievement, registration_no, email, income_tax, pan_no, gst_no, annual_report, website, phone_no, address) VALUES ?";
  const values = [
    [
      req.body.charityName,
      req.body.category,
      req.body.objective,
      req.body.eventDescription,
      photoPath,
      req.body.achievements,
      req.body.registrationNo,
      req.body.contactEmail,
      req.body.incomeTaxExemption,
      req.body.panNo,
      req.body.gstNo,
      annualReportPath,
      req.body.website,
      req.body.contactPhone,
      req.body.address
    ]
  ];

  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Error inserting into database:", err);
      res.status(500).json({ error: 'Failed to insert data into database' });
    } else {
      console.log("Data inserted successfully:", data);
      res.status(200).json({ message: 'Data inserted successfully', success: true });
    }
  });
});

app.post('/pay', async (req, res) => {
  try {
    const { amount, currency, receipt, payment_capture = 1 } = req.body;

    const orderOptions = {
      amount: amount * 100,  
      currency: currency,
      receipt: receipt,
      payment_capture: payment_capture,
    };

    const order = await razorpayInstance.orders.create(orderOptions);

    res.status(200).json({
      message: 'Order created successfully',
      orderId: order.id,  
      currency: order.currency,
      amount: order.amount,  
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({
      error: 'Payment failed',
      message: error.message,
    });
  }
});

app.post('/store-charity', async (req, res) => {
  const { paymentId, orderId, signature, ...charityData } = req.body;

  try {
    
    const generatedSignature = razorpayInstance.utils.verifyPaymentSignature({
      order_id: orderId,
      payment_id: paymentId,
      signature,
    });

    if (!generatedSignature) {
      return res.status(400).json({
        error: 'Payment signature verification failed',
      });
    }
    const sql = "UPDATE charityadd SET payment_id = ?, order_id = ?, payment_signature = ? WHERE charity_name = ?";
    db.query(sql, [paymentId, orderId, signature, charityData.charityName], (err, data) => {
      if (err) {
        console.error("Error updating charity data:", err);
        return res.status(500).json({ error: 'Failed to update charity data after payment' });
      }

      console.log("Charity data updated with payment info:", data);
      return res.status(200).json({ message: 'Charity data updated successfully after payment' });
    });
  } catch (error) {
    console.error('Error during payment verification:', error.message);
    return res.status(500).json({ error: 'Payment verification failed', message: error.message });
  }
});
app.get('/charities', (req, res) => {
  db.query("SELECT * FROM charityadd", (err, result) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      res.status(500).json({ error: 'Failed to fetch data from database' });
    } else {
      res.send(result);
    }
  });
});



app.listen(3004, () => {
  console.log("Server is running on http://localhost:3004");
});