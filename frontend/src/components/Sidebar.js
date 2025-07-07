import React from 'react';
import logo from '../assets/logo.png';
import {
  TrendingUp,
  FileText,
  Briefcase,
  Upload,
  Settings,
  LogOut,
  LogIn
} from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, user, isAuthenticated, setAuthState }) => {
  return (
    <div className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen relative">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <img src={logo} alt="IntelliHire" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-900">IntelliHire</h1>
        </div>

        <nav className="space-y-2">
          {[
            { view: 'dashboard', label: 'Dashboard', icon: <TrendingUp className="w-5 h-5" /> },
            { view: 'resume', label: 'Resume', icon: <FileText className="w-5 h-5" /> },
            { view: 'jobs', label: 'Jobs', icon: <Briefcase className="w-5 h-5" /> },
            { view: 'resumeManager', label: 'Resume Manager', icon: <Upload className="w-5 h-5" /> }
          ].map(({ view, label, icon }) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === view ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}

          {user?.role === 'admin' && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'admin' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-5 h-5" />
              Admin Panel
            </button>
          )}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        {isAuthenticated ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setAuthState(false, null); // logout
                setCurrentView('auth');
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => setCurrentView('auth')}
            className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogIn className="w-5 h-5" />
            Login / Signup
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
