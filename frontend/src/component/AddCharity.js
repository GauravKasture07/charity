import React, { useState } from 'react';
import './AddCharity.css';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function AddCharity() {
  const [values, setValues] = useState({
    charityName: '',
    category: '',
    objective: '',
    eventDescription: '',
    photos: null,
    achievements: '',
    registrationNo: '',
    incomeTaxExemption: '',
    panNo: '',
    gstNo: '',
    annualReport: null,
    website: '',
    contactEmail: '',
    contactPhone: '',
    address: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [paymentError, setPaymentError] = useState(null);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === 'file') {
      setValues({ ...values, [name]: files[0] });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const validatePhoneNumber = (phoneNumber) => {
    const sanitizedNumber = phoneNumber.replace(/\D/g, '');
    if (sanitizedNumber.length === 10) {
      return sanitizedNumber;
    } else {
      throw new Error('Phone number must be 10 digits');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validPhoneNumber = validatePhoneNumber(values.contactPhone);
      values.contactPhone = validPhoneNumber;
      if (validateForm()) {
        setIsLoading(true);
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }
        const response = await axios.post('http://localhost:3004/test', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.data.success) {
          const paymentResponse = await axios.post('http://localhost:3004/pay', {
            amount: 1,  
            currency: 'INR',
            receipt: 'receipt_001',
          });

          const { orderId, amount, currency } = paymentResponse.data;

          const options = {
            key: 'rzp_test_8W9P6kstfNxPWV', 
            amount: amount,
            currency: currency,
            order_id: orderId,
            handler: async function (response) {
              await axios.post('http://localhost:3004/store-charity', {
                ...values,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              });
              setIsLoading(false);
              alert('Payment successful and charity registered!');
            },
            prefill: {
              name: values.charityName,
              email: values.contactEmail,
              contact: values.contactPhone,
            },
            theme: {
              color: "#F37254"
            }
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setIsLoading(false);
          alert('Error while initiating payment');
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setFormErrors({ ...formErrors, contactPhone: error.message });
      setIsLoading(false);
    }
  };
  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!values.charityName.trim()) {
      errors.charityName = 'Charity Name is required';
      isValid = false;
    }
    if (!values.category) {
      errors.category = 'Category is required';
      isValid = false;
    }
    if (!values.objective.trim()) {
      errors.objective = 'Main Objective/Goal is required';
      isValid = false;
    }
    if (!values.eventDescription.trim()) {
      errors.eventDescription = 'Description of Event Organized is required';
      isValid = false;
    }

    if (!values.photos) {
      errors.photos = 'Photos of Organization Activities are required';
      isValid = false;
    }
    if (!values.achievements.trim()) {
      errors.achievements = 'Achievements are required';
      isValid = false;
    }
    if (!values.registrationNo.trim()) {
      errors.registrationNo = 'Registration No (NITI Aayog) is required';
      isValid = false;
    }
    if (!values.incomeTaxExemption.trim()) {
      errors.incomeTaxExemption = 'Income Tax (Number) is required';
      isValid = false;
    }
    if (!values.panNo.trim()) {
      errors.panNo = 'PAN No is required';
      isValid = false;
    }
    if (!values.gstNo.trim()) {
      errors.gstNo = 'GST No is required';
      isValid = false;
    }
    if (!values.annualReport) {
      errors.annualReport = 'Annual Report or Audit Report is required';
      isValid = false;
    }
    if (!values.contactEmail.trim()) {
      errors.contactEmail = 'Contact Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.contactEmail)) {
      errors.contactEmail = 'Invalid email format';
      isValid = false;
    }
    if (!values.contactPhone.trim()) {
      errors.contactPhone = 'Contact Phone is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(values.contactPhone)) {
      errors.contactPhone = 'Phone number must be 10 digits';
      isValid = false;
    }
    if (!values.address.trim()) {
      errors.address = 'Address is required';
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };
  return (
    <div className="AddCharity">
      <div className="warning">
        <strong>Warning:</strong> If you create a fake charity, strict actions will be taken against you.
      </div>
      <form className="charity-form" onSubmit={handleSubmit}>
        <h3 className='fadeInText'>Add Your Charity or Trust</h3>
        <div className="form-row">
          <label className="form-label">
            Charity Name
            <input
              type="text"
              name="charityName"
              className="form-input"
              value={values.charityName}
              onChange={handleChange}
              required
            />
            {formErrors.charityName && <span className="error">{formErrors.charityName}</span>}
          </label>
          <label className="form-label">
            Category
            <select
              name="category"
              className="form-select"
              value={values.category}
              onChange={handleChange}
              required>
              <option value="">Select Category</option>
              <option value="Animal Welfare">Animal Welfare</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Environment">Environment</option>
              <option value="Others">Others</option>
            </select>
            {formErrors.category && <span className="error">{formErrors.category}</span>}
          </label>
        </div>
        <div className='form-row'>
          <label className="form-label">
            Main Objective/Goal
            <textarea
              name="objective"
              className="form-textarea"
              value={values.objective}
              onChange={handleChange}
              required
            ></textarea>
            {formErrors.objective && <span className="error">{formErrors.objective}</span>}
          </label>
          <label className="form-label">
            Description of Any Event Organized
            <textarea
              name="eventDescription"
              className="form-textarea"
              value={values.eventDescription}
              onChange={handleChange}
              required
            ></textarea>
            {formErrors.eventDescription && (
              <span className="error">{formErrors.eventDescription}</span>
            )}
          </label>
        </div>
        <label className="form-label">
          Photos of Organization Activities
          <input
            type="file"
            name="photos"
            className="form-input"
            onChange={handleChange}
            required
          />
          {formErrors.photos && <span className="error">{formErrors.photos}</span>}
        </label>
        <label className="form-label">
          Achievements
          <textarea
            name="achievements"
            className="form-textarea"
            value={values.achievements}
            onChange={handleChange}
            required
          ></textarea>
          {formErrors.achievements && <span className="error">{formErrors.achievements}</span>}
        </label>
        <strong><label style={{ fontSize: '20px' }}> Proofs</label></strong>
        <br></br>
        <div className="form-row">
          <label className="form-label">
            Registration No :
            <input
              type="text"
              name="registrationNo"
              className="form-input"
              value={values.registrationNo}
              onChange={handleChange}
              required
            />
            {formErrors.registrationNo && <span className="error">{formErrors.registrationNo}</span>}
          </label>

          <label className="form-label">
            Income Tax No :
            <input
              type="text"
              name="incomeTaxExemption"
              className="form-input"
              value={values.incomeTaxExemption}
              onChange={handleChange}
              required
            />
            {formErrors.incomeTaxExemption && (
              <span className="error">{formErrors.incomeTaxExemption}</span>
            )}
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            PAN No. Associated with NGO Account
            <input
              type="text"
              name="panNo"
              className="form-input"
              value={values.panNo}
              onChange={handleChange}
              required
            />
            {formErrors.panNo && <span className="error">{formErrors.panNo}</span>}
          </label>

          <label className="form-label">
            GST No :
            <input
              type="text"
              name="gstNo"
              className="form-input"
              value={values.gstNo}
              onChange={handleChange}
              required
            />
            {formErrors.gstNo && <span className="error">{formErrors.gstNo}</span>}
          </label>
        </div>

        <label className="form-label">
          If Established for More Than 1 Year - Annual Report or Audit Report
          <input
            type="file"
            name="annualReport"
            className="form-input"
            onChange={handleChange}
            required
          />
          {formErrors.annualReport && <span className="error">{formErrors.annualReport}</span>}
        </label>

        <div className="form-row">
          <label className="form-label">
            Website
            <input
              type="url"
              name="website"
              className="form-input"
              value={values.website}
              onChange={handleChange}
            />
          </label>

          <label className="form-label">
            Contact Email
            <input
              type="email"
              name="contactEmail"
              className="form-input"
              value={values.contactEmail}
              onChange={handleChange}
              required
            />
            {formErrors.contactEmail && <span className="error">{formErrors.contactEmail}</span>}
          </label>
        </div>

        <label className="form-label">
          Contact Phone
          <input
            type="tel"
            name="contactPhone"
            className="form-input"
            value={values.contactPhone}
            onChange={handleChange}
            required
          />
          {formErrors.contactPhone && <span className="error">{formErrors.contactPhone}</span>}
        </label>

        <label className="form-label">
          Address
          <textarea
            name="address"
            className="form-textarea"
            value={values.address}
            onChange={handleChange}
            required
          ></textarea>
          {formErrors.address && <span className="error">{formErrors.address}</span>}
        </label>

        <button type="submit" disabled={isLoading} className="form-button">
          {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : 'Register Charity'}
        </button>
      </form>
    </div>
  );
}
export default AddCharity;
