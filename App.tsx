import React, { useState, useCallback, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes

function App() {
  const [userPath, setUserPath] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on component mount
    const storedPath = localStorage.getItem('userPath');
    const storedLoginTime = localStorage.getItem('loginTime');

    if (storedPath && storedLoginTime) {
      const loginTime = parseInt(storedLoginTime, 10);
      const elapsedTime = Date.now() - loginTime;

      if (elapsedTime < SESSION_DURATION) {
        setUserPath(storedPath);
        // Set a timeout to auto-logout when the session expires
        const remainingTime = SESSION_DURATION - elapsedTime;
        const timer = setTimeout(() => {
            handleLogout();
        }, remainingTime);
        // Store timer to clear it on manual logout
        (window as any).sessionTimer = timer;
      } else {
        // Session expired
        handleLogout();
      }
    }
  }, []);

  const handleLogin = useCallback((email: string, pass: string): string | null => {
    if ((email.toLowerCase() === 'shen.admin@gmail.com' || email.toLowerCase() === 'another.admin@gmail.com') && pass === '123456') {
        const path = email.split('.')[0].toLowerCase();
        setUserPath(path);
        // Store session details in localStorage
        localStorage.setItem('userPath', path);
        localStorage.setItem('loginTime', Date.now().toString());
        
        // Set auto-logout timer
        const timer = setTimeout(() => {
            handleLogout();
        }, SESSION_DURATION);
        (window as any).sessionTimer = timer;

        return null; // Success
    }
    return 'Invalid email or password.'; // Error message
  }, []);

  const handleLogout = useCallback(() => {
    setUserPath(null);
    // Clear session details from localStorage
    localStorage.removeItem('userPath');
    localStorage.removeItem('loginTime');
    // Clear any existing session timer
    if ((window as any).sessionTimer) {
      clearTimeout((window as any).sessionTimer);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {!userPath ? (
          <Login onLogin={handleLogin} />
        ) : (
          <Dashboard userPath={userPath} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}

export default App;