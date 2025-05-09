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
import NavArrow from './arrow';
import MetaBlog from '../editor/metaBlog';
import Features from '../home/feature';
import ChartJS from '../chart/chartJS';
import Post from '../posts/post';
import styles from "@/components/nav/nav.module.css";
import Header from '../editor/header';
import BrowserType from '../common/browserType';
import Headerflag from '../editor/headerflag';
import Dataset from '../common/dataset';
import Design from '../common/design';
import Ven from '../common/venDiagram';
import Reference from '../editor/reference';
import PasteCode from '../common/pasteCode';
import ShapeOutside from '../editor/shapeOutside';
import HtmlElement from '../editor/htmlElement';
import CommonUser from '../common/commonInfo';
import SignInAndUp from './signinAndUp';
import Message from '../common/message';
import { useEditor } from '../context/editorContext';


function Index({ _user_ }: { _user_: userType | null }) {
    const countRef = React.useRef(0);
    const navRef = React.useRef(null);
    const { setUser } = useEditor();

    React.useEffect(() => {
        setUser(_user_);

        if (countRef && countRef.current > 0 && !(navRef.current)) return
        if (typeof window !== "undefined") {
            const inject = document.getElementById("headerInjector") as HTMLElement;
            const dataset = new Dataset();
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            //getting USER AFTER SIGNIN
            auth.getUser({ count: countRef.current, user: _user_ }).then(async (res) => {
                if (res) {

                    const browserType = new BrowserType(res.user.id);
                    countRef.current++;
                    const regSignin = new RegSignIn(modSelector, service, res.user, res.status);
                    const user = new User(modSelector, service, res.status, regSignin, res.user);
                    modSelector.loadFromLocal().then(async (_res) => {
                        const blogUser = _res.getBlog();
                        const url = new URL(window.location.href);
                        browserType.pushHistory({ user_id: res.user.id, pathname: url.pathname, isAdmin: res.isAdmin });
                        const { blog: _blog, user: _user } = blogUser;

                        const message = new Message(modSelector, service, _blog, null, res.user);

                        const chart = new ChartJS(modSelector, service, user, message);
                        const commonUser = new CommonUser(modSelector, service, auth);
                        const shapeOutside = new ShapeOutside(modSelector, service, user);
                        const design = new Design(modSelector);
                        const ven = new Ven(modSelector);
                        const reference = new Reference(modSelector);
                        const pasteCode = new PasteCode(modSelector, service);
                        const headerFlag = new Headerflag(modSelector, service, user);
                        const feature = new Features();
                        const signInAndUp = new SignInAndUp(modSelector, service, regSignin, auth, res.isSignedIn, browserType);
                        const metaBlog = new MetaBlog(modSelector, service, _blog);
                        const htmlElement = new HtmlElement(modSelector, service, user, shapeOutside, design, ven, reference, headerFlag, pasteCode);
                        const post = new Post(modSelector, service, res.status, res.user);
                        const profile = new Profile(modSelector, service, user, metaBlog, chart, post, htmlElement);
                        const navArrow = new NavArrow(user, auth, regSignin, service, profile, modSelector, feature, commonUser);
                        const mainHeader = new MainHeader(modSelector, service, navArrow, auth, signInAndUp);
                        Header.cleanUp(inject);
                        mainHeader.main({
                            parent: inject,
                            user: res.user,
                            isAuthenticated: res.isSignedIn,

                        });
                        navArrow.getuser({ user: res.user })
                        const userAgentData = window.navigator["userAgentData"];
                        const userAgent = window.navigator.userAgent
                        // browserType sends message of browser incompatibility if issues
                        browserType.userAgentData({ parent: inject, userAgentData: userAgentData, userAgent });

                    });
                }
            });


        }
    }, [_user_, navRef, countRef, setUser]);
    return (
        <div id="headerInjector" ref={navRef} className={styles.headerindex}></div>
    )
}

export default Index