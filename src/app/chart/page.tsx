import React from 'react';
import Index from "../../components/chart/Index";
import type { Metadata } from "next";
import Meta from "@/components/meta/meta";
export const metadata: Metadata = Meta.metaChart();

export default function page() {
    return (
        <div className="container mx-auto my-3">
            <Index />
        </div>
    )
}
