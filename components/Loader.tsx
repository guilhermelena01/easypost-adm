"use client"

import { Loader } from "lucide-react";

export default function LoaderComponent() {
    return (
        <div className="w-full fixed inset-0 flex justify-center items-center">
            <Loader className="animate-spin" />
        </div>
    )
}