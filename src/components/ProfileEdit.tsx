import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { fetchUserById, handleEdit } from "../functions/userService";
import Input from "./TextInput";
import MainButton from "./MainButton";
import Spinner from "./Spinner";

interface ProfileEditProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileEdit({ setIsEditing }: ProfileEditProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetchUserById();
        setFormData({
          first_name: response.first_name,
          last_name: response.last_name,
          username: response.username,
          phone_number: response.phone_number || "Null", // Handle null phone_number
        });
      } catch (error: any) {
        setErrors({ general: error.message });
      }
    };
    fetchFormData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
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
      await handleEdit(formData);
      toggleEditing();
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
    <div className="text-white flex flex-col my-10 transparent_light rounded-md py-4  justify-center w-full px-2">
      {loading && <Spinner />}
      <div className="flex justify-between mb-3 items-center">
        <h3 className="text-xl font-bold text-center">Edit Profile</h3>
        <MdOutlineCancel
          size={24}
          className="text-green-500 cursor-pointer"
          onClick={toggleEditing}
        />
      </div>
      <form className="flex flex-col w-full">
        <div className="flex space-x-4 mb-4 flex-col gap-4">
          <Input
            name="First Name"
            placeholder="John"
            id="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm italic">{errors.first_name}</p>
          )}
          <Input
            name="Last Name"
            placeholder="Doe"
            id="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm italic">{errors.last_name}</p>
          )}
          <Input
            name="Username"
            placeholder="Doe"
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-red-500 text-sm italic">{errors.username}</p>
          )}
          <Input
            name="Phone Number"
            placeholder="+1-98835934"
            id="phone_number"
            type="text"
            value={formData.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm italic">{errors.username}</p>
          )}
        </div>
        <MainButton
          text="Edit"
          Click={(e) => handleSubmit(e)}
        />
        {errors.general && (
          <p className="text-red-500 text-sm italic">{errors.general}</p>
        )}
      </form>
    </div>
  );
}

export default ProfileEdit;
