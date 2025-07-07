import React from 'react';

const SignupView = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-900">Sign Up</h2>
      <input type="text" placeholder="Name" className="w-full px-4 py-2 border rounded-lg" />
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
      <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" />
      <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Sign Up</button>
    </div>
  );
};

export default SignupView;
