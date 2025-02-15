"use client";
import React from 'react'
import Home from "@/components/home/home";
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import User from '../user/userMain';
import Nav from '../nav/headerNav';
import RegSignIn from '../nav/regSignin';
import AllMsgs from './allMsgs';
import Message from '../common/message';
// import MetaBlog from '../editor/metaBlog';
import Features from './feature';
import Blogs from '../blogs/blogsInjection';
import styles from "./home.module.css";
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';


export default function Index() {
    const refCheck = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (typeof window !== "undefined" && refCheck.current && countRef.current === 0) {
            const home = document.querySelector("section#home-index");
            const modSelector = new ModSelector();
            // const features = new Features();
            const service = new Service(modSelector);
            const blogs = new Blogs(modSelector, service);
            const user = new User(modSelector, service,);
            const regSignin = new RegSignIn(modSelector, service, user);
            const feature = new Features();
            const nav = new Nav(modSelector, service, user);
            const message = new Message(modSelector, service, modSelector.blog, null)
            const allmsgs = new AllMsgs(modSelector, service, message);
            const _home = new Home(modSelector, service, nav, allmsgs, feature, blogs);
            _home.main(home as HTMLElement);
            countRef.current++;
        }

    }, [refCheck, countRef]);
    return (
        <div className={styles.homeIndexContainer}>
            <section ref={refCheck} id="home-index" className={styles.homeIndex}></section>
        </div>
    )
}
