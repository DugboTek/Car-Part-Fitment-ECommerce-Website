import React, { useState } from 'react';
import '../../Styles/HomePageStyles/ContactUs.css'; // Import your CSS styles
import Header from '../NavComponents/Header'
import Footer from '../Footer'
function ContactUs() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className='contact-page'>
        <Header/>
        <div className="contact-us-container">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
            />
            </div>
            <div className="input-group">
            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="input-group">
            <input
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            </div>
            <div className="input-group">
            <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            </div>
            <button className='contact-us-button' type="submit">Submit</button>
        </form>

        </div>
        <div className="company-values">
            <p>
            At Polaris Parts, we are dedicated to providing exceptional service to our valued customers. Your feedback is invaluable, and we are committed to addressing any inquiries you may have. We take pride in our commitment to quality and excellence in all aspects of our business. Your satisfaction is our priority. 
            </p>
            <p>
            Please allow us up to 2 business days to respond to your message.
            </p>
                   
            <p className='thank-you'>
            Thank you for choosing Polaris Parts. We look forward to serving you and building a lasting partnership.
            </p>
        </div>
        <Footer/>
    </div>
  );
}

export default ContactUs;
