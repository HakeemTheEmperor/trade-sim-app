import { ReactNode } from "react";

interface CenterBoxProps {
  children: ReactNode;
}

function CenterBox({ children }: CenterBoxProps) {
  return (
    <div className="w-full min-h-screen mt-10 flex justify-center items-center py-8">
      <div className="w-11/12 md:w-1/2">{children}</div>
    </div>
  );
}

export default CenterBox;
