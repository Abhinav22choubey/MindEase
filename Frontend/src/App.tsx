import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentalHealth from "./pages/Question/MentalHealth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Auth/Dashboard";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import Wchat from "./pages/Wchatapp.jsx";
import DashIndex from "./pages/DashIndex.jsx";

const queryClient = new QueryClient();

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          {/* <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/test" element={<MentalHealth/>} />
            <Route path="*" element={<NotFound />} />
          </Routes> */}
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  {" "}
                  <Index />{" "}
                </ProtectedRoute>
              }
            />
            <Route
              path="/test"
              element={
                <ProtectedRoute>
               <MentalHealth />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wchat"
              element={
                <ProtectedRoute>
                  <Wchat/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <DashIndex/>
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={<div className="p-8">404 - Not Found</div>}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
