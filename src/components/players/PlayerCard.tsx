import Image from "next/image";
import { PlayerDataType } from "@/types";

interface PlayerCardProps {
  index: number;
  playerData: PlayerDataType;
  onDelete: (playerData: PlayerDataType, index: number) => void;
  onEdit: (playerData: PlayerDataType, index: number) => void;
}

const PlayerCard = ({
  index,
  playerData,
  onDelete,
  onEdit,
}: PlayerCardProps) => {
  return (
    <div className="flex h-[214px] w-full max-w-[441px] items-start justify-start rounded-[20px] bg-white">
      <div className="flex h-[214px] w-[147px] min-w-[147px] items-center justify-center rounded-[20px] bg-slate-200">
        <Image
          src={playerData?.imageUrl}
          width={147}
          height={214}
          alt="User"
          className="h-[214px] w-[147px] bg-cover rounded-[20px] bg-center"
        />
      </div>
      <div className="my-auto flex   w-full flex-col items-start justify-start gap-5 p-5 pr-[30px]">
        <div className="flex w-full flex-col items-start justify-start gap-[10px]">
          <p className="line-clamp-1 text-[13px] font-medium leading-[13px] text-textBlack">
            {`Name: ${playerData?.name}`}
          </p>
          <p className="line-clamp-1 text-[10px] leading-[10px] text-textBlack">
            {`Year: ${playerData?.date}`}
          </p>
          <p className="line-clamp-1 text-[10px] leading-[10px] text-textBlack">
            {`Sport: ${playerData?.sport}`}
          </p>
          <p className="line-clamp-1 text-[10px] leading-[10px] text-textBlack">
            {`Major: ${playerData?.race}`}
          </p>
          <p className="line-clamp-1 text-[10px] leading-[10px] text-textBlack">
            {`Country: ${playerData?.country}`}
          </p>
          <p className="line-clamp-1 text-[10px] leading-[10px] text-textBlack">
            {`University: ${playerData?.university}`}
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-5">
          <button
            className="rounded bg-blue px-4 py-[6px] text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={() => onEdit(playerData, index)}
          >
            Edit
          </button>
          <button
            className=" rounded bg-red px-4 py-[6px] text-[13px] uppercase leading-[13px] text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={() => onDelete(playerData, index)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
