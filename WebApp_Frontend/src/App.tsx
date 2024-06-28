// import { useEffect, useState } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import Loader from './common/Loader';
// import PageTitle from './components/PageTitle';
// import SignIn from './pages/Authentication/SignIn';
// import ECommerce from './pages/Dashboard/ECommerce';
// import Profile from './pages/Profile';
// import Tables from './pages/DataManagement/Tables';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <PageTitle title="FRS Management System" />
//               <ECommerce />
//             </>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <>
//               <PageTitle title="Profile" />
//               <Profile />
//             </>
//           }
//         />
//         <Route
//           path="/tables"
//           element={
//             <>
//               <PageTitle title="Tables" />
//               <Tables />
//             </>
//           }
//         />
//         <Route
//           index
//           // path="/auth/signin"
//           element={
//             <>
//               <PageTitle title="Signin" />
//               <SignIn />
//             </>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;


import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import ECommerce from './pages/Dashboard/ECommerce';
import Profile from './pages/Profile';
import Tables from './pages/DataManagement/Tables';
import BulkUpload from './pages/BulkUpload';

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
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/"
        element={
          token ? (
            <>
              <PageTitle title="FRS Management System" />
              <ECommerce />
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
