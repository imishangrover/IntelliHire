import React from 'react';

const LoginView = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
      <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" />
      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Login</button>
    </div>
  );
};

export default LoginView;
