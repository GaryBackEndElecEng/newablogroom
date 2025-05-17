"use client";
import React from 'react';
import ModSelector from '@/components/editor/modSelector';
import Header from '@/components/editor/header';
import CustomHeader from '@/components/editor/customHeader';
import Sidebar from '@/components/editor/sidebar';
import Footer from "@/components/editor/footer";
import Edit from "@/components/editor/edit";
import Main from "@/components/editor/main";
import User from '../user/userMain';
import DisplayBlog from '../blog/displayBlog';
import Service from "@/components/common/services";
import Flexbox from './flexBox';
import HtmlElement from './htmlElement';
import ShapeOutside from './shapeOutside';
import RegSignIn from '../nav/regSignin';
import MetaBlog from './metaBlog/metaBlog';
import NewCode from './newCode';
import ChartJS from '../chart/chartJS';
import Message from '../common/message';
import Headerflag from './headerFlag/headerflag';
import Dataset from '../common/dataset';
import Design from '../common/design';
import Ven from '../common/venDiagram';
import Reference from './reference';
import PasteCode from '../common/pasteCode';
import AuthService from '../common/auth';
import CommonInfo from '../common/generalInfo/commonInfo';
import Toolbar from '../common/toolbar';
import { useEditor } from '../context/editorContext';
import { userType } from './Types';
import CommonUltils from '../common/commonUltils';
import DeleteClass from '../bio/resume/deleteClass';
import ViewReference from '../bio/resume/viewReference';
import ViewResume from '../bio/resume/viewResume';
import ReorgBlog from '../common/reorg/reorgBlog';



function Index({ user }: { user: userType | null }) {
    const countRef = React.useRef(0);
    const { setUser } = useEditor();
    const styleOne = { Background: "white", color: "black", width: "100%", minHeight: "260vh", marginInline: "0px", }

    React.useEffect(() => {
        setUser(user);
        if (typeof window !== "undefined" && countRef.current === 0) {
            const mainInjection = document.querySelector("section#mainInjection") as HTMLElement;
            const side_bar = document.querySelector("aside#sidebar") as HTMLElement;
            if (mainInjection && side_bar) {
                mainInjection.style.position = "relative;"
                side_bar.style.position = "relative;"
                const dataset = new Dataset();
                const modSelector = new ModSelector(dataset);
                const service = new Service(modSelector);
                const deleteClass = new DeleteClass(service, user);
                const viewRef = new ViewReference(service, deleteClass, user);
                const viewResume = new ViewResume(service, viewRef, deleteClass);
                modSelector.loadFromLocal().then(async (res) => {
                    const blogUser = res.getBlog();
                    const { blog, } = blogUser;
                    const auth = new AuthService(modSelector, service);
                    auth.confirmUser({ user, count: countRef.current }).then(async (_res) => {
                        if (_res) {
                            countRef.current = _res.count;
                            const commonUltils = new CommonUltils(modSelector, service, _res.user);
                            const regSignin = new RegSignIn(modSelector, service, _res.user, _res.status);
                            const _user = new User(modSelector, service, _res.status, regSignin, _res.user);
                            const message = new Message(modSelector, service, blog, null, _res.user);
                            const newCode = new NewCode(modSelector, service, _user, blog);
                            const chart = new ChartJS(modSelector, service, _user, message);
                            const design = new Design(modSelector);
                            const ven = new Ven(modSelector);
                            const reorg = new ReorgBlog(modSelector);
                            const pasteCode = new PasteCode(modSelector, service);
                            const reference = new Reference(modSelector);
                            const shapeOutside = new ShapeOutside(modSelector, service, _user);
                            const headerFlag = new Headerflag(modSelector, service, _user);
                            const _htmlElement = new HtmlElement(modSelector, service, _user, shapeOutside, design, ven, reference, headerFlag, pasteCode,);
                            const _toolbar = new Toolbar(modSelector, service, _user, _htmlElement, blog);
                            const displayBlog = new DisplayBlog(modSelector, service, _user, blog, chart, message, _htmlElement);
                            const commonInfo = new CommonInfo(modSelector, service, auth);
                            const _header = new Header(modSelector, service, _user, commonUltils, blog);
                            const customHeader = new CustomHeader(modSelector, service, _user, commonUltils, blog)
                            const _flexbox = new Flexbox(modSelector, service, _user, shapeOutside, commonUltils, blog);
                            const _footer = new Footer(modSelector, service, _user, reference, blog);
                            const metablog = new MetaBlog(modSelector, service, blog);
                            const _edit = new Edit(modSelector, service, mainInjection, _res.user, _flexbox, _htmlElement, _header, customHeader, _footer, displayBlog, chart, _toolbar);

                            const main = new Main(modSelector, service, auth, mainInjection, _toolbar, _edit, _res.user, blog, _header, customHeader, shapeOutside, commonInfo);
                            const sidebar = new Sidebar(modSelector, service, auth, main, _flexbox, newCode, _header, customHeader, _footer, _edit, _user, regSignin, displayBlog, chart, shapeOutside, metablog, headerFlag, _toolbar, blog, viewResume, _res.user, reorg);
                            await main.mainContainer(mainInjection).then(async (_res_) => {
                                if (_res_) {
                                    const { textarea, mainCont, footer, mainHeader, toolbar } = _res_;
                                    if (mainCont && textarea && footer && mainHeader && toolbar) {

                                        sidebar.onclickHideShowSideBar({ injector: side_bar, mainContainer: mainCont, textarea, footer, mainHeader, blog: _res_.blog });
                                        countRef.current++;
                                    }

                                }
                            });
                        }
                    });

                });
            }

        }

    }, [user, setUser]);

    return (


        <div className="mx-auto d-flex row" style={styleOne}>
            <aside id="sidebar" className="flexCol col-lg-2 " style={{ zIndex: "0", minHeight: "100%" }} ></aside>
            <section id="mainInjection" className="mainInjection flexCol-normal col-lg-10 " style={{ zIndex: "0", minHeight: "inherit" }}>
                {/* <!-- ENTRY POINT FOR MAIN --> */}
            </section>
        </div>
    )
}

export default Index