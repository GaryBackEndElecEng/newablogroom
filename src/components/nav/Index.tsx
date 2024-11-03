"use client";
import React from 'react';
import MainHeader from "@/components/nav/mainHeader"
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import User from '../user/userMain';
import Profile from '../editor/profile';
import { userType } from '../editor/Types';
import RegSignIn from './regSignin';
import Nav from './headerNav';
import NavArrow from './arrow';
import MetaBlog from '../editor/metaBlog';
import Features from '../home/feature';
import ChartJS from '../chart/chartJS';
import Post from '../posts/post';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import styles from "@/components/nav/nav.module.css";
import Misc from '../common/misc';


function Index() {
    const { data: session, status } = useSession()
    const navRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && navRef.current) {
            const inject = document.getElementById("headerInjector") as HTMLElement;
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const user = new User(modSelector, service);
            const auth = new AuthService(modSelector, service, user);
            const chart = new ChartJS(modSelector, service, user);
            const feature = new Features();
            const regSignin = new RegSignIn(modSelector, service, user);
            const metaBlog = new MetaBlog(modSelector, service, user);
            const post = new Post(modSelector, service, user);
            const profile = new Profile(modSelector, service, auth, user, metaBlog, chart, post);
            const navArrow = new NavArrow(user, regSignin, service, profile, modSelector, feature);
            const nav = new Nav(modSelector, auth, service, user, regSignin);
            if (session) {
                const confirmed = auth.getUser({ session: session });
                if (!confirmed) {
                    Misc.message({ parent: inject, type_: "error", msg: "no user", time: 800 });
                }
            }
            const mainHeader = new MainHeader(modSelector, auth, service, user, nav, regSignin, profile, navArrow);
            mainHeader.main(inject as HTMLElement)
            // const testHeader = new TestHeader();
            // testHeader.main({ parent: inject, session: session });
        }
    }, [session]);
    return (
        <div id="headerInjector" ref={navRef} className={styles.headerindex}></div>
    )
}

export default Index