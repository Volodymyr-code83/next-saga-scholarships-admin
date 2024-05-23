import { BlogDataType } from "@/types";
import Image from "next/image";

interface BlogCardProps {
  index: number;
  blogData: BlogDataType;
  onEdit: (blogData: BlogDataType, index: number) => void;
  onDelete: (blogData: BlogDataType, index: number) => void;
}

const BlogCard = ({ index, blogData, onEdit, onDelete }: BlogCardProps) => {
  return (
    <div className="flex w-full items-start justify-start gap-[35px]">
      <div className="relative flex h-full max-h-[427px] min-h-[427px] w-full max-w-[714px] items-center justify-center  rounded-[10px] bg-[#9D9595]">
        {blogData.imageUrl && (
          <Image
            src={blogData.imageUrl}
            width={714}
            height={427}
            alt=""
            className="h-full max-h-[427px] w-full max-w-[714px] rounded-[10px] bg-cover bg-center"
          />
        )}
      </div>
      <div className="relative flex h-full max-h-[427px] min-h-[427px] w-full  max-w-[714px] flex-col items-start justify-between gap-[10px] rounded-[10px]  bg-white p-5 ">
        <div className="flex w-full flex-col items-start justify-start gap-[10px]">
          <h5 className="line-clamp-1 text-[17px] font-medium text-blue">
            {blogData?.title}
          </h5>
          <p className="line-clamp-[15] text-[15px] font-normal text-black">
            {blogData?.details}
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-5">
          <button
            className="rounded bg-blue px-4 py-[6px] text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => onEdit(blogData, index)}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-[6px] text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={() => onDelete(blogData, index)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
