import Modal from "./Modal";

interface LogoutAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const LogoutAlert = ({ isOpen, onClose, onSubmit }: LogoutAlertProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm logout"
      className="h-full max-h-[330px] w-full max-w-[738px] "
    >
      <div className="mx-auto flex h-full w-full flex-col items-center justify-end ">
        <p className="wi-full mb-10 mt-15 max-w-[514px] text-[20px] text-textBlack">
          Are you sure you want to logout of admin dashboard? You can log back
          in with your username and password
        </p>
        <div className="flex items-center justify-center gap-25 ">
          <button className="btn-red" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-blue" onClick={onSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutAlert;
