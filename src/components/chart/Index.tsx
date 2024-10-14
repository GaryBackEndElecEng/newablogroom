"use client";

import React from 'react'
import ChartJS from "@/components/chart/chartJS";
import ModSelector from '@/components/editor/modSelector';
import Service from '@/components/common/services';
import AuthService from '@/components/common/auth';
import User from '@/components/user/userMain';
import Header from '../editor/header';
import Climate from './climate';
export default function Index() {
    let count = 0;
    const refChart = React.useRef(null);
    React.useMemo(async () => {

        awaitWindow().then(async (res) => {
            const isWindow = res.window() ? true : false;
            if (isWindow) {
                const climate = new Climate();
                const modSelector = new ModSelector();
                const auth = new AuthService(modSelector);
                const service = new Service(modSelector, auth);
                const user = new User(modSelector, service, auth);
                const chart = new ChartJS(modSelector, service, user);
                const docChart = document.getElementById("chart") as HTMLElement;
                Header.cleanUp(docChart);
                // console.log(docChart)//works
                if (count === 0) {
                    setTimeout(async () => {
                        const blog = modSelector.blog;
                        await chart.mainChart(docChart, blog);
                        climate.generateGraph({ parent: docChart })
                    }, 0)
                    count++;
                }
            }

        });

    }, [count]);
    return (
        <div className="container-fluid mx-auto">
            <h5 className="mx-auto lean display-5 text-light text-center"> Graphs for you</h5>
            <h6 className="mx-auto px-1 text-center text-light lean display-6 my-6"> Create your own graph</h6>
            <p className="mx-auto px-1 text-center text-light lean my-2">Graph demonstration for you</p>
            <p className="mx-auto px-1 text-center text-light lean my-2">,,,further reading below:</p>

            <div id="chart" ref={refChart} ></div>
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
