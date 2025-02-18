"use client"
import { useRouter } from "next/navigation";

export default function UseNavigation(path: string) {
    const router = useRouter()
    return router.push(path)
}