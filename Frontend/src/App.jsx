import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const HomePage = lazy(() => import("./pages/Home"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Users = lazy(() => import("./pages/ALlUsers.jsx"));
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage.jsx"));

const App = () => {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/auth/register"
        element={
          <Suspense fallback={<Loader />}>
            <RegisterPage />
          </Suspense>
        }
      />
      <Route
        path="/all/users"
        element={
          <Suspense fallback={<Loader />}>
            <Users />
          </Suspense>
        }
      />
      <Route
        path="/profile/edit"
        element={
          <Suspense fallback={<Loader />}>
            <EditProfile />
          </Suspense>
        }
      />
      <Route
        path="/forgot/password"
        element={
          <Suspense fallback={<Loader />}>
           <ForgotPassword />
          </Suspense>
        }
      />
      <Route 
      path="/reset/password" 
      element={
        <Suspense fallback={<Loader />}>
          <ResetPasswordPage />
        </Suspense>
      }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
