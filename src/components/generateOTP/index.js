import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { successToast, errorToast, warningToast } from "../../utils/toast";
import Input from "../ui/input";
import Button from "../ui/button";
import "./style.css";
const GenerateOTP = () => {
  const navigate = useNavigate();
  const [phone_number, setPhone_number] = useState("");
  const [id, setId] = useState();
  const handleSubmit = () => {
    if (phone_number) {
      api
        .post("/generateOTP", { phone_number })
        .then((res) => {
          localStorage.setItem("id", res.data.user_id);
          successToast("OTP generated Successfully!");
          setPhone_number("");
        })
        .catch((err) => {
          console.log(err.message);
          errorToast(err.response.data.message);
        });
    } else {
      warningToast("Phone number required!");
    }
  };
  const handleGetOTP = () => {
    api
      .post(`/getOTP`, { id })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("OTP", res.data);
        successToast("OTP copied Successfully!");
        navigate("/verify-OTP");
      })
      .catch((err) => {
        console.log(err.message);
        errorToast(err.response.data.message);
      });
  };
  const handleGenerateNewOTP = () => {
    localStorage.removeItem("id");
    setId(null);
  };
  useEffect(() => {
    const id = localStorage.getItem("id");
    setId(id);
  }, [phone_number]);
  return (
    <section class="generate-OTP">
      <div class="generate-OTP-inner">
        <section class="title">
          <h1>Generate OTP</h1>
          <div className="form">
            {id ? (
              <>
                <Button
                  className="btn btn-info btn-medium pos-left"
                  onClick={handleGetOTP}
                >
                  Get OTP
                </Button>
                <Button
                  className="btn btn-primary btn-medium"
                  onClick={handleGenerateNewOTP}
                >
                  Generate New
                </Button>
              </>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder="Phone"
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                />
                <Button
                  className="btn btn-primary btn-medium pos-right"
                  onClick={handleSubmit}
                >
                  Generate OTP
                </Button>
              </>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default GenerateOTP;
