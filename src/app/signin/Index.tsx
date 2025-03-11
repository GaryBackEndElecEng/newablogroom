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


export default function Index() {

    const readyRef = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (readyRef.current) {
            if (typeof window !== "undefined" && countRef.current === 0) {
                const dataset = new Dataset();
                const modSelector = new ModSelector(dataset);
                const service = new Service(modSelector);
                const auth = new AuthService(modSelector, service);
                const user = new User(modSelector, service, auth);
                const regSignIn = new RegSignIn(modSelector, service, user)
                const signin = new SigninClass(modSelector, service, user, regSignIn);
                const parent = document.querySelector("div#signin_page") as HTMLElement;
                Header.cleanUp(parent);
                if (parent) {
                    signin.main({ parent, count: countRef.current }).then(async (res) => {
                        if (res) {
                            countRef.current = res.count;

                        }
                    });
                }
            }
        }
    }, []);
    return (
        <div id="signin_page" ref={readyRef}></div>
    )
}
