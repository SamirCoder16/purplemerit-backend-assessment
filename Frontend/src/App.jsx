import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
import { useAuth } from "./contexts/AuthContext.jsx";
import Deactivate from "./components/Deactivate.jsx";

const HomePage = lazy(() => import("./pages/Home"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const Users = lazy(() => import("./pages/ALlUsers.jsx"));
const EditProfile = lazy(() => import("./pages/EditProfile.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage.jsx"));
const AdminDashBoard = lazy(() => import("./pages/AdminDash.jsx"));

const App = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated && user.status.toString() === "inactive") {
    return <Deactivate />;
  }

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

      <Route
        path="/admin/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <AdminDashBoard />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
