import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const charity = location.state;

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment', { amount: 500 });
      const { order } = response.data;

      // Open Razorpay payment modal
      const options = {
        key: 'YOUR_RAZORPAY_KEY',
        amount: order.amount,
        currency: 'INR',
        name: 'Charity Registration',
        description: 'Register your charity',
        order_id: order.id,
        handler: async function (response) {
          // Verify payment on backend
          const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify', {
            ...response,
            charity,
          });

          if (verifyResponse.data.success) {
            alert('Payment Successful and Charity Registered!');
            navigate('/');
          } else {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: charity.name,
          email: 'example@example.com',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Error processing payment.');
    }
  };

  return (
    <div>
      <h2>Complete Payment</h2>
      <p>Pay ₹500 to register your charity.</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default payment;
