import React, { useState, useEffect } from 'react';
import './Charity.css';
import axios from 'axios';

function Charity() {
  const [charityData, setCharityData] = useState([]);
  const [donationAmounts, setDonationAmounts] = useState({});
  const [expandedCard, setExpandedCard] = useState(null);  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/charities');
      setCharityData(response.data);
      setDonationAmounts(response.data.reduce((acc, _, index) => {
        acc[index] = 0;
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (index, value) => {
    setDonationAmounts({
      ...donationAmounts,
      [index]: Number(value)
    });
  };

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index); // Toggle the expanded card
  };
  const handleDonate = async (index) => {
    const amount = donationAmounts[index];
  
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
  
    try {
      // Step 1: Create Order in Backend
      const { data } = await axios.post("http://localhost:3004/pay", { amount });
  
      const options = {
        key: data.key, 
        amount: data.amount,  
        currency: data.currency,
        name: "Charity Donation",
        description: "Help support this charity",
        order_id: data.orderId, 
        handler: async function (response) {
          console.log("Payment Success:", response);
          
          // Step 2: Store Payment Details in Database
          await axios.post("http://localhost:3004/store-charity", {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            charityName: charityData[index].charity_name,
          });
  
          alert("Thank you for your donation!");
  
          // Update frontend donation amount
          setCharityData((prevData) =>
            prevData.map((charity, i) =>
              i === index ? { ...charity, donatedValue: (charity.donatedValue || 0) + amount } : charity
            )
          );
        },
        prefill: {
          name: "Donor Name",
          email: "donor@example.com",
          contact: "9876543210"
        },
        theme: {
          color: "#3399cc"
        }
      };
  
      const razor = new window.Razorpay(options);
      razor.open();
  
    } catch (error) {
      console.error("Error processing donation:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="Charity">
      <h1 className='fadeInText'>Charity's</h1>
      <div className="charity-grid">
        {charityData.filter(charity => charity.eligible === "Yes").map((charity, index) => (
          <div 
            className={`card ${expandedCard === index ? 'expanded' : ''}`} 
            key={index} 
            onClick={() => handleCardClick(index)}
          >
            <h3 className="card-title">{charity.charity_name}</h3>
            <div className="card-content">
              <div className="row">
                <div className="col-md-6">
                  <table className="table">
                    <tbody style={{ textAlign: 'left' }}>
                      <tr>
                        <td className="label"><strong>Category:</strong></td>
                        <td>{charity.category}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Objective:</strong></td>
                        <td>{charity.goal_description}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Description:</strong></td>
                        <td>{charity.event_description}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Achievements:</strong></td>
                        <td>{charity.achievement}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Registration No:</strong></td>
                        <td>{charity.registration_no}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Income Tax NO:</strong></td>
                        <td>{charity.income_tax}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Annual Report:</strong></td>
                        <td>
                          <div className="reports">
                            {charity.annual_report && (
                              charity.annual_report.endsWith('.pdf') ? (
                                <a href={`http://localhost:3004/${charity.annual_report}`} target="_blank" rel="noopener noreferrer">View PDF Report</a>
                              ) : (
                                <img src={`http://localhost:3004/${charity.annual_report}`} alt="Annual Report" />
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table">
                    <tbody style={{ textAlign: 'left' }}>
                      <tr>
                        <td className="label"><strong>PAN No:</strong></td>
                        <td>{charity.pan_no}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>GST No:</strong></td>
                        <td>{charity.gst_no}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Website:</strong></td>
                        <td><a href={charity.website} target="_blank" rel="noopener noreferrer">{charity.website}</a></td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Contact Email:</strong></td>
                        <td>{charity.email}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Contact Phone:</strong></td>
                        <td>{charity.phone_no}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Address:</strong></td>
                        <td>{charity.address}</td>
                      </tr>
                      <tr>
                        <td className="label"><strong>Donated Value:</strong></td>
                        <td>{charity.donatedValue || 0}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card-right">
              <div className="card-photos">
                <div className="photos">
                  {charity.photo_org && (
                    <img src={`http://localhost:3004/Images/${charity.photo_org}`} alt="Organization Activity" />
                  )}
                </div>
              </div>
            </div>
            <div className="donation-section">
              <input
                type="number"
                placeholder="Enter donation amount"
                className="donation-input"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <button className="donate-button" onClick={() => handleDonate(index)}>Donate</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Charity;
