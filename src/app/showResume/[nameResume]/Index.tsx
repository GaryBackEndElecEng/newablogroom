"use client";
import LetterView from '@/components/bio/letter/letterView';
import Reference from '@/components/bio/resume/viewReference';
import { mainIntroLetterType, mainResumeRefType, mainResumeType } from '@/components/bio/resume/refTypes'
import ViewResume from '@/components/bio/resume/viewResume';
import Service from '@/components/common/services';
import React from 'react'
import CombineView from './combineView';
import styles from "./combine.module.css";
import DeleteClass from '@/components/bio/resume/deleteClass';
import Dataset from '@/components/common/dataset';
import ModSelector from '@/components/editor/modSelector';

export default function Index({ mainResume, mainRefs, mainLetters }: { mainResume: mainResumeType | null, mainRefs: mainResumeRefType[] | null, mainLetters: mainIntroLetterType[] | null }) {
    const countRef = React.useRef(0);
    const currentRef = React.useRef(null);

    React.useEffect(() => {
        if (countRef.current === 0 && currentRef.current) {
            if (typeof window !== "undefined") {
                const injector = document.getElementById("injector-combined") as HTMLElement | null;
                if (injector) {
                    const dataset = new Dataset();
                    const modselector = new ModSelector(dataset);
                    const service = new Service(modselector);
                    const delClass = new DeleteClass(service, null);
                    const resumeRef = new Reference(service, delClass);
                    const letterView = new LetterView()
                    const viewResume = new ViewResume(service, resumeRef, delClass);
                    const combineView = new CombineView(service, letterView, viewResume, resumeRef);
                    combineView.main({ injector, mainResume, mainRefs, mainLetters })
                }
            }
        };

    }, [mainResume, mainRefs, mainLetters]);
    return (
        <div ref={currentRef} id="injector-combined" className={styles.resumeInjector} />
    )
}
