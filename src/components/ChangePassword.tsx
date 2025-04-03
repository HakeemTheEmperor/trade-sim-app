import { useState } from "react";
import Spinner from "./Spinner";
import PasswordInput from "./PasswordInput";
import { handlePasswordChange } from "../functions/authService";
import MainButton from "./MainButton";

function ChangePassword() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    newPasswordConfirm: "",
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

    if (formData.new_password !== formData.newPasswordConfirm) {
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
      await handlePasswordChange(formData);
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-white flex flex-col items-center justify-center transparent_light rounded-md mt-4 py-4 w-full px-2">
      {loading && <Spinner />}
      <h3 className="text-xl font-bold text-center">Change Password</h3>
      <form className="flex flex-col w-full">
        <div className="flex space-x-4 mb-4 flex-col gap-4">
          <PasswordInput
            name="Old Password"
            placeholder="password@123"
            id="old_password"
            value={formData.old_password}
            onChange={handleChange}
          />
          {errors.old_password && (
            <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
          )}
          <PasswordInput
            name="New Password"
            placeholder="password@123"
            id="new_password"
            value={formData.new_password}
            onChange={handleChange}
          />
          {errors.new_password && (
            <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
          )}
          <PasswordInput
            name="New Password Confirm"
            placeholder="password@123"
            id="newPasswordConfirm"
            value={formData.newPasswordConfirm}
            onChange={handleChange}
          />
          {errors.newPasswordConfirm && (
            <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>
          )}
        </div>
        <MainButton
          text="Reset Password"
          Click={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  );
}

export default ChangePassword;
