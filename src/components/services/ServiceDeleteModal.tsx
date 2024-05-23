"use client";

import Modal from "@/components/common/Modals/Modal";

interface ServiceDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ServiceDeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ServiceDeleteModalProps) => {
  const handleSubmit = () => {
    onSubmit();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete this service"
      className="h-full  w-full max-w-[738px] "
    >
      <div
        className="mt-[60px] flex  w-full flex-col
         items-center justify-start gap-11"
      >
        <div className="relative flex h-auto w-full max-w-[565px] items-center justify-center ">
          <p className="text-center text-[20px] text-textBlack ">
            Are you sure you want to delete this service? You will not be able
            to recover this service information after it get’s deleted.
          </p>
        </div>
        <div className=" flex w-full items-center justify-center gap-[100px]">
          <button
            className=" w-[154px] rounded-[10px] bg-red px-4 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-red"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className=" w-[154px] rounded-[10px] bg-blue px-4 py-3 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-blue"
            type="button"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ServiceDeleteModal;
