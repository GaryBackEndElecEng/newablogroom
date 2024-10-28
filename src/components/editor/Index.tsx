"use client";
import React from 'react';
import ModSelector from '@/components/editor/modSelector';
import Header from '@/components/editor/header';
import CustomHeader from '@/components/editor/customHeader';
import Sidebar from '@/components/editor/sidebar';
import { useEditor } from "@/components/context/editorContext";
import Footer from "@/components/editor/footer";
import Edit from "@/components/editor/edit";
import Main from "@/components/editor/main";
import User from '../user/userMain';
import DisplayBlog from '../blog/displayBlog';
import Service from "@/components/common/services";
import AuthService from '../common/auth';
import Flexbox from './flexBox';
import HtmlElement from './htmlElement';
import Profile from './profile';
import Nav from '../nav/headerNav';
import ShapeOutside from './shapeOutside';
import RegSignIn from '../nav/regSignin';
import NavArrow from '../nav/arrow';
import MetaBlog from './metaBlog';
import Features from '../home/feature';
import NewCode from './newCode';
import ChartJS from '../chart/chartJS';
import Message from '../common/message';
import Post from '../posts/post';


function Index() {
    const { setBlog_ } = useEditor();
    const mainRef = React.useRef(null);
    const sidebarRef = React.useRef(null);
    const styleOne = { Background: "white", color: "black", width: "100%", minHeight: "100vh", marginInline: "0px" }

    React.useEffect(() => {
        const mainInjection = document.getElementById("mainInjection");
        const side_bar = document.getElementById("sidebar");

        if (mainInjection && side_bar) {
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const _user = new User(modSelector, service);
            const _auth = new AuthService(modSelector, service, _user);
            const post = new Post(modSelector, service, _user);
            const chart = new ChartJS(modSelector, service, _user);
            const shapeOutside = new ShapeOutside(modSelector, service, _user);
            const newCode = new NewCode(modSelector, service, _user);
            const _header = new Header(modSelector, service, _user);
            const customHeader = new CustomHeader(modSelector, service, _header, _user, shapeOutside)
            const _flexbox = new Flexbox(modSelector, service, _user, shapeOutside);
            const _htmlElement = new HtmlElement(modSelector, service, _user, shapeOutside);
            const _footer = new Footer(modSelector, service, _user);
            const message = new Message(modSelector, service, modSelector.blog);
            const displayBlog = new DisplayBlog(modSelector, service, _user, shapeOutside, newCode, chart, message);
            const metablog = new MetaBlog(modSelector, service, _user);
            const profile = new Profile(modSelector, service, _auth, _user, metablog, chart, post);
            const regSignin = new RegSignIn(modSelector, service, _user);
            const feature = new Features();
            const navArrow = new NavArrow(_user, regSignin, service, profile, modSelector, feature);
            const nav = new Nav(modSelector, _auth, service, _user, regSignin);
            const _edit = new Edit(modSelector, _auth, service, mainInjection, _user, _flexbox, _htmlElement, _header, customHeader, _footer, displayBlog, newCode, chart, shapeOutside);
            const main = new Main(modSelector, service, _auth, profile, mainInjection, _edit, _user, newCode, _flexbox, _htmlElement, _footer, _header, customHeader, displayBlog, shapeOutside, nav, navArrow);
            const sidebar = new Sidebar(modSelector, service, main, _flexbox, newCode, _header, customHeader, _footer, _edit, _user, regSignin, displayBlog, chart, shapeOutside, metablog);
            sidebar.onclickHideShowSideBar(side_bar);
            main.mainContainer(mainInjection);
            if (modSelector.blog) {
                setBlog_(modSelector.blog);
            }
        }

    }, [setBlog_]);

    return (
        <div className="d-flex flex-column align-items-center justify-content-start mx-auto mb-4 mt-0 py-0">


            <section className="mx-auto d-flex row" style={styleOne}>
                <aside id="sidebar" className="flexCol col-lg-2 " style={{ zIndex: "0" }} ref={sidebarRef}>

                </aside>
                <section id="mainInjection" className="mainInjection flexCol-normal col-lg-10 " style={{ zIndex: "0" }} ref={mainRef}>

                    {/* <!-- ENTRY POINT FOR MAIN --> */}
                </section>


            </section>

        </div>
    )
}

export default Index