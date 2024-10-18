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


function Index({ user_ }: { user_: userType | undefined }) {
    const navRef = React.useRef(null);
    React.useEffect(() => {
        const inject = document.getElementById("headerInjector");
        if (inject && navRef.current) {
            const modSelector = new ModSelector();
            const auth = new AuthService(modSelector);
            const service = new Service(modSelector, auth);
            const user = new User(modSelector, service, auth);
            const chart = new ChartJS(modSelector, service, user);
            const feature = new Features();
            const regSignin = new RegSignIn(modSelector, service, user);
            const metaBlog = new MetaBlog(modSelector, service, user);
            const post = new Post(modSelector, service, user);
            const profile = new Profile(modSelector, service, auth, user, metaBlog, chart, post);
            const navArrow = new NavArrow(user, regSignin, service, profile, modSelector, feature);
            const nav = new Nav(modSelector, auth, service, user, regSignin);
            if (user_) {
                user.user = user_;
                auth.user = user_;
            }
            const mainHeader = new MainHeader(modSelector, auth, service, user, nav, regSignin, profile, navArrow);
            //REMOVE NAVARROW FROM HEADER AFTER WORKING ON NAV!!!!
            mainHeader.main(inject as HTMLElement)
        }
    }, [user_]);
    return (
        <div id="headerInjector" ref={navRef}></div>
    )
}

export default Index