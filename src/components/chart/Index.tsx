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
            const climate = new Climate();
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const user = new User(modSelector, service);
            const chart = new ChartJS(modSelector, service, user);
            const docChart = document.getElementById("chart") as HTMLElement;

            Header.cleanUp(docChart);
            // console.log(docChart)//works
            setTimeout(async () => {
                const blog = modSelector.blog;
                await chart.mainChart(docChart, blog).then(() => {
                    countRef.current++;
                });
                climate.generateGraph({ parent: docChart })
            }, 0)

        }

    }, [refChart, countRef]);
    return (
        <div className={style.chartindexcontainer}>
            <h5 className="mx-auto lean display-5 text-light text-center"> Graphs for you</h5>
            <h6 className="mx-auto px-1 text-center text-light lean display-6 my-6"> Create your own graph</h6>
            <p className="mx-auto px-1 text-center text-light lean my-2">Graph demonstration for you</p>
            <p className="mx-auto px-1 text-center text-light lean my-2">,,,further reading below:</p>

            <div id="chart" ref={refChart} className={style.chart} ></div>
        </div>
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
