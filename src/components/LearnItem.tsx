import { IconType } from "react-icons";

interface LearnItemProps {
  text: string;
  icon: IconType;
}

export function LearnItem({ text, icon: Icon }: LearnItemProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-30 texture-bg rounded-md">
      <Icon
        size={50}
        fill="green"
        stroke="green"
      />
      <p className="text-green-600 text-center">{text.toUpperCase()}</p>
    </div>
  );
}
