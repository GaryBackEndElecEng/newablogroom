"use client";

import React from 'react'
import MainAdvertise from './mainAdvertise';

export default function Index() {
    const countRef = React.useRef(0);
    const currentRef = React.useRef(null);
    React.useEffect(() => {
        if (countRef.current === 0 && currentRef.current) {
            if (typeof window !== "undefined") {
                const injector = document.getElementById("injector-advertise") as HTMLElement;
                const advert = new MainAdvertise();
                advert.main({ parent: injector, count: countRef.current }).then(async (res) => {
                    if (res) {
                        countRef.current = res.count;
                    }
                });
            }
        }
    }, []);
    return (
        <div ref={currentRef} id="injector-advertise"></div>
    )
}
