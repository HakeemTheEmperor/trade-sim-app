import MainButton from "./MainButton";
import Input from "./TextInput";
import "../index.css";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { handleLogin } from "../functions/authService";
import Spinner from "./Spinner";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await handleLogin(formData);
      window.location.href = "/";
    } catch (error: any) {
      if (error?.message) {
        console.log(error);
        setErrors({ general: error.message });
      } else {
        setErrors({ message: error });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center min-h-90">
        {loading && <Spinner />}
        <div className="w-full max-w-md rounded-xl shadow-md py-8 px-8 transparent_light">
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          <h2 className="text-[28px] font-bold main_text mb-6 text-center">
            Login to your Account
          </h2>
          <form className="flex flex-col w-full max-w-md">
            <div className="flex space-x-4 mb-4 flex-col gap-4">
              <Input
                name="Email"
                placeholder="johndoe@gmail.com"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <PasswordInput
                name="Password"
                placeholder="password@123"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <MainButton
              text="Signin"
              Click={(e) => handleSubmit(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
