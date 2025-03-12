"use client";
import React from 'react'
import Home from "@/components/home/home";
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import User from '../user/userMain';
import Nav from '../nav/headerNav';
import AllMsgs from './allMsgs';
import Message from '../common/message';
import Features from './feature';
import Blogs from '../blogs/blogsInjection';
import styles from "./home.module.css";
import Dataset from '../common/dataset';


export default function Index() {
    const refCheck = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (typeof window !== "undefined" && refCheck.current && countRef.current === 0) {
            const dataset = new Dataset()
            const modSelector = new ModSelector(dataset);
            const home = document.querySelector("section#home-index");
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            auth.confirmUser({ user: null, count: countRef.current }).then(async (res) => {
                if (res) {
                    const blogs = new Blogs(modSelector, service);
                    const feature = new Features();
                    const message = new Message(modSelector, service, modSelector.blog, null)
                    const allmsgs = new AllMsgs(modSelector, service, message);
                    const _home = new Home(modSelector, service, auth, allmsgs, feature, blogs);
                    _home.main(home as HTMLElement);
                    countRef.current = res.count;
                }
            });


        }

    }, [refCheck, countRef]);
    return (
        <div className={styles.homeIndexContainer}>
            <section ref={refCheck} id="home-index" className={styles.homeIndex}></section>
        </div>
    )
}
