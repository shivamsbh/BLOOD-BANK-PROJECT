import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Form from "../../components/shared/Form/Form";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);

  // Handle error display with toast instead of alert
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="row g-0">
      <div className="col-md-8 form-banner">
        <img 
          src="./assets/images/banner1.jpg" 
          alt="Blood Bank Login" 
          className="img-fluid h-100 w-100"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="col-md-4 form-container">
        <Form
          formTitle="Login to Blood Bank"
          submitBtn="Login"
          formType="login"
        />
      </div>
    </div>
  );
};

export default Login;
