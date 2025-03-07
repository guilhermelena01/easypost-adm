import { toast } from "react-toastify";
import getToastError from "./getToastError";

export default function handleToastifyError(toastify: any, error: string, throws?: boolean) {
    toast.update(toastify, getToastError(error));

    if (throws) {
        throw new Error(error);
    }
}