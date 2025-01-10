"use client";

import React from 'react'
import ChartJS from "@/components/chart/chartJS";
import ModSelector from '@/components/editor/modSelector';
import Service from '@/components/common/services';
import User from '@/components/user/userMain';
import Header from '../editor/header';
import Climate from './climate';
import style from "./chart.module.css";
import { useSession } from 'next-auth/react';


export default function Index() {
    const { data: session, status } = useSession();
    const refChart = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {

        if (typeof window !== "undefined" && refChart.current && countRef.current === 0) {
            const docChart = document.getElementById("chart") as HTMLElement;
            Header.cleanUp(docChart);
            const climate = new Climate();
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const user = new User(modSelector, service);
            const chart = new ChartJS(modSelector, service, user);
            const blog = modSelector.blog;

            chart.mainChart(docChart, blog).then(() => {
                countRef.current = 2;
                // Header.cleanUp(docChart);// cleans up:works
                // chart.cleanUpKeepOne({ parent: docChart, class_: "mainBarChart-divCont" });//doesnt work
            });

            setTimeout(async () => {
                climate.generateGraph({ parent: docChart })
            }, 0)

        }

    }, [refChart, countRef]);
    return (

        <div id="chart" ref={refChart} className={style.chart} ></div>

    )
}

export async function awaitWindow() {
    "use client"
    return new Promise((resolver,) => {
        resolver({
            window: () => {
                if (typeof window !== "undefined") {
                    return true;
                }
            }
        })
    }) as Promise<{ window: () => boolean | undefined }>;
}
