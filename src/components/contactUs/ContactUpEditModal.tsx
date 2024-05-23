"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import Modal from "@/components/common/Modals/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  imageUrl: yup.string().required("Image is required"),
});

interface ContactUpEditModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onSubmit: (image: string) => void;
}

const ContactUpEditModal = ({
  isOpen,
  imageUrl,
  onClose,
  onSubmit,
}: ContactUpEditModalProps) => {
  const [image, setImage] = useState<string | null>(imageUrl);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<{ imageUrl: string }>({
    resolver: yupResolver(schema),
  });

  const handleCapture = async (e: ChangeEvent<HTMLInputElement>) => {
    setImage(null);

    e.target?.files && setFile(e.target?.files[0]);
    const fileReader = new FileReader();
    e.target?.files && fileReader.readAsDataURL(e.target?.files[0]);
    fileReader.onload = async (f) => {
      const imageData = f.target?.result;
      if (imageData) {
        setError("imageUrl", { message: "" });
        setValue("imageUrl", imageData as string);
        setImage(imageData as string);
      }
    };
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current?.click();
    }
  };

  // Handle form submission
  const handleFormSubmit = handleSubmit((data: { imageUrl: string }) => {
    if (image) {
      onSubmit(image);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit New image"
      className="h-full w-full max-w-[1330px]"
    >
      {" "}
      <form onSubmit={handleFormSubmit}>
        <div
          className="mt-[30px] flex  w-full flex-col
         items-center justify-start gap-11"
        >
          <div className="flex w-full flex-col items-center justify-start gap-5">
            <div className="relative flex h-full max-h-[597px] min-h-[597px] w-full max-w-[926px] items-center justify-center  rounded-[20px] bg-[#9D9595]">
              {image && (
                <Image
                  src={image}
                  width={926}
                  height={597}
                  alt="User"
                  className="h-full max-h-[597px] w-[926px] rounded-[20px] bg-cover bg-center"
                />
              )}
            </div>
            <div
              role="button"
              onClick={handleButtonClick}
              className="mx-auto flex cursor-pointer items-center justify-center gap-6 "
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
            {errors.imageUrl && (
              <p className="text-[14px] text-red">
                {errors?.imageUrl?.message}
              </p>
            )}
          </div>
          <div className=" flex w-full items-center justify-end gap-[50px]">
            <button
              className=" w-[154px] rounded-[10px] bg-red px-4 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className=" w-[154px] rounded-[10px] bg-blue px-4 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ContactUpEditModal;
