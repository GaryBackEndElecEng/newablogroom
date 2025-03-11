"use client";

import React from 'react'
import ChartJS from "@/components/chart/chartJS";
import ModSelector from '@/components/editor/modSelector';
import Service from '@/components/common/services';
import User from '@/components/user/userMain';
import Header from '../editor/header';
import Climate from './climate';
import style from "./chart.module.css";
import Dataset from '../common/dataset';
import AuthService from '../common/auth';
import Message from '../common/message';


export default function Index() {
    const refChart = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {

        if (typeof window !== "undefined" && refChart.current && countRef.current === 0) {
            const docChart = document.getElementById("chart") as HTMLElement;
            Header.cleanUp(docChart);
            const climate = new Climate();
            const dataset = new Dataset();
            const idValues = dataset.idValues;
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            auth.generateUser().then(async (res) => {
                if (res) {
                    const _user = res.user
                    const user = new User(modSelector, service, auth);
                    user.user = _user;
                    modSelector.asyncBlogInitializer({ user: _user }).then(async (res) => {
                        if (res) {
                            const message = new Message(modSelector, service, res, null);
                            const chart = new ChartJS(modSelector, service, user, message);
                            countRef.current = 2;

                            chart.mainChart({ injector: docChart, blog: res, idValues }).then((inject) => {
                                if (inject) {
                                    climate.generateGraph({ parent: inject })
                                }



                            });
                        }
                    });
                }
            });



        }

    }, [refChart, countRef]);
    return (

        <div id="chart" ref={refChart} className={style.chart} ></div>

    )
}

export async function awaitWindow() {
    "use client"
    return Promise.resolve({
        window: () => {
            if (typeof window !== "undefined") {
                return true;
            }
        }
    }) as Promise<{ window: () => boolean | undefined }>;
}
