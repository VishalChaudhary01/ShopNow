import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { signupUser } from "@/store/userSlice";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    const response = await dispatch(signupUser(formData));
    if (response.payload.success) {
      toast.success(`${response.payload.message}`);
      navigate("/");
    } else {
      console.log(response);
      toast.error(`${response.payload.message || "Something went wrong"}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
      <Input
          onChange={handleChage}
          value={formData.name}
          name="name"
          type="text"
          placeholder="Name"
        />
        <Input
          onChange={handleChage}
          value={formData.email}
          name="email"
          type="email"
          placeholder="Email"
        />
        <Input
          onChange={handleChage}
          value={formData.password}
          name="password"
          type="password"
          placeholder="Password"
        />
        <Button type="submit" className="mt-2">
          Sign up
        </Button>
        <Link
          to={"/signin"}
          className="py-2 font-sm  text-blue-600 hover:text-blue-500"
        >
          Already have an account? Signin
        </Link>
      </div>
    </form>
  );
};
