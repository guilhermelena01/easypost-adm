"use client"

import { useRouter } from "next/navigation"

export default function Dashboard() {
    const router = useRouter()

    const token = localStorage.getItem("token")

    function handleShowToken() {
        console.log(token)
    }
    return (
        <>
            {console.log(token)}
            <p>Dashboard</p>
            <button onClick={handleShowToken}>Mostrar token</button>
        </>
    )
}