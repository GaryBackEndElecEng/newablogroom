"use client";
import React from 'react'
import Resume from './resume';
import Service from '@/components/common/services';
import ViewReference from './viewReference';
import ViewResume from './viewResume';
import CreateResume from './createResume';
import AddRemove from './addRemove';
import FormComponents from './formComponents';
import CreateRef from './createRef';
import LetterEditor from '../letter/letterEditor';
import FormLetComponents from '../letter/formLetComponents';
import AddRemoveLet from '../letter/addRemoveLet';
import ModuleConnect from './moduleConnect';
import HeaderEffect from './headerEffect';
import Topbar from './topbar';
import EditReference from './editReference';
import EditResume from './editResume';
import PageHistory from '@/components/common/pageHistory';
import { userType } from './refTypes';
import DeleteClass from './deleteClass';
import LetterView from '../letter/letterView';
import MainAdvertise from '../advertisment/mainAdvertise';
import ModSelector from '@/components/editor/modSelector';
import Dataset from '@/components/common/dataset';




export default function Index({ user }: { user: userType | null }) {
    const resumeRef = React.useRef(null);
    const countRef = React.useRef(0);

    React.useEffect(() => {
        if (resumeRef.current && countRef.current === 0) {
            if (typeof window !== "undefined") {
                const injector = document.getElementById("resume");
                if (injector) {
                    const dataset = new Dataset();
                    const modSelector = new ModSelector(dataset)
                    const service = new Service(modSelector);
                    const advertise = new MainAdvertise();
                    const pageTracker = new PageHistory();
                    const addRemove = new AddRemove();
                    const addLetRemove = new AddRemoveLet(user);
                    const letterView = new LetterView();
                    const deleteClass = new DeleteClass(service, user);
                    const moduleConnect = new ModuleConnect(service, user)
                    const formComp = new FormComponents(addRemove);
                    const formLetComp = new FormLetComponents(addLetRemove);
                    const viewRef = new ViewReference(service, deleteClass);
                    const editRef = new EditReference(service, formComp, user, viewRef);
                    const createRef = new CreateRef(service, formComp, viewRef, user);
                    const viewResume = new ViewResume(service, viewRef, deleteClass);
                    const letterEditor = new LetterEditor(service, formLetComp, user, deleteClass, letterView)
                    const createResume = new CreateResume(service, viewResume, formComp, user);
                    const editResume = new EditResume(service, viewResume, addRemove, formComp, user)
                    const topbar = new Topbar(service, user, viewRef, viewResume, createResume, createRef, letterEditor, moduleConnect, editRef, editResume, letterView)
                    const headerEffect = new HeaderEffect(topbar, pageTracker, user, advertise);
                    const newResume = new Resume(injector, service, headerEffect, viewRef, viewResume, createResume);
                    newResume.main({ parent: injector });
                }


            }

        }


    }, [user]);
    return (
        <div ref={resumeRef} id="resume"></div>
    )
}
