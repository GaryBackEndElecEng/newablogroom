"use client";
import React from 'react';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import User from '@/components/user/userMain';
import SigninClass from './signinClass';
import Header from '@/components/editor/header';


export default function Index() {
    let count = 0;
    const readyRef = React.useRef(null);
    React.useEffect(() => {
        if (readyRef.current && count === 0) {
            if (typeof window !== "undefined") {
                const modSelector = new ModSelector();
                const service = new Service(modSelector);
                const user = new User(modSelector, service);
                // const auth = new AuthService(modSelector,service,user);
                const signin = new SigninClass(modSelector, service, user);
                const parent = document.querySelector("div#signin_page") as HTMLElement;
                Header.cleanUp(parent);
                if (parent && count === 0) {
                    signin.main(parent).then(async (parent_: HTMLElement) => {
                        if (parent_) {
                            count++;

                        }
                    });
                }
            }
        }
    }, [count]);
    return (
        <div id="signin_page" ref={readyRef}></div>
    )
}
