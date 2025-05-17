"use client";
import React from 'react'
import PrintResume from './printresume';
import Service from '@/components/common/services';
import { mainIntroLetterType, mainResumeRefType, mainResumeType } from '@/components/bio/resume/refTypes';
import ViewResume from '@/components/bio/resume/viewResume';
import Reference from '@/components/bio/resume/viewReference';
import LetterView from '@/components/bio/letter/letterView';
import DeleteClass from '@/components/bio/resume/deleteClass';
import Dataset from '@/components/common/dataset';
import ModSelector from '@/components/editor/modSelector';

export default function Index({ mainResume, mainResumeRef, mainLetter }: { mainResume: mainResumeType | null, mainResumeRef: mainResumeRefType | null, mainLetter: mainIntroLetterType | null }) {
    const countRef = React.useRef(0);
    const currentRef = React.useRef(null);

    React.useEffect(() => {
        if (currentRef.current && countRef.current === 0) {
            if (typeof window !== "undefined") {
                const injector = document.getElementById("printpdf");
                if (injector) {
                    const dataset = new Dataset()
                    const modSelector = new ModSelector(dataset);
                    const service = new Service(modSelector);
                    const delClass = new DeleteClass(service, null);
                    const resumeRef = new Reference(service, delClass, null);
                    const viewResume = new ViewResume(service, resumeRef, delClass)
                    const printResume = new PrintResume(service, viewResume);
                    const viewLetter = new LetterView();
                    if (mainResume || mainResumeRef) {
                        printResume.main({ injector, mainResume, mainResumeRef })
                    } else if (mainLetter) {
                        viewLetter.showLetter({ parent: injector, mainletter: mainLetter, showToPrint: true, french: false });
                    }
                }
            }
        }
    }, [mainResume, mainResumeRef, mainLetter]);
    return (
        <div ref={currentRef} id="printpdf" />
    )
}
