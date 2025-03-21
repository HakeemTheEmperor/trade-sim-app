import { ReactNode } from "react";
interface MainProps {
  children: ReactNode;
}

function Main({ children }: MainProps) {
  return (
    <div className="w-full mt-10 flex justify-center">
      <div className="w-11/12 md:w-1/2">{children}</div>
    </div>
  );
}

export default Main;
