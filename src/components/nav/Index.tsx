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
import Header from '../editor/header';
import BrowserType from '../common/browserType';


function Index() {
    const { data: session, status } = useSession()
    const navRef = React.useRef(null);
    React.useEffect(() => {
        let count = 0;
        if (typeof window !== "undefined" && navRef.current) {
            const inject = document.getElementById("headerInjector") as HTMLElement;
            const browserType = new BrowserType();
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const user = new User(modSelector, service);
            const chart = new ChartJS(modSelector, service, user);
            const feature = new Features();
            const regSignin = new RegSignIn(modSelector, service, user);
            const metaBlog = new MetaBlog(modSelector, service, user);
            const post = new Post(modSelector, service, user);
            const profile = new Profile(modSelector, service, user, metaBlog, chart, post);
            const navArrow = new NavArrow(user, regSignin, service, profile, modSelector, feature);
            const nav = new Nav(modSelector, service, user, regSignin);
            const mainHeader = new MainHeader(modSelector, service, user, nav, navArrow);
            const auth = new AuthService(modSelector, service, user, mainHeader, session);
            Header.cleanUp(inject);
            mainHeader.main({ parent: inject });
            //getting USER AFTER SIGNIN
            auth.getUser({ session: session, injector: inject }).then(async (res) => {
                if (res && count === 0) {
                    mainHeader.showRectDropDown({ parent: res.injector, user: res.user, count: count });
                    count++;
                }
            });
            const keyword = window.navigator.userAgent
            const retList = browserType.main({ parent: inject, navigator: keyword })
        }
    }, [session]);
    return (
        <div id="headerInjector" ref={navRef} className={styles.headerindex}></div>
    )
}

export default Index