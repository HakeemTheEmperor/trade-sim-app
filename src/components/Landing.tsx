import { useNavigate } from "react-router-dom";
import MainButton from "./MainButton";

function Landing() {
  const navigate = useNavigate();
  const handleSignin = async () => {
    navigate("/login");
  };
  const handleSignup = async () => {
    navigate("/signup");
  };
  return (
    <div
      className="w-full flex min-h-screen flex-col justify-around items-center
     text-white px-5"
    >
      <div className="text-4xl font-bold flex flex-col gap-5 md:items-center">
        <p>Join the Trading Community.</p>
        <p>Start Investing Today</p>
      </div>
      <div className="w-full md:w-1/2 justify-start">
        <MainButton
          text="Signup"
          Click={handleSignup}
        />
        <MainButton
          text="Signin"
          Click={handleSignin}
        />
      </div>
    </div>
  );
}

export default Landing;
