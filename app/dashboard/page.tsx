"use client"

import useAppData from "@/hooks/useAppData"
import { useRouter } from "next/navigation"

export default function Dashboard() {
    const { isAuth, verifyUserAuth } = useAppData()

    return (
        <>
            <p>Dashboard</p>
            {console.log(isAuth)}
        </>
    )
}