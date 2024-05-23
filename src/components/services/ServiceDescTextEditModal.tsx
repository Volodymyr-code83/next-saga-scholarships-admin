"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modals/Modal";
import * as yup from "yup";

const schema = yup.object().shape({
  textInput: yup.string().required("Text is required"),
});

interface ServiceDescTextEditModalProps {
  isOpen: boolean;
  text: string;
  onClose: () => void;
  onSubmit: (text: string) => void;
}

const ServiceDescTextEditModal = ({
  isOpen,
  text,
  onClose,
  onSubmit,
}: ServiceDescTextEditModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("textInput", text || "");
  }, [setValue, text]);

  const onFormSubmit: SubmitHandler<{ textInput: string }> = (data) => {
    onSubmit(data.textInput);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit text"
      className="h-full  w-full max-w-[1330px] "
    >
      {" "}
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div
          className="mt-[30px] flex  w-full flex-col
         items-center justify-start gap-11"
        >
          <div className="flex w-full flex-col items-start justify-start gap-4">
            <div className="relative flex h-full max-h-[597px] w-full max-w-[1230px] items-center justify-center  rounded-[20px] bg-[#F2F2F2]">
              <textarea
                {...register("textInput")}
                rows={5}
                className="w-full rounded-[20px] bg-[#F2F2F2] p-[30px]"
              />
            </div>
            {errors?.textInput && (
              <p className="text-[14px] text-red">
                {errors?.textInput?.message}
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

export default ServiceDescTextEditModal;
