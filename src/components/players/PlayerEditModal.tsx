"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import Image from "next/image";
import Modal from "@/components/common/Modals/Modal";
import { PlayerDataType } from "@/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  date: yup.string().required("Date is required"),
  sport: yup.string().required("Sport is required"),
  race: yup.string().required("Race is required"),
  country: yup.string().required("Country is required"),
  university: yup.string().required("University is required"),
  imageUrl: yup.string().required("Image is required"),
});

interface PlayerEditModalProps {
  isOpen: boolean;
  player: PlayerDataType | null;
  onClose: () => void;
  onSubmit: (player: PlayerDataType) => void;
}

const PlayerEditModal = ({
  isOpen,
  player,
  onClose,
  onSubmit,
}: PlayerEditModalProps) => {
  const [image, setImage] = useState<string | null>(
    player ? player?.imageUrl : "",
  );
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<PlayerDataType>({
    resolver: yupResolver(schema),
  });

  // Set form values when player prop changes
  useEffect(() => {
    player && setValue("name", player.name);
    player && setValue("date", player.date);
    player && setValue("sport", player.sport);
    player && setValue("race", player.race);
    player && setValue("country", player.country);
    player && setValue("university", player.university);
    player && setValue("imageUrl", player.imageUrl);
  }, [player, setValue]);

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
  const handleFormSubmit = handleSubmit((data: PlayerDataType) => {
    if (image) {
      onSubmit({
        ...data,
        imageUrl: image,
      });
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit player details"
      className="h-full w-full max-w-[1330px]"
    >
      <form onSubmit={handleFormSubmit}>
        <div
          className="mt-[50px] flex  w-full flex-col
         items-center justify-start gap-11"
        >
          <div className="flex w-full items-start justify-start gap-[30px]">
            <div className="flex w-full flex-col items-start justify-start gap-4">
              <div className="relative flex h-full max-h-[642px] min-h-[642px] w-full max-w-[570px] items-center justify-center  rounded-[10px] bg-[#9D9595]">
                {image && (
                  <Image
                    src={image}
                    width={570}
                    height={642}
                    alt="User"
                    className="h-full max-h-[642px] min-h-[642px] w-[570px] rounded-[10px] bg-cover bg-center"
                  />
                )}
                <div
                  role="button"
                  onClick={handleButtonClick}
                  className="absolute left-1/2 top-1/2 -ml-8 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center gap-6 "
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
                    {...register("imageUrl")}
                    accept="image/png"
                    ref={fileInputRef}
                    onChange={handleCapture}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              {errors.imageUrl && (
                <p className="text-[14px] text-red">
                  {errors?.imageUrl?.message}
                </p>
              )}
            </div>
            <div className="mt-15 flex w-full max-w-[530px] flex-col items-start justify-start gap-[110px]">
              <div className="flex w-full max-w-[530px]  flex-col items-start justify-start gap-[10px]">
                <div className=" flex w-full  items-center justify-start gap-[18px]">
                  <label
                    className="min-w-[150px] text-right text-[20px] font-medium text-textBlack dark:text-white"
                    htmlFor="name"
                  >
                    name
                  </label>
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <input
                      className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className=" text-[14px] text-red ">
                        {errors?.name?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" flex w-full  items-center justify-start gap-[18px]">
                  <label
                    className="min-w-[150px] text-right text-[20px] font-medium text-textBlack dark:text-white"
                    htmlFor="date"
                  >
                    Year
                  </label>
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <input
                      className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="date"
                      {...register("date")}
                    />
                    {errors.date && (
                      <p className=" text-[14px] text-red ">
                        {errors?.date?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" flex w-full  items-center justify-start gap-[18px]">
                  <label
                    className="min-w-[150px] text-right text-[20px] font-medium text-textBlack dark:text-white"
                    htmlFor="sport"
                  >
                    Sport
                  </label>
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <input
                      className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="sport"
                      {...register("sport")}
                    />
                    {errors.sport && (
                      <p className=" text-[14px] text-red ">
                        {errors?.sport?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" flex w-full  items-center justify-start gap-[18px]">
                  <label
                    className="min-w-[150px] text-right text-[20px] font-medium text-textBlack dark:text-white"
                    htmlFor="race"
                  >
                    Major
                  </label>
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <input
                      className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="race"
                      {...register("race")}
                    />
                    {errors.race && (
                      <p className=" text-[14px] text-red ">
                        {errors?.race?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" flex w-full  items-center justify-start gap-[18px]">
                  <label
                    className="min-w-[150px] text-right text-[20px] font-medium text-textBlack dark:text-white"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <input
                      className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="country"
                      {...register("country")}
                    />
                    {errors.country && (
                      <p className=" text-[14px] text-red ">
                        {errors?.country?.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className=" flex w-full  items-center justify-start gap-[18px]">
                  <label
                    className="min-w-[150px] text-right text-[20px] font-medium text-textBlack dark:text-white"
                    htmlFor="university"
                  >
                    University
                  </label>
                  <div className="flex w-full flex-col items-start justify-start gap-4">
                    <input
                      className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-5 py-[11px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      id="university"
                      {...register("university")}
                    />
                    {errors.university && (
                      <p className=" text-[14px] text-red ">
                        {errors?.university?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className=" flex w-full items-center justify-end gap-[100px]">
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
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default PlayerEditModal;
