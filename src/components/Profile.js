import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (!token) {
          window.location.href = '/login';
          return;
        }
        
        const response = await axios.get('REMOVED', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) { // tells them they are not logged in
          setError('Error 401. Unauthorized: Please log in to view this page.');
        } else {
          setError('Error fetching profile. Please try logging in.'); // just incase another error pops up
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Profile</h1>
      {error && <h1>{error}</h1>}
      {user && (
        <div className="card">
          <div className="card-body">
            <p className="card-text">Name: {user.name}</p>
            <p className="card-text">Email: {user.email}</p> // shows their info
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
