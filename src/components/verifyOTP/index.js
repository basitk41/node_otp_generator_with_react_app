import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { successToast, errorToast, warningToast } from "../../utils/toast";
import Input from "../ui/input";
import Button from "../ui/button";
import "./style.css";
const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [id, setId] = useState();
  const handleSubmit = () => {
    if (otp) {
      api
        .post(`/verifyOTP`, { id, otp })
        .then((res) => {
          console.log(res.data);
          localStorage.removeItem("OTP");
          successToast("Valid OTP!");
          setOTP("");
          navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
          errorToast(err.response.data.message);
          localStorage.removeItem("OTP");
          setOTP("");
          navigate("/");
        });
    } else {
      warningToast("OTP code required!");
    }
  };
  useEffect(() => {
    const otp = localStorage.getItem("OTP");
    const id = localStorage.getItem("id");
    otp ? setOTP(otp) : navigate("/generate-OTP");
    setId(id);
  }, []);
  return (
    <section class="verify-OTP">
      <div class="verify-OTP-inner">
        <section class="title">
          <h1>Verify OTP</h1>
          <div className="form">
            <Input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
            <Button
              className="btn btn-primary btn-medium pos-right"
              onClick={handleSubmit}
            >
              Verify OTP
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default VerifyOTP;
