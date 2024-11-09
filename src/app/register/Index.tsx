"use client";
import React from 'react';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import User from '@/components/user/userMain';
import Register from './register';

export default function Index() {
    const readyRef = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (readyRef.current && countRef.current === 0) {
            if (typeof window !== "undefined") {
                const parent = document.querySelector("div#register_page") as HTMLElement;

                if (parent) {
                    const modSelector = new ModSelector();
                    const service = new Service(modSelector);
                    const user = new User(modSelector, service);
                    // const auth = new AuthService(modSelector, service, user);
                    const error_ = new Register(modSelector, service, user);
                    error_.main({ parent, count: countRef.current }).then(async (res) => {
                        if (res) {
                            countRef.current++;

                        }
                    });
                }
            }
        }
    }, []);
    return (
        <div id="register_page" className="mx-auto" ref={readyRef}></div>
    )
}
