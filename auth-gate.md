Ah, absolutely! Let me walk you through a full, self-contained example so you can see how it all fits together.

We’ll have three parts: the Auth Context, the AuthGate component, and the main app that uses it.

1. Auth Context:

```jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

2. AuthGate Component:

```jsx
import React from 'react';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';

const AuthGate = ({ children, onClose }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children; // Show the actual content modal
  } else {
    return <LoginModal onClose={onClose} />; // Show login modal
  }
};

export default AuthGate;
```

3. LoginModal Component:

```jsx
import React from 'react';
import { useAuth } from './AuthContext';

const LoginModal = ({ onClose }) => {
  const { login } = useAuth();

  const handleLogin = () => {
    login(); // Perform login
    onClose(); // Close modal after login
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Login</h2>
        <p>Please enter your credentials to continue.</p>
        <button onClick={handleLogin}>Login</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default LoginModal;
```

4. Finally, the main App component that uses everything:

```jsx
import React, { useState } from 'react';
import { AuthProvider } from './AuthContext';
import AuthGate from './AuthGate';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthProvider>
      <div>
        <h1>My App</h1>
        <button onClick={handleOpenModal}>Add to Playlist</button>

        {isModalOpen && (
          <AuthGate onClose={handleCloseModal}>
            {/* Your actual modal content goes here, e.g., playlist management */}
            <div className="modal-backdrop">
              <div className="modal-content">
                <h2>Manage Your Playlist</h2>
                <p>Add or remove videos from your playlist here.</p>
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </AuthGate>
        )}
      </div>
    </AuthProvider>
  );
};

export default App;
```

In this setup, the `AuthGate` wraps the modal content. If the user isn’t authenticated, it shows the `LoginModal`. Once the user logs in, it closes that modal, and the original modal content (like your playlist manager) is shown. This keeps all your modals modular and reuses the same logic for authentication.

