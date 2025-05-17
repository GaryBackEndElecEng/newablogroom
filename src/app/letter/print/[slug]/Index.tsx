"use client";
import React from 'react'
import { mainIntroLetterType } from '@/components/bio/resume/refTypes';
import LetterView from '@/components/bio/letter/letterView';


export default function Index({ mainLetter }: { mainLetter: mainIntroLetterType | null }) {
    const countRef = React.useRef(0);
    const currentRef = React.useRef(null);

    React.useEffect(() => {
        if (currentRef.current && countRef.current === 0) {
            if (typeof window !== "undefined") {
                const injector = document.getElementById("printpdf");
                if (injector && mainLetter) {
                    const viewLetter = new LetterView();
                    viewLetter.showLetter({ parent: injector, mainletter: mainLetter, showToPrint: true, french: false });
                }
            }
        }
    }, [mainLetter]);
    return (
        <div ref={currentRef} id="printpdf" />
    )
}
