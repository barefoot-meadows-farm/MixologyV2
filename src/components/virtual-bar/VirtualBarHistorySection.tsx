
import React from "react";
import DrinkHistory from "@/components/DrinkHistory";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
};

const VirtualBarHistorySection: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-2">
          Please sign in to view your drink history
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
  return <DrinkHistory />;
};

export default VirtualBarHistorySection;
