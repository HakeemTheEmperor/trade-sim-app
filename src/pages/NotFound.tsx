import { useNavigate } from "react-router-dom";
import MainButton from "../components/MainButton";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10 ">
        <h1 className="text-9xl font-bold text-transparent bg-gradient-to-r from-green-500 to-green-700 bg-clip-text">
          404
        </h1>
        <p className="text-white text-3xl text-center">
          ...uhhhhmmmm, are you lost?
        </p>
      </div>
      <div className="flex flex-col justify-center gap-1 w-full">
        <MainButton
          text="Home"
          Click={() => {
            navigate("/portfolio");
          }}
        />
      </div>
    </div>
  );
}

export default NotFound;
