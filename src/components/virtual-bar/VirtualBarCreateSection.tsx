
import React from "react";
import CustomRecipeForm from "@/components/CustomRecipeForm";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
};

const VirtualBarCreateSection: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-2">
          Please sign in to create custom recipes
        </p>
        <button
          className="text-mixology-burgundy font-medium"
          onClick={() => navigate("/login")}
        >
          Sign In
        </button>
      </div>
    );
  }
  return <CustomRecipeForm />;
};

export default VirtualBarCreateSection;
