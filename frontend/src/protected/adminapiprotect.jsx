import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminApiProtect = ({ Component }) => {
  const navigate = useNavigate();
  const [user, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get('/api/auth/authorize');
        if (res.data.role) {
          setUserRole(res.data.role);
        } else {
          setUserRole('invalid user');
        }
      } catch (error) {
        
        setUserRole('invalid user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (!loading) {
       if (user !== 'admin') {
        navigate('/');
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className='text-sm text-center mt-8'>Loading...</div>; // Optionally add a spinner or loading screen
  }

  return user === 'admin' ? <Component /> : null;
};

export default AdminApiProtect;
