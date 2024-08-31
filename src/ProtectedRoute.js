import { useEffect, useState } from 'react';
import { Navigate,  } from 'react-router-dom'
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className='flex justify-center'>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return children;
  
}

export default ProtectedRoute