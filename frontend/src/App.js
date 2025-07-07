import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/dashboard/DashboardView';
import ResumeAnalysisView from './components/resume/ResumeAnalysisView';
import JobRecommendationsView from './components/jobs/JobRecommendationsView';
import AdminPanel from './components/admin/AdminPanel';
import ResumeManagerView from './components/resume/ResumeManagerView';
import AuthView from './components/auth/AuthView';
import { useResumeUpload } from './hooks/useResumeUpload';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const setAuthState = (auth, userData) => {
    setIsAuthenticated(auth);
    setUser(userData);
    if (auth) setCurrentView('dashboard'); // redirect after login/signup
  };

  const {
    resumeFile,
    resumeScore,
    jobRecommendations,
    feedback,
    isProcessing,
    handleFileUpload
  } = useResumeUpload();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        isAuthenticated={isAuthenticated}
        setAuthState={setAuthState}
      />

      <div className="flex-1 p-8">
        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md mx-4">
              <div className="flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Processing Resume</h3>
                  <p className="text-gray-600">Our AI is analyzing your resume...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAuthenticated ? (
          <>
            {currentView === 'dashboard' && (
              <DashboardView
                resumeFile={resumeFile}
                resumeScore={resumeScore}
                jobRecommendations={jobRecommendations}
                user={user}
                handleFileUpload={handleFileUpload}
              />
            )}

            {currentView === 'resume' && (
              <ResumeAnalysisView
                resumeFile={resumeFile}
                resumeScore={resumeScore}
                feedback={feedback}
                handleFileUpload={handleFileUpload}
              />
            )}

            {currentView === 'jobs' && (
              <JobRecommendationsView jobRecommendations={jobRecommendations} />
            )}

            {currentView === 'admin' && user?.role === 'admin' && <AdminPanel />}

            {currentView === 'resumeManager' && (
              <ResumeManagerView
                resumeFile={resumeFile}
                handleFileUpload={handleFileUpload}
              />
            )}
          </>
        ) : (
          <AuthView setAuthState={setAuthState} />
        )}
      </div>
    </div>
  );
};

export default App;
