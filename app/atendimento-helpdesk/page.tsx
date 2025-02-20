"use client"

import { Input } from "@/components/ui/input";
import { montserrat } from "@/lib/utils/utils";
import { useState } from "react";

export default function Helpdesk() {

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Atendimento helpdesk</h1>
            <div className="w-full rounded-lg border h-dvh">
                <div className="w-1/3 border-r h-full p-8 bg-secondary">
                    <Input
                        placeholder="Busque por um chat..."
                        className="bg-white"
                    />
                </div>
                <div className="w-2/3">
                </div>
            </div>
        </section>
    )
}