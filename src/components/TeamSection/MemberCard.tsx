import Image from "next/image";
import { TeamMemberDataType } from "@/types";

interface MemberCardProps {
  index: number;
  member: TeamMemberDataType;
  onEdit: (imageUrl: string, index: number) => void;
}

const MemberCard = ({ index, member, onEdit }: MemberCardProps) => {
  return (
    <div className="flex w-[229px] flex-col items-center justify-start gap-10">
      <Image
        src={member.imageUrl}
        width={229}
        height={229}
        alt="User"
        className="h-[229px] w-[229px] rounded-full bg-cover bg-center"
      />

      <button
        className="rounded bg-blue  px-4 py-2 text-xs uppercase  text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
        type="button"
        onClick={() => onEdit(member.imageUrl, index)}
      >
        Edit
      </button>
    </div>
  );
};

export default MemberCard;
