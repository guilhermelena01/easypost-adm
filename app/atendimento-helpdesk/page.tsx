"use client"

import { montserrat } from "@/lib/utils/utils";
import { useState } from "react";

export default function Helpdesk() {

    return (
        <section className="w-full h-dvh flex flex-col gap-8 py-8 pr-8">
            <h1 className={`text-2xl font-bold ${montserrat.className}`}>Atendimento helpdesk</h1>
            
        </section>
    )
}