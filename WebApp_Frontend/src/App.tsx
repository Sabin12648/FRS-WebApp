
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import Profile from './pages/Profile';
import BulkUpload from './pages/BulkUpload';
import Dashboard from './pages/Dashboard/Dashboard';
import Spinner from './components/Spinner';
import Tables from './pages/DataManagement/Tables';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <>
              <PageTitle title="FRS Management System" />
              <Dashboard />
            </>
          ) : (
            <Navigate to="/auth/signin" />
          )
        }
      />
      <Route
        path="/auth/signin"
        element={
          <>
            <PageTitle title="Sign In" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          token ? (
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          ) : (
            <Navigate to="/auth/signin" />
          )
        }
      />
      <Route
        path="/tables"
        element={
          token ? (
            <>
              <PageTitle title="Tables" />
              <Tables />
            </>
          ) : (
            <Navigate to="/auth/signin" />
          )
        }
      />
         <Route
        path="/bulkUpload"
        element={
          token ? (
            <>
              <PageTitle title="BulkUpload" />
              <BulkUpload />
            </>
          ) : (
            <Navigate to="/auth/signin" />
          )
        }
      />
    </Routes>
  );
}

export default App;
