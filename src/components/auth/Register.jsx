import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import { UserContext } from '../../context/UserContext';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    age: '',
    gender: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const { name, email, password, password2, age, gender, address, phone } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // Validate form
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Register user
      const userData = {
        name,
        email,
        password,
        age: age ? parseInt(age) : undefined,
        gender,
        address,
        phone
      };

      console.log('Registering with data:', userData);
      
      const response = await authService.register(userData);
      
      // Get user data
      const userResponse = await authService.getCurrentUser();
      setUser(userResponse.data);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  };

  // Rest of component...
}