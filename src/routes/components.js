import Home from "../components/home";
import CreateUser from "../components/createUser";
import GenerateOTP from "../components/generateOTP";
import VerifyOTP from "../components/verifyOTP";
export const paths = [
  {
    Component: <Home />,
    path: "/",
  },
  {
    Component: <CreateUser />,
    path: "/create-user",
  },
  {
    Component: <GenerateOTP />,
    path: "/generate-OTP",
  },
  {
    Component: <VerifyOTP />,
    path: "/verify-OTP",
  },
];
