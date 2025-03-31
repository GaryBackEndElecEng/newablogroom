"use client";
import React from 'react'
import MainFooter from "@/components/footer/mainFooter";
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import User from '../user/userMain';
import Dataflow from '../common/dataflow';
import Features from '../home/feature';
import AllMsgs from '../home/allMsgs';
import Message from '../common/message';
import Dataset from '../common/dataset';
import { blogType, userType } from '../editor/Types';
import CommonInfo from '../common/commonInfo';
import styles from "./footer.module.css";
import BrowserType from '../common/browserType';
import RegSignIn from '../nav/regSignin';
import { useEditor } from '../context/editorContext';




export default function Index() {
    const countRef = React.useRef(0);
    const { user } = useEditor()

    React.useEffect(() => {
        if (typeof window !== "undefined") {

            const dataset = new Dataset();
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            modSelector.loadFromLocal().then(async (res_) => {
                if (res_) {
                    const { blog, user: _user } = res_.getBlog() as { blog: blogType, user: userType | null };
                    const getUser = _user || user
                    auth.confirmUser({ user: getUser, count: countRef.current }).then(async (res) => {
                        if (res) {
                            countRef.current = res.count;
                            const user_id = res?.user?.id || undefined
                            const browser = new BrowserType(user_id);
                            const isAuthenticated = res.isAuthenicated;
                            const regSignIn = new RegSignIn(modSelector, service, res.user, res.status);
                            const user = new User(modSelector, service, res.status, regSignIn, res.user);
                            const commonInfo = new CommonInfo(modSelector, service, auth);
                            const message = new Message(modSelector, service, blog, null, res.user);
                            const dataflow = new Dataflow(service);
                            const allMsgs = new AllMsgs(modSelector, service, message)
                            user.user = user_id ? res.user : {} as userType;
                            const feature = new Features();
                            const injector = document.querySelector("section#footerInjector") as HTMLElement;
                            const mainFooter = new MainFooter(modSelector, service, injector, auth, res.user, dataflow, feature, allMsgs, commonInfo, browser);
                            mainFooter.main({ injector, isAuthenticated, user: res.user });

                        }
                    });
                }
            });

        }
    }, [user]);
    return (
        <footer className="w-100 mx-0 mb-0" >

            <section id="footerInjector" className={styles.footerIndex}>


            </section>
        </footer>

    )
}
