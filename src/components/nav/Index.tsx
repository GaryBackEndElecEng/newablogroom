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
// import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import styles from "@/components/nav/nav.module.css";
import Header from '../editor/header';
import BrowserType from '../common/browserType';
import MainFooter from '../footer/mainFooter';
import Dataflow from '../common/dataflow';
import AllMsgs from '../home/allMsgs';
import Message from '../common/message';


function Index({ _user_ }: { _user_: userType | null }) {
    const { data: session, status } = useSession()
    const sessionGroup = { session: session, status };
    const navRef = React.useRef(null);
    React.useEffect(() => {
        let count = 0;
        if (typeof window !== "undefined" && navRef.current) {
            const inject = document.getElementById("headerInjector") as HTMLElement;
            const browserType = new BrowserType();
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const message = new Message(modSelector, service, modSelector.blog);
            const allMsgs = new AllMsgs(modSelector, service, message)
            const dataflow = new Dataflow(service);
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
            const mainFooter = new MainFooter(modSelector, service, user, nav, navArrow, dataflow, feature, allMsgs);
            const sess_ = null
            const stat = (_user_ && _user_.id) ? "authenticated" : "unauthenticated";
            const auth = new AuthService(modSelector, service, user, mainHeader, mainFooter, sess_, stat);
            Header.cleanUp(inject);
            mainHeader.main({ parent: inject });
            //getting USER AFTER SIGNIN
            auth.getUser({ session: null, injector: inject, count, user: _user_ }).then(async (res) => {
                if (res.count) {
                    count = res.count;
                } else {
                    count = 1;
                }
            });
            const keyword = window.navigator.userAgent
            //browserType sends message of browser incompatibility if issues
            const retList = browserType.main({ parent: inject, navigator: keyword })
        }
    }, [_user_]);
    return (
        <div id="headerInjector" ref={navRef} className={styles.headerindex}></div>
    )
}

export default Index