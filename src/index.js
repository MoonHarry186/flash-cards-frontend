import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GlobalProvider } from "./context/GlobalState";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
      <App />
    </GoogleOAuthProvider>
  </GlobalProvider>
);

