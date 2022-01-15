import { useState } from "react";
import api from "../../services/api";
import { successToast, errorToast, warningToast } from "../../utils/toast";
import Input from "../ui/input";
import Button from "../ui/button";
import "./style.css";
const CreateUser = () => {
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const handleSubmit = () => {
    if (name && phone_number) {
      api
        .post("/", { name, phone_number })
        .then((res) => {
          successToast("User created Successfully!");
          setName("");
          setPhone_number("");
        })
        .catch((err) => {
          console.log(err.message);
          errorToast(err.response.data.message);
        });
    } else {
      if (!name) warningToast("Name required!");
      if (!phone_number) warningToast("Phone number required!");
    }
  };
  return (
    <section class="user">
      <div class="user-inner">
        <section class="title">
          <h1>Create User</h1>
          <div className="form">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Add
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CreateUser;
