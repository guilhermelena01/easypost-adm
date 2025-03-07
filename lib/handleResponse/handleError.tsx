import { toast } from "react-toastify";

export default function handleError(error: string) {
    toast.error(error);
}