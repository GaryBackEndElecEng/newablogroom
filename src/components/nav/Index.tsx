"use client";
import React from 'react';
import MainHeader from "@/components/nav/mainHeader"
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import User from '../user/userMain';
import Profile from '../profile/profile';
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
import Headerflag from '../editor/headerflag';


function Index({ _user_ }: { _user_: userType | null }) {
    const countRef = React.useRef(0);
    const navRef = React.useRef(null);
    React.useEffect(() => {

        if (countRef && countRef.current > 0 && !(navRef && navRef.current)) return
        if (typeof window !== "undefined") {
            const inject = document.getElementById("headerInjector") as HTMLElement;
            const browserType = new BrowserType();
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const message = new Message(modSelector, service, modSelector.blog, null);
            const allMsgs = new AllMsgs(modSelector, service, message)
            const dataflow = new Dataflow(service);
            const user = new User(modSelector, service);
            const chart = new ChartJS(modSelector, service, user);
            const feature = new Features();
            const regSignin = new RegSignIn(modSelector, service, user);
            const metaBlog = new MetaBlog(modSelector, service, user);
            const post = new Post(modSelector, service, user);
            const headerFlag = new Headerflag(modSelector, service, user);
            const profile = new Profile(modSelector, service, user, metaBlog, chart, post, headerFlag);
            const navArrow = new NavArrow(user, regSignin, service, profile, modSelector, feature);
            const nav = new Nav(modSelector, service, user);
            const mainFooter = new MainFooter(modSelector, service, user, nav, navArrow, dataflow, feature, allMsgs);
            const mainHeader = new MainHeader(modSelector, service, navArrow);
            const auth = new AuthService(modSelector, service, user, mainHeader, mainFooter);
            Header.cleanUp(inject);
            mainHeader.main({ parent: inject });
            //getting USER AFTER SIGNIN
            auth.getUser({ injector: inject, count: countRef.current, user: _user_ }).then(async (res) => {
                if (res) {
                    countRef.current++;
                }
            });
            const keyword = window.navigator.userAgent
            //browserType sends message of browser incompatibility if issues
            const retList = browserType.main({ parent: inject, navigator: keyword })
        }
    }, [_user_, navRef, countRef]);
    return (
        <div id="headerInjector" ref={navRef} className={styles.headerindex}></div>
    )
}

export default Index