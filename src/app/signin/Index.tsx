"use client";
import React from 'react';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import User from '@/components/user/userMain';
import SigninClass from './signinClass';
import Header from '@/components/editor/header';
import Dataset from '@/components/common/dataset';
import RegSignIn from '@/components/nav/regSignin';
import { useEditor } from '@/components/context/editorContext';
import styles from "./signin.module.css";


export default function Index() {
    const { user } = useEditor()
    const readyRef = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (readyRef.current) {
            if (typeof window !== "undefined" && countRef.current === 0) {
                const parent = document.querySelector("div#signin_page") as HTMLElement;
                const dataset = new Dataset();
                const modSelector = new ModSelector(dataset);
                const service = new Service(modSelector);
                const auth = new AuthService(modSelector, service);
                auth.getUser({ user, count: countRef.current }).then(async (res) => {
                    const regSignIn = new RegSignIn(modSelector, service, res.user, res.status)
                    const _user = new User(modSelector, service, res.status, regSignIn, res.user);
                    const signin = new SigninClass(modSelector, service, _user, regSignIn);
                    Header.cleanUp(parent);
                    if (parent) {
                        signin.main({ parent, count: countRef.current }).then(async (res) => {
                            if (res) {
                                countRef.current = res.count;

                            }
                        });
                    };

                });
            }
        }
    }, [user]);
    return (
        <div id="signin_page" ref={readyRef} className={styles.indexPage}></div>
    )
}
