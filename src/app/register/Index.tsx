"use client";
import React from 'react';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import User from '@/components/user/userMain';
import Register from './register';

export default function Index() {

    const readyRef = React.useRef(null);
    React.useEffect(() => {
        if (readyRef.current) {
            if (typeof window !== "undefined") {
                const parent = document.querySelector("div#register_page") as HTMLElement;

                if (parent) {
                    const modSelector = new ModSelector();
                    const auth = new AuthService(modSelector);
                    const service = new Service(modSelector, auth);
                    const user = new User(modSelector, service, auth);
                    const error_ = new Register(modSelector, service, user);
                    error_.main(parent)
                }
            }
        }
    }, []);
    return (
        <div id="register_page" className="mx-auto" ref={readyRef}></div>
    )
}
