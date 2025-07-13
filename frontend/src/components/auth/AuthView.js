import React, { useState } from 'react';
import API from '../../api/axios'; 

const AuthView = ({ setAuthState }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (isLoginMode) {
        // 🔐 Login
        const response = await API.post('/auth/login', {
          email,
          password,
        });

        localStorage.setItem('token', response.data.token);

        const userResponse = await API.get('/users/me');
        setAuthState(true, userResponse.data);
      } else {
        // 📝 Signup
        const response = await API.post('/auth/signup', {
          name,
          email,
          password,
        });

        localStorage.setItem('token', response.data.token);

        const userResponse = await API.get('/users/me');
        setAuthState(true, userResponse.data);
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Login or signup failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        {isLoginMode ? 'Login' : 'Sign Up'}
      </h2>

      {error && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

      {!isLoginMode && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full text-white px-4 py-2 rounded-lg ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Please wait...' : isLoginMode ? 'Login' : 'Sign Up'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
        <button
          className="text-blue-600 underline"
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setError('');
          }}
        >
          {isLoginMode ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthView;
