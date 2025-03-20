import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import { Spinner } from 'react-bootstrap'; 
import Form from 'react-bootstrap/Form';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: '',
        mobile: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        emailjs.sendForm('service_pzu5gmt', 'template_iylq51c', e.target, '318ahucfAM7BpY5CK')
            .then((result) => {
                alert('Form is submitted');
                setIsLoading(false);
                setFormData({
                    name: '',
                    email: '',
                    description: '',
                    mobile: ''
                });
            }, (error) => {
                console.log(error.text);
                setIsLoading(false);
            });
    };

    return (
        <div className='Contact'>
            <h1 className='fadeInText'>Contact Us</h1>
            <form onSubmit={handleSubmit} className='form'>
                <div>
                    <label>Name:</label>
                    <Form.Control
                        type='text' 
                        placeholder='Enter Your Name'
                        name='name' 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <Form.Control 
                        type='email' 
                        name='email'
                        placeholder='Enter Your Email' 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <Form.Control
                        as="textarea" 
                        name='description' 
                        placeholder='Enter Your Message'
                        value={formData.description} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Mobile:</label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Your Mobile Number"
                        name='mobile' 
                        value={formData.mobile} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type='submit' disabled={isLoading}>
                    {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default Contact;
