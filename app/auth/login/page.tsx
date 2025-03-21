"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { montserrat, poppins } from "@/lib/utils/utils";
import { Eye, EyeClosed, LoaderCircle } from "lucide-react";
import Image from "next/image";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function LoginPage() {
    const { handleLogin, loading, loginPayload, setLoginPayload } = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <main className="flex h-svh w-full">
                <section className="md:w-3/5 flex items-center justify-center">
                    <div className="flex flex-col md:w-1/2 md:gap-12">
                        <span>
                            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Bem vindo de volta. Faça seu login agora.</h1>
                        </span>
                        <span className="gap-4 flex flex-col">
                            <span>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Digite seu email de cadastro"
                                    autoComplete="email"
                                    value={loginPayload.username}
                                    onChange={(e) => setLoginPayload({ ...loginPayload, username: e.target.value })}
                                />
                            </span>
                            <span className="relative">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="current-password"
                                    placeholder="Digite sua senha"
                                    value={loginPayload.password}
                                    onChange={(e) => setLoginPayload({ ...loginPayload, password: e.target.value })}
                                />
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-8">
                                    <Eye className={`${showPassword ? "block" : "hidden"}`} width={18} />
                                    <EyeClosed className={`${showPassword ? "hidden" : "block"}`} width={18} />
                                </button>
                            </span>
                            <div className="w-full flex justify-between">
                                <span className="gap-1 items-center flex">
                                    <Checkbox />
                                    <Label>Lembrar de mim</Label>
                                </span>
                                {/* <p className="text-blue-500 cursor-pointer hover:opacity-80">Esqueceu da senha?</p> */}
                            </div>
                        </span>
                        <span className="w-full flex flex-col gap-2">
                            <Button type="submit" onClick={handleLogin} className={`font-bold w-full ${poppins.className}`}>{loading ? <span className="animate-spin"><LoaderCircle /></span> : "Entrar"}</Button>
                            <h3>Não tem uma conta? <strong className="cursor-pointer">Registre-se.</strong></h3>
                        </span>
                    </div>
                </section>
                <section className="md:w-2/5 bg-black border border-gray-800 bg-gradient-to-b rounded-l-md shadow-lg flex justify-center items-center">
                    <Image className="w-1/3" alt="logo easypost" src={"https://res.cloudinary.com/dbyqw2jjq/image/upload/v1739504039/admin_2_rzjb7i.png"} width={780} height={240} />
                </section>
            </main>
        </>
    )
}