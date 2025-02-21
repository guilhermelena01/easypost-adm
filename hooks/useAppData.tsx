import AppContext from "@/app/context/AppContext";
import { useContext } from "react";

export default function useAppData() {
    return useContext(AppContext)
}