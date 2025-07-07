import React, { useState } from 'react';

const AuthView = ({ setAuthState }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // ✅ Simulated login/signup logic
    const userData = {
      name: isLoginMode ? 'Ishan Grover' : name,
      email,
      role: 'user',
    };

    setAuthState(true, userData); // ✅ This fixes the error
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900">
        {isLoginMode ? 'Login' : 'Sign Up'}
      </h2>

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
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {isLoginMode ? 'Login' : 'Sign Up'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{' '}
        <button
          className="text-blue-600 underline"
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthView;
