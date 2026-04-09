import { useAuth } from "react-oidc-context";
import { Navigate } from "react-router";

function LoginPage() {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Login</h1>
      <button 
        onClick={() => auth.signinRedirect()}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white"
        }}
      >
        Sign in with Authentik
      </button>
    </div>
  );
}

export default LoginPage;