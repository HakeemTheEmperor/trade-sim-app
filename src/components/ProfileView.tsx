import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { UserData } from "../mockData/Data";
import { fetchUserById } from "../functions/userService";

interface ProfileViewProps {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProfileView({ setIsEditing }: ProfileViewProps) {
  const [data, setData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetchUserById();
        setData(response);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchUserData();
  }, []);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  if (!data) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white flex flex-col my-10 transparent_light rounded-md py-4  justify-center px-2">
      <div className="flex justify-between mb-3 items-center ">
        <h3 className="text-xl font-bold text-center">Edit Profile</h3>
        <FaEdit
          size={24}
          className="text-green-500 cursor-pointer"
          onClick={toggleEditing}
        />
      </div>
      {error ? (
        <p className="text-red-600 font-bold text-lg">{error}</p>
      ) : (
        <div className="flex flex-col gap-2 items-start justify-items-start">
          <div className="mt-2 pl-3">
            <p className="text-gray-500">First Name</p>
            <p className="font-bold text-lg pl-2 mt-1">{data.first_name}</p>
          </div>
          <div className="mt-2 pl-3">
            <p className="text-gray-500">Last Name</p>
            <p className="font-bold text-lg pl-2 mt-1">{data.last_name}</p>
          </div>
          <div className="mt-2 pl-3">
            <p className="text-gray-500">Username</p>
            <p className="font-bold text-lg pl-2 mt-1">{data.username}</p>
          </div>
          <div className="mt-2 pl-3">
            <p className="text-gray-500">Phone Number</p>
            <p className="font-bold text-lg pl-2 mt-1">
              {data.phone_number ? data.phone_number : "Null"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileView;
