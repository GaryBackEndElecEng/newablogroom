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




export default function Index({ _user }: { _user: userType | null }) {
    const countRef = React.useRef(0);
    const injectorStyle: { [key: string]: string } = { width: "100%" }

    React.useEffect(() => {
        if (typeof window !== "undefined") {

            const dataset = new Dataset();
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            modSelector.loadFromLocal().then(async (res_) => {
                if (res_) {
                    const { blog } = res_.getBlog() as { blog: blogType, user: userType | null };
                    auth.confirmUser({ user: _user, count: countRef.current }).then(async (res) => {
                        if (res) {
                            countRef.current = res.count;
                            const isAuthenticated = res.isAuthenicated;
                            const commonInfo = new CommonInfo(modSelector, service, auth);
                            const message = new Message(modSelector, service, blog, null);
                            const dataflow = new Dataflow(service);
                            const allMsgs = new AllMsgs(modSelector, service, message)
                            const user = new User(modSelector, service, auth);
                            const feature = new Features();
                            const injector = document.querySelector("section#footerInjector") as HTMLElement;
                            const mainFooter = new MainFooter(modSelector, service, injector, auth, user, dataflow, feature, allMsgs, commonInfo);
                            mainFooter.main({ injector, isAuthenticated, user: res.user });

                        }
                    });
                }
            });

        }
    }, [_user]);
    return (
        <footer className="w-100 mx-0 mb-0" >

            <section id="footerInjector" style={injectorStyle}>


            </section>
        </footer>

    )
}
