import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { signinUser } from "@/store/userSlice";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
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
    if (!formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    const response = await dispatch(signinUser(formData));
    if (response.payload.success) {
      toast.success(`${response.payload.message}`);
      navigate("/");
    } else {
      console.log(response)
      toast.error(`${response.payload.message || "Some thing went wrong"}`)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
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
        <Button type="submit" className="mt-2">Sign in</Button>
        <Link to={"/signup"} className="py-2 font-sm  text-blue-600 hover:text-blue-500">
          New to ShopNow? Create an account
        </Link>
      </div>
    </form>
  );
};
