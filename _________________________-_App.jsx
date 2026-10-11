import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('chat');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      id: '1',
      name: 'আপনার নাম',
      email: 'user@example.com',
      plan: 'free',
      credits: 50,
      totalCredits: 50,
      avatar: '👤',
      joinDate: new Date().toLocaleDateString('bn-BD'),
      apiKey: '',
      notifications: true
    };
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ইউজার ডেটা সেভ করা
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (newData) => {
    setUser(prev => ({ ...prev, ...newData }));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatPage user={user} updateUser={updateUser} />;
      case 'settings':
        return <SettingsPage user={user} updateUser={updateUser} />;
      case 'subscription':
        return <SubscriptionPage user={user} updateUser={updateUser} />;
      case 'profile':
        return <ProfilePage user={user} updateUser={updateUser} />;
      default:
        return <ChatPage user={user} updateUser={updateUser} />;
    }
  };

  return (
    <div className="app">
      <Navbar 
        user={user} 
        onProfileClick={() => setCurrentPage('profile')}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="app-container">
        <Sidebar 
          isOpen={sidebarOpen} 
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
        <div className="main-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default App;