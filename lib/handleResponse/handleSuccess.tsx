import { toast } from "react-toastify";

export default function handleSuccess(success: string) {
    toast.success(success);
}