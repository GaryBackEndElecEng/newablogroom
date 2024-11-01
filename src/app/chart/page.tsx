import React from 'react';
import Index from "../../components/chart/Index";
import style from "@/components/chart/chart.module.css";


export default function page() {
    return (
        <div className={style.chartpage}>
            <Index />
        </div>
    )
}
