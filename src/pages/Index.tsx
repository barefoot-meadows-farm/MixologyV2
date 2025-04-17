
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to Home component
    navigate("/", { replace: true });
  }, [navigate]);
  
  // Render a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-mixology-dark">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
