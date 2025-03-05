"use client"

import useAppData from "@/hooks/useAppData";
import { RestClient } from "@/lib/RestClient/RestClient";
import { validateEmail } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAuth() {
    const router = useRouter()
    const restClient = new RestClient()
    const { setUser } = useAppData()
    const [loading, setLoading] = useState(false)
    const [loginPayload, setLoginPayload] = useState({
        username: "",
        password: ""
    })

    function enableLogin(): boolean {
        return loginPayload.password.length >= 6 && validateEmail(loginPayload.username);
    }

    function cleanAllFields() {
        setLoginPayload({
            username: "",
            password: "",
        });
    }

    function handleLogin() {
        if (!enableLogin()) {
            return;
        }

        setLoading(true);

        restClient.handleLogin(loginPayload.username, loginPayload.password)
            .then(res => {
                setUser({
                    contaTipo: res.contaTipo,
                    id: res.id,
                    nome: res.nome,
                    urlFoto: res.urlFoto
                })
                saveUser({
                    contaTipo: res.contaTipo,
                    id: res.id,
                    nome: res.nome,
                    urlFoto: res.urlFoto
                })
                saveTokenAndExpiration(res.token)
                router.push("/dashboard")
            })
            .catch((error) => {
                setLoading(false);
                cleanAllFields();
            })
            .finally(() => setLoading(false))
    }

    function saveUser(user: any) {
        localStorage.setItem("user", JSON.stringify(user))
    }

    function saveTokenAndExpiration(token: string) {
        const expiration = new Date()
        expiration.setMinutes(expiration.getMinutes() + 15)

        localStorage.setItem("token", token)
        localStorage.setItem("expiration", expiration.toISOString())
    }


    return {
        loading,
        loginPayload,
        handleLogin,
        setLoginPayload
    }
}