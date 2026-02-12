import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold mb-8 text-gray-800 text-center">Get In Touch</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <p className="text-lg leading-relaxed text-gray-600 mb-8">
            I'm always open to discussing new projects, creative ideas, or 
            opportunities to be part of your visions.
          </p>
          <div className="flex flex-col gap-4">
            <div className="text-gray-600">
              <strong className="text-gray-800">Email:</strong> john.doe@example.com
            </div>
            <div className="text-gray-600">
              <strong className="text-gray-800">LinkedIn:</strong> linkedin.com/in/johndoe
            </div>
            <div className="text-gray-600">
              <strong className="text-gray-800">GitHub:</strong> github.com/johndoe
            </div>
          </div>
        </div>
        <form className="bg-white p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-gray-800 font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-gray-800 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-gray-800 font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Your message here..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600 transition-colors resize-none"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 px-6 rounded transition-colors hover:bg-blue-700 font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
