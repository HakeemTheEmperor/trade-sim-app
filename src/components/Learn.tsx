import { FaMicrophone, FaBook, FaDumbbell } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { RiArticleLine } from "react-icons/ri";
import { IoGridOutline } from "react-icons/io5";
import "../index.css";
import { LearnItem } from "./LearnItem";

function Learn() {
  return (
    <div className="flex flex-col mt-3">
      <div>
        <h3 className="text-2xl text-white font-bold mt-4">Learn</h3>
        <p className="text-gray-400 text-start w-full">
          Don't worry, we've got your back with some awesome resources to help
          you learn and grow!!!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 my-8">
        <LearnItem
          text="PODCASTS"
          icon={FaMicrophone}
        />
        <LearnItem
          text="VIDEOS"
          icon={MdOndemandVideo}
        />
        <LearnItem
          text="GLOSSARY"
          icon={FaBook}
        />
        <LearnItem
          text="Blogs & Articles"
          icon={RiArticleLine}
        />
        <LearnItem
          text="Practice"
          icon={FaDumbbell}
        />

        <LearnItem
          text="More"
          icon={IoGridOutline}
        />
      </div>
    </div>
  );
}

export default Learn;
