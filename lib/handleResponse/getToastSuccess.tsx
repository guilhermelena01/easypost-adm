import { UpdateOptions } from "react-toastify";

export default function getToastSuccess(msg: string): UpdateOptions {
    return {
        render: msg.toString(),
        type: "success",
        isLoading: false,
        autoClose: 5000,
        closeButton: true,
    };
}