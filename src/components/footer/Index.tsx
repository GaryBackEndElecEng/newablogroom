"use client";
import React from 'react'
import MainFooter from "@/components/footer/mainFooter";
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import Nav from '../nav/headerNav';
import User from '../user/userMain';
import Profile from '../editor/profile';
import Dataflow from '../common/dataflow';
import NavArrow from '../nav/arrow';
import RegSignIn from '../nav/regSignin';
import Features from '../home/feature';
import MetaBlog from '../editor/metaBlog';
import ChartJS from '../chart/chartJS';
import Post from '../posts/post';
import AllMsgs from '../home/allMsgs';
import Message from '../common/message';



export default function Index() {
    const injectorStyle: { [key: string]: string } = { width: "100%" }

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const message = new Message(modSelector, service, modSelector.blog);
            const dataflow = new Dataflow(service);
            const allMsgs = new AllMsgs(modSelector, service, message)
            const user = new User(modSelector, service);
            const auth = new AuthService(modSelector, service, user);
            const post = new Post(modSelector, service, user);
            const chart = new ChartJS(modSelector, service, user);
            const feature = new Features();
            const metaBlog = new MetaBlog(modSelector, service, user);
            const profile = new Profile(modSelector, service, auth, user, metaBlog, chart, post);
            const regSignin = new RegSignIn(modSelector, service, user);
            const navArrow = new NavArrow(user, regSignin, service, profile, modSelector, feature);
            const nav = new Nav(modSelector, auth, service, user, regSignin)
            const footerInjector = document.querySelector("section#footerInjector") as HTMLElement;
            const mainFooter = new MainFooter(modSelector, service, user, nav, navArrow, dataflow, feature, allMsgs);
            mainFooter.main(footerInjector);

        }
    }, []);
    return (
        <footer className="w-100 mx-0 mb-0" >

            <section id="footerInjector" style={injectorStyle}>


            </section>
        </footer>

    )
}
