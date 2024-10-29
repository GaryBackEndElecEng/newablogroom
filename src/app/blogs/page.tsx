"use server"
import React from 'react';
import type { Metadata, ResolvingMetadata } from "next";
import Index from "@/components/blogs/Index";



export default async function Page() {
    return (
        <div className="isLocal" style={{ minHeight: "110vh", width: "100%" }}>
            <Index />

        </div>
    )
}





