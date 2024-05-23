import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "../common/Modals/Modal";
import * as yup from "yup";
import { PageHeaderDataType } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";

// Define the type for the form data
interface FormValues {
  heading: string;
  subHeading: string;
}

const schema = yup.object().shape({
  heading: yup.string().required("Heading is required"),
  subHeading: yup.string().required("Sub-heading is required"),
});

interface PageHeaderModalProps {
  isOpen: boolean;
  data: PageHeaderDataType;
  onClose: () => void;
  onSubmit: (data: PageHeaderDataType) => void;
}

const PageHeaderModal = ({
  isOpen,
  data,
  onClose,
  onSubmit,
}: PageHeaderModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: data, // Set default values from prop
  });

  const handleFormSubmit: SubmitHandler<FormValues> = (formData) => {
    onSubmit(formData);
  };

  // Set values from prop when component mounts or data prop changes
  useEffect(() => {
    setValue("heading", data.heading || "");
    setValue("subHeading", data.subHeading || "");
  }, [setValue, data]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit headers"
      className="h-full  w-full max-w-[738px] "
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mx-auto flex h-full w-full flex-col items-center justify-end ">
          <div className="flex w-full max-w-[802px] flex-col items-start justify-start gap-5  bg-white px-9 ">
            <div className="gap flex w-full flex-col items-start justify-start gap-3">
              <label
                className="block text-[22px] font-medium text-blue dark:text-white"
                htmlFor="header"
              >
                Header
              </label>

              <input
                {...register("heading")} // Register input field with react-hook-form
                className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-[14px] py-[9px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                type="text"
                id="header"
              />
              {errors.heading && (
                <p className="text-[14px] text-red">{errors.heading.message}</p>
              )}
            </div>

            <div className="gap flex w-full flex-col items-start justify-start gap-3">
              <label
                className="block w-[129px] text-nowrap text-[22px] font-medium text-blue dark:text-white"
                htmlFor="sub-header"
              >
                Sub-Header
              </label>

              <textarea
                {...register("subHeading")} // Register textarea with react-hook-form
                className="w-full rounded-[10px] border border-[#AFAFAF] bg-[#F2F2F2] px-[16px] py-[9px] text-[#131E42] focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                rows={4}
                id="sub-header"
              />
              {errors.subHeading && (
                <p className="text-[14px] text-red">
                  {errors.subHeading.message}
                </p>
              )}
            </div>

            <div className="mt-7 flex w-full items-center justify-center gap-[100px]">
              <button
                className=" w-[154px] rounded-[10px] bg-blue px-4 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
                type="submit"
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
        </div>
      </form>
    </Modal>
  );
};

export default PageHeaderModal;
