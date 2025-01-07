"use client";
import React from 'react'
import MainFooter from "@/components/footer/mainFooter";
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import Nav from '../nav/headerNav';
import User from '../user/userMain';
import Profile from '../profile/profile';
import Dataflow from '../common/dataflow';
import NavArrow from '../nav/arrow';
import RegSignIn from '../nav/regSignin';
import Features from '../home/feature';
import MetaBlog from '../editor/metaBlog';
import ChartJS from '../chart/chartJS';
import Post from '../posts/post';
import AllMsgs from '../home/allMsgs';
import Message from '../common/message';
import MainHeader from '../nav/mainHeader';
import Quote from '@/app/quote/quote';
import { Session } from 'next-auth';
import Headerflag from '../editor/headerflag';



export default function Index({ session }: { session: Session | null }) {
    const injectorStyle: { [key: string]: string } = { width: "100%" }

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const isAuthenticated: boolean = session ? true : false;
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const message = new Message(modSelector, service, modSelector.blog, null);
            const dataflow = new Dataflow(service);
            const allMsgs = new AllMsgs(modSelector, service, message)
            const user = new User(modSelector, service);
            const headerFlag = new Headerflag(modSelector, service, user);
            const post = new Post(modSelector, service, user);
            const chart = new ChartJS(modSelector, service, user);
            const feature = new Features();
            const metaBlog = new MetaBlog(modSelector, service, user);
            const profile = new Profile(modSelector, service, user, metaBlog, chart, post, headerFlag);
            const regSignin = new RegSignIn(modSelector, service, user);
            const navArrow = new NavArrow(user, regSignin, service, profile, modSelector, feature);
            const nav = new Nav(modSelector, service, user)
            const injector = document.querySelector("section#footerInjector") as HTMLElement;
            const mainFooter = new MainFooter(modSelector, service, user, nav, navArrow, dataflow, feature, allMsgs);
            mainFooter.main({ injector, isAuthenticated });

        }
    }, [session]);
    return (
        <footer className="w-100 mx-0 mb-0" >

            <section id="footerInjector" style={injectorStyle}>


            </section>
        </footer>

    )
}
