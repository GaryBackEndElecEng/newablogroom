"use client";
import React from 'react'
import PrintResume from '@/components/printResume/printresume';
import Service from '@/components/common/services';
import { mainResumeRefType, mainResumeType } from '@/components/bio/resume/refTypes';
import ViewResume from '@/components/bio/resume/viewResume';
import Reference from '@/components/bio/resume/viewReference';
import DeleteClass from '@/components/bio/resume/deleteClass';
import Dataset from '@/components/common/dataset';
import ModSelector from '@/components/editor/modSelector';

export default function Index({ mainResume, mainResumeRef }: { mainResume: mainResumeType | null, mainResumeRef: mainResumeRefType | null }) {
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
                    if (mainResume || mainResumeRef) {
                        printResume.main({ injector, mainResume, mainResumeRef })
                    }
                }
            }
        }
    }, [mainResume, mainResumeRef,]);
    return (
        <div ref={currentRef} id="printpdf" />
    )
}
