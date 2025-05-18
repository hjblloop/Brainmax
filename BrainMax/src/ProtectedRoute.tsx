import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isSignedIn  = !!localStorage.getItem("token");
    return isSignedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;