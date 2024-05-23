import { ServicePageDataType } from "@/types";
import Image from "next/image";

interface ServiceCardProps {
  index: number;
  service: ServicePageDataType;
  onEdit: (service: ServicePageDataType, index: number) => void;
  onDelete: (service: ServicePageDataType, index: number) => void;
}

const ServiceCard = ({
  index,
  service,
  onEdit,
  onDelete,
}: ServiceCardProps) => {
  return (
    <div className="flex w-full max-w-[354px] flex-col items-center justify-start gap-5 ">
      <div className="flex min-h-[392px] w-full min-w-[392px] max-w-[354px] flex-col items-center justify-end gap-[22px] rounded-[27px] border-[1px]  border-blue p-4 pb-[70px] ">
        <Image
          src={service?.imageUrl}
          width={108}
          height={108}
          alt="User"
          className="mx-auto h-[108px] w-[108px] overflow-hidden rounded-full bg-cover bg-center"
        />
        <p className="mx-auto text-center text-[31px] font-medium text-blue" style={{lineHeight: "30px"}}>
          {service?.text}
        </p>
      </div>
      <div className=" flex w-full items-center justify-end gap-[50px]">
        <button
          className=" w-[154px] rounded-[10px] bg-blue px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
          type="button"
          onClick={() => onEdit(service, index)}
        >
          Edit
        </button>
        <button
          className=" w-[154px] rounded-[10px] bg-red px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
          type="button"
          onClick={() => onDelete(service, index)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
