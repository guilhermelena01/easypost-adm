/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";

enum EnumContaTipo {
    FORNECEDOR = "FORNECEDOR",
    CLIENTE = "CLIENTE"
}

type UserType = {
    "id": number,
    "nome": string,
    "urlFoto": string,
    "contaTipo": EnumContaTipo,
}

interface AppContextProps {
    user: UserType;
    setUser: (user: UserType) => void;
}

const AppContext = createContext<AppContextProps>({
    user: {
        contaTipo: EnumContaTipo.FORNECEDOR,
        id: 0,
        nome: "",
        urlFoto: ""
    },
    setUser: null
})

export function AppProvider(props: any) {
    const [user, setUser] = useState<UserType>({
        contaTipo: EnumContaTipo.FORNECEDOR,
        id: 0,
        nome: "",
        urlFoto: ""
    })

    return (
        <AppContext.Provider value={{
            user,
            setUser
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext;