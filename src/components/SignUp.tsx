import MainButton from "./MainButton";
import Input from "./TextInput";
import "../index.css";
import PasswordInput from "./PasswordInput";
import { useState } from "react";
import { handleSignUp } from "../functions/authService";
import Spinner from "./Spinner";

function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await handleSignUp(formData);
      window.location.href = "/portfolio";
    } catch (error: any) {
      if (error?.message) {
        setErrors({ general: error.message });
      } else {
        setErrors({ message: error });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex flex-col items-center justify-center h-screen">
        {loading && <Spinner />}
        <div className="w-full max-w-md rounded-xl shadow-md py-8 px-8 transparent_light">
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}
          <h2 className="text-[28px] font-bold main_text mb-6 text-center">
            Create An Account
          </h2>
          <form className="flex flex-col w-full max-w-md">
            <div className="flex space-x-4 mb-4 flex-col gap-4">
              <Input
                name="First Name"
                placeholder="John"
                id="first_name"
                type="text"
                onChange={handleChange}
                value={formData.first_name}
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm">{errors.first_name}</p>
              )}
              <Input
                name="Last Name"
                placeholder="Doe"
                id="last_name"
                type="text"
                onChange={handleChange}
                value={formData.last_name}
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">{errors.last_name}</p>
              )}
              <Input
                name="Email"
                placeholder="johndoe@gmail.com"
                id="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
              <Input
                name="Username"
                placeholder="johndoe@gmail.com"
                id="username"
                type="text"
                onChange={handleChange}
                value={formData.username}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
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

              <PasswordInput
                name="Confirm Password"
                placeholder="password@123"
                id="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
              )}
            </div>
            <MainButton
              text="Create"
              Click={(e) => handleSubmit(e)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
