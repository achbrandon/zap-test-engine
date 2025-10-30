import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OpenAccount = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page and trigger the auth dialog
    navigate("/", { state: { openAuthDialog: true } });
  }, [navigate]);

  return null;
};

export default OpenAccount;
