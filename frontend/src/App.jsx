import { useState } from 'react';
import './App.css';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthRedirect } from "./components/AuthRedirect";


function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/signup" element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          } />
          <Route path="/signin" element={
            <AuthRedirect>
              <Signin />
            </AuthRedirect>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/send" element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;