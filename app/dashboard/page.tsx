/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import useAppData from "@/hooks/useAppData"

export default function Dashboard() {
    const { isAuth, verifyUserAuth } = useAppData()

    return (
        <>
            <p>Dashboard</p>
        </>
    )
}