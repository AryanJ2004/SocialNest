import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserForm() {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [images, setImages] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMediaHandle', socialMediaHandle);
    
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('image', images[i]); // Change 'images' to 'image'
      }
    }
  
    try {
      const response = await axios.post('/api/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Submission successful!');
      setName('');
      setSocialMediaHandle('');
      setImages(null);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.response?.data?.message || 'Error submitting form. Please try again.');
    }
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Submission Form</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="socialMediaHandle" className="block text-sm font-medium text-gray-700">Social Media Handle:</label>
          <input
            type="text"
            id="socialMediaHandle"
            value={socialMediaHandle}
            onChange={(e) => setSocialMediaHandle(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Upload Images:</label>
          <input
            type="file"
            id="images"
            onChange={(e) => setImages(e.target.files)}
            multiple
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={handleAdminLogin}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}
