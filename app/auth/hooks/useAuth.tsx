import UseNavigation from "@/hooks/useNavigation";
import { RestClient } from "@/lib/RestClient/RestClient";
import { validateEmail } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAuth() {
    const router = useRouter()
    const restClient = new RestClient()
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
                console.log(res)
                if (res) {
                    throw Error(res.message);
                }

                setLoading(false);

                router.push("/")
            })
            .catch(() => {
                setLoading(false);
                cleanAllFields();
            });
    }

    return {
        loading,
        loginPayload,
        handleLogin,
        setLoginPayload
    }
}