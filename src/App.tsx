import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./Page/Index";
import { RegisterPage } from "./Page/RegisterPage";
import { LoginPage } from "./Page/LoginPage";
import { HomePage } from "./Page/HomePage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { NotFound404 } from "./Page/NotFound404";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pública */}
          <Route path="/" element={<Index />} />

          {/* Solo si NO está logueado */}
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Solo si está logueado */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* Redireccion 404 */}
          <Route path="/*" element={<NotFound404 />}/>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
