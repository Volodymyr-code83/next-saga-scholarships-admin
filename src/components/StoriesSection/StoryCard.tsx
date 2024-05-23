import Image from "next/image";
import Link from "next/link";
import { StoryDataType } from "@/types";

interface StoryCardProps {
  index: number;
  story: StoryDataType;
  onEdit: (imageUrl: string, index: number) => void;
}

const StoryCard = ({ index, story, onEdit }: StoryCardProps) => {
  return (
    <div className="w-full max-w-[467px]">
      <div className="group relative h-[574px] w-full max-w-[467px] rounded-[20px] hover:border-2 hover:border-[#000000]">
        <Image
          src={story?.imageUrl}
          width={467}
          height={574}
          alt="User"
          className="h-[574px] w-full max-w-[467px] rounded-[20px] bg-cover bg-center transition-opacity duration-300 ease-in-out group-hover:opacity-0"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-between gap-10 p-8 opacity-0 group-hover:opacity-100">
          <div className="flex w-full flex-col items-start justify-start gap-12">
            <h2 className="text-4xl font-semibold text-textBlack">
              {story?.heading}
            </h2>
            <h5>{story?.subHeading}</h5>
          </div>
          <Link
            href={story?.detailsLink}
            className="active:textBlack  rounded border border-solid border-textBlack bg-transparent  px-6 py-3 text-xs font-bold uppercase text-textBlack outline-none transition-all duration-150 ease-linear hover:bg-textBlack hover:text-white focus:outline-none"
            type="button"
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="mt-7 flex w-full items-center justify-center gap-14 ">
        <button
          className="btn-blue"
          onClick={() => onEdit(story?.imageUrl, index)}
        >
          Edit
        </button>
        <button className="btn-red">Confirm</button>
      </div>
    </div>
  );
};

export default StoryCard;
