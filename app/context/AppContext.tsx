/* eslint-disable @typescript-eslint/no-explicit-any */
import { useHandleLogout } from "@/hooks/useHandleLoggout";
import { verifyAuth } from "@/lib/utils/utils";
import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    isAuth: boolean;
    verifyUserAuth: () => void
}

const AppContext = createContext<AppContextProps>({
    isAuth: false,
    verifyUserAuth: null
})

export function AppProvider(props: any) {
    const [isAuth, setIsAuth] = useState(false)
    const loggout = useHandleLogout()

    async function verifyUserAuth() {
        const isAuth = await verifyAuth()

        if (!isAuth) {
            await loggout()
        }
        setIsAuth(isAuth)
    }

    useEffect(() => {
        (async () => verifyUserAuth())()
    },[verifyUserAuth])

    return (
        <AppContext.Provider value={{
            isAuth,
            verifyUserAuth
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;