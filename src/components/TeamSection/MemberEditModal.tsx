"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import Modal from "../common/Modals/Modal";

interface MemberEditModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onSubmit: (image: string) => void;
}

const MemberEditModal = ({
  isOpen,
  imageUrl,
  onClose,
  onSubmit,
}: MemberEditModalProps) => {
  const [image, setImage] = useState<string | null>(imageUrl);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCapture = async (e: ChangeEvent<HTMLInputElement>) => {
    setImage(null);

    e.target?.files && setFile(e.target?.files[0]);
    const fileReader = new FileReader();
    e.target?.files && fileReader.readAsDataURL(e.target?.files[0]);
    fileReader.onload = async (f) => {
      const imageData = f.target?.result;
      if (imageData) {
        setImage(imageData as string);
      }
    };
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  const handleSubmit = () => {
    if (image) {
      onSubmit(image);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit image"
      className="h-full  w-full max-w-[738px] "
    >
      <div
        className="flex w-full max-w-[802px] flex-col items-center
         justify-start gap-11"
      >
        <div className="relative flex h-[284px] w-[284px] items-center justify-center  rounded-full bg-slate-100">
          {image && (
            <Image
              src={image}
              width={284}
              height={284}
              alt="User"
              className="h-[284px] w-[284px] rounded-full bg-cover bg-center"
            />
          )}
          <div
            role="button"
            onClick={handleButtonClick}
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center gap-6 "
          >
            <svg
              width="26"
              height="31"
              viewBox="0 0 26 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.3438 5.23792C18.7565 2.54238 15.1818 1.0186 11.4455 1.0186H6.9581C3.72621 1.00621 1.07699 3.58085 1.00086 6.81274V23.6698C0.946475 26.8551 3.48382 29.4826 6.67065 29.5385C6.76543 29.5385 6.86177 29.5385 6.9581 29.5354H19.3698C22.5846 29.5028 25.1701 26.8846 25.1655 23.6698V14.7385C25.1655 11.1971 23.7961 7.79287 21.3438 5.23792V5.23792Z"
                stroke="#131E42"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.8864 1V5.51998C16.8864 7.72637 18.6717 9.51478 20.878 9.521H25.1572"
                stroke="#131E42"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6057 16.793H8.99213"
                stroke="#131E42"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.8 20.5989V12.9854"
                stroke="#131E42"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className=" text-nowrap text-[20px]  font-semibold text-blue">
              Add new image
            </p>

            <input
              accept="image/png"
              ref={fileInputRef}
              onChange={handleCapture}
              type="file"
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className=" flex w-full items-center justify-center gap-[100px]">
          <button
            className=" w-[154px] rounded-[10px] bg-blue px-4 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={handleSubmit}
          >
            Update
          </button>
          <button
            className=" w-[154px] rounded-[10px] bg-red px-4 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MemberEditModal;
