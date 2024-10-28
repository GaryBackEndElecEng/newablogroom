"use client";
import React from 'react';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import User from '@/components/user/userMain';
import Register from './register';

export default function Index() {
    let count = 0;
    const readyRef = React.useRef(null);
    React.useEffect(() => {
        if (readyRef.current && count === 0) {
            if (typeof window !== "undefined") {
                const parent = document.querySelector("div#register_page") as HTMLElement;

                if (parent) {
                    const modSelector = new ModSelector();
                    const service = new Service(modSelector);
                    const user = new User(modSelector, service);
                    // const auth = new AuthService(modSelector, service, user);
                    const error_ = new Register(modSelector, service, user);
                    error_.main(parent)
                    count++;
                }
            }
        }
    }, [count]);
    return (
        <div id="register_page" className="mx-auto" ref={readyRef}></div>
    )
}
