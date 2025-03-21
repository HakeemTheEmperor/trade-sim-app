import MainButton from "./MainButton";
import Input from "./TextInput";

function SignUp() {
  return (
    <div className="mb-10">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md rounded-xl shadow-md py-8 px-8 bg-white">
          <h2 className="text-[28px] font-bold text-gray-700 mb-6 text-center">
            Create An Account
          </h2>
          <form className="flex flex-col w-full max-w-md">
            <div className="flex space-x-4 mb-4 flex-col gap-4">
              <Input
                name="First Name"
                placeholder="John"
                id="firstName"
                type="text"
              />
              <Input
                name="Last Name"
                placeholder="Doe"
                id="lastName"
                type="text"
              />
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
              text="Create"
              onClick={() => console.log("Hello World")}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
