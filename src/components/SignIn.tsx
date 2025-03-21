import MainButton from "./MainButton";
import Input from "./TextInput";
import "../index.css";

function SignIn() {
  return (
    <div>
      <div className="flex flex-col items-center min-h-90 border-white border-3">
        <div className="w-full max-w-md rounded-xl shadow-md py-8 px-8 transparent_light">
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
              />
              <Input
                name="Password"
                placeholder="password@123"
                id="password"
                type="password"
              />
            </div>
            <MainButton
              text="Signin"
              Click={() => console.log("Hello World")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
