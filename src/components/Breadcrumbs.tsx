import { useNavigate } from "react-router-dom";

function Breadcrumbs() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center text-gray-500 hover:text-white transition-colors cursor-pointer mb-5"
    >
      <span className="mr-2">←</span>
      Back
    </button>
  );
}

export default Breadcrumbs;
