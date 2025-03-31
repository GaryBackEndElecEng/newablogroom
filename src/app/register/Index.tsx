"use client";
import React from 'react';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import User from '@/components/user/userMain';
import Register from './register';
import Dataset from '@/components/common/dataset';
import styles from './register.module.css';
import { useEditor } from '@/components/context/editorContext';
import RegSignIn from '@/components/nav/regSignin';

export default function Index() {
    const readyRef = React.useRef(null);
    const countRef = React.useRef(0);
    const { user } = useEditor();
    React.useEffect(() => {
        if (readyRef.current && countRef.current === 0) {
            if (typeof window !== "undefined") {
                const parent = document.querySelector("div#register_page") as HTMLElement;
                if (parent) {
                    const dataset = new Dataset();
                    const modSelector = new ModSelector(dataset);
                    const service = new Service(modSelector);
                    const auth = new AuthService(modSelector, service);
                    auth.getSessionUser({ user }).then(async (res) => {
                        if (res) {
                            const regSignin = new RegSignIn(modSelector, service, res.user, res.status);
                            const register = new Register(modSelector, service, regSignin, res.user);
                            register.main({ parent, count: countRef.current }).then(async (res) => {
                                if (res) {
                                    countRef.current++;

                                };
                            });
                        }
                    });
                };
            };
        };

    }, [user]);

    return (
        <div id="register_page" className={styles.registerIndex} ref={readyRef}></div>
    )
}
