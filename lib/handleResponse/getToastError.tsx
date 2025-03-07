import { UpdateOptions } from "react-toastify";

export default function getToastError(msg: string): UpdateOptions {
    return {
      render: msg,
      type: "error",
      isLoading: false,
      autoClose: 5000,
      closeButton: true,
    };
  }