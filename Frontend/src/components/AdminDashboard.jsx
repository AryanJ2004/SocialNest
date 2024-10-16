import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const backendUrl = 'https://social-media-app-o05c.onrender.com';

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const usersResponse = await axios.get(`${backendUrl}/api/admin/users`, { withCredentials: true });
      const profileResponse = await axios.get(`${backendUrl}/api/admin/profile`, { withCredentials: true });

      setUsers(usersResponse.data);
      setUsername(profileResponse.data.username);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.status === 401) {
        navigate('/admin/login'); // Redirect to login if unauthorized
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/admin/logout`, {}, { withCredentials: true });
      navigate('/admin/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">User Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{user.name}</h3>
                  <p className="text-gray-600 mb-4">{user.socialMediaHandle}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {user.images && user.images.map((image, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <img
                          src={image} 
                          alt={`Uploaded by ${user.name}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <a
                          href={image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-indigo-600 hover:text-indigo-800"
                        >
                          View Image
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
