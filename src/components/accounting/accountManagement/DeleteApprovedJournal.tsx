import { useModal } from "@/util/Modals/ModalsContext";
import { X } from "lucide-react";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useGetApprovedGeneralJournal } from "@/app/(pages)/accounting/hooks/query";
import { CustomError } from "@/components/interface/errormessage";
import { deleteGeneralJournal } from "@/app/(pages)/accounting/api";

interface DeleteApproveModalProps {
  text: string;
  id: string;
}

const DeleteApproveModal: React.FC<DeleteApproveModalProps> = ({
  text,
  id,
}) => {
  const { closeModal } = useModal();
  const { refetch } = useGetApprovedGeneralJournal();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteGeneralJournal(id);
      if (response.status === "success") {
        toast.success(response.message);
        refetch();
        closeModal();
      }
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.data &&
        (error.response.data as CustomError).message
      ) {
        toast.error((error.response.data as CustomError).message);
      } else {
        toast.error("Network Error please Try Again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 flex justify-center items-center overflow-y-auto py-2">
      <div className="relative mb-10">
        <button
          onClick={closeModal}
          className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
        >
          <X className="text-primary-normal" />
        </button>
        <div className="bg-white p-6 rounded-2xl justify-center items-center shadow-md w-[18rem] md:w-[40rem] relative no-scrollbar">
          <div className="flex flex-col w-full md:w-[70%] justify-center pt-9 text-center m-auto mb-6">
            <MdDeleteOutline
              color="#374B58"
              cursor={"pointer"}
              size={"50px"}
              className="m-auto"
            />
            <p className="my-7 text-center text-[18px]">{text}</p>
          </div>

          <span className="mb-5 mt-3 flex flex-col justify-center m-auto w-[60%]">
            <button
              onClick={handleDelete}
              className={`bg-[#E00B2B] border-none w-full py-4 cursor-pointer text-foundation-white-white-400 rounded-[16px] mb-3`}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={closeModal}
              className={`text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-100 hover:text-white w-full py-4 cursor-pointer border boorder-foundation-purple-purple-400 rounded-[16px]`}
            >
              No, Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeleteApproveModal;
