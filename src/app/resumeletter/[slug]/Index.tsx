"use client";
import React from 'react'
import { mainIntroLetterType, mainResumeType } from '@/components/bio/resume/refTypes';
import LetterView from '@/components/bio/letter/letterView';
import ViewResume from '@/components/bio/resume/viewResume';
import DeleteClass from '@/components/bio/resume/deleteClass';
import Service from '@/components/common/services';
import Dataset from '@/components/common/dataset';
import ModSelector from '@/components/editor/modSelector';
import ViewReference from '@/components/bio/resume/viewReference';
import PrintResume from "@/components/printResume/printresume";

export default function Index({ mainLetter, mainResume }: { mainLetter: mainIntroLetterType | null, mainResume: mainResumeType | null }) {
    const countRef = React.useRef(0);
    const currentRef = React.useRef(null);

    React.useEffect(() => {
        if (currentRef.current && countRef.current === 0) {
            countRef.current++;
            if (typeof window !== "undefined") {
                const injector = document.getElementById("printpdf");
                if (injector && mainLetter) {
                    const dataset = new Dataset();
                    const modSelector = new ModSelector(dataset);
                    const service = new Service(modSelector);
                    const deleteClass = new DeleteClass(service, null);
                    const viewLetter = new LetterView();
                    const viewRef = new ViewReference(service, deleteClass, null);
                    const viewResume = new ViewResume(service, viewRef, deleteClass);
                    const printResume = new PrintResume(service, viewResume);
                    printResume.letterResumePrint({ parent: injector, mainResume, mainLetter });
                }
            }
        }
    }, [mainLetter, mainResume]);
    return (
        <div ref={currentRef} id="printpdf" />
    )
}
