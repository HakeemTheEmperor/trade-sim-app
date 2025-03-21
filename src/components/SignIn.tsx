import MainButton from "./MainButton";
import Input from "./TextInput";

function SignIn() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md rounded-xl shadow-md py-8 px-8 bg-white">
          <h2 className="text-[28px] font-bold text-gray-700 mb-6 text-center">
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
              onClick={() => console.log("Hello World")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
