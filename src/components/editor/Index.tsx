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
import MetaBlog from './metaBlog';
import NewCode from './newCode';
import ChartJS from '../chart/chartJS';
import Message from '../common/message';
import Headerflag from './headerflag';
import Dataset from '../common/dataset';
import Design from '../common/design';
import Ven from '../common/venDiagram';
import Reference from './reference';
import PasteCode from '../common/pasteCode';
import AuthService from '../common/auth';
import CommonInfo from '../common/commonInfo';
import Toolbar from '../common/toolbar';


function Index() {
    const countRef = React.useRef(0);
    const styleOne = { Background: "white", color: "black", width: "100%", minHeight: "100vh", marginInline: "0px" }

    React.useEffect(() => {

        if (typeof window !== "undefined" && countRef.current === 0) {
            const mainInjection = document.querySelector("section#mainInjection") as HTMLElement;
            const side_bar = document.querySelector("aside#sidebar") as HTMLElement;
            if (mainInjection && side_bar) {
                const dataset = new Dataset();

                const modSelector = new ModSelector(dataset);
                const service = new Service(modSelector);

                modSelector.loadFromLocal().then(async (res) => {
                    const blogUser = res.getBlog();
                    if (blogUser) {
                        const { blog, user } = blogUser;
                        const auth = new AuthService(modSelector, service);
                        auth.confirmUser({ user, count: countRef.current }).then(async (res) => {
                            if (res) {
                                countRef.current = res.count;
                                const regSignin = new RegSignIn(modSelector, service, res.user);
                                const _user = new User(modSelector, service, res.status, regSignin, res.user);
                                const message = new Message(modSelector, service, blog, null, res.user);
                                const newCode = new NewCode(modSelector, service, _user);
                                const chart = new ChartJS(modSelector, service, _user, message);
                                const design = new Design(modSelector);
                                const ven = new Ven(modSelector);
                                const pasteCode = new PasteCode(modSelector, service);
                                const reference = new Reference(modSelector);
                                const shapeOutside = new ShapeOutside(modSelector, service, _user);
                                const headerFlag = new Headerflag(modSelector, service, _user);
                                const _htmlElement = new HtmlElement(modSelector, service, _user, shapeOutside, design, ven, reference, headerFlag, pasteCode,);
                                const _toolbar = new Toolbar(modSelector, service, _user, _htmlElement);
                                const displayBlog = new DisplayBlog(modSelector, service, _user, blog, chart, message, _htmlElement);
                                const commonInfo = new CommonInfo(modSelector, service, auth);
                                const _header = new Header(modSelector, service, _user);
                                const customHeader = new CustomHeader(modSelector, service, _header, _user, shapeOutside)
                                const _flexbox = new Flexbox(modSelector, service, _user, shapeOutside);
                                const _footer = new Footer(modSelector, service, _user, reference);
                                const metablog = new MetaBlog(modSelector, service, blog);
                                const _edit = new Edit(modSelector, service, mainInjection, res.user, _flexbox, _htmlElement, _header, customHeader, _footer, displayBlog, chart);

                                const main = new Main(modSelector, service, auth, mainInjection, _toolbar, _edit, res.user, blog, _header, customHeader, displayBlog, shapeOutside, commonInfo);
                                const sidebar = new Sidebar(modSelector, service, auth, main, _flexbox, newCode, _header, customHeader, _footer, _edit, _user, regSignin, displayBlog, chart, shapeOutside, metablog, headerFlag, _toolbar);
                                await main.mainContainer(mainInjection).then(async (_res) => {
                                    if (_res) {
                                        const { textarea, mainCont, footer, mainHeader, toolbar } = _res;
                                        if (mainCont && textarea && footer && mainHeader && toolbar) {

                                            sidebar.onclickHideShowSideBar({ injector: side_bar, mainContainer: mainCont, textarea, footer, mainHeader });
                                            countRef.current++;
                                        }

                                    }
                                });
                            }
                        });
                    };
                });
            }

        }

    }, []);

    return (


        <div className="mx-auto d-flex row" style={styleOne}>
            <aside id="sidebar" className="flexCol col-lg-2 " style={{ zIndex: "0" }} ></aside>
            <section id="mainInjection" className="mainInjection flexCol-normal col-lg-10 " style={{ zIndex: "0" }}>
                {/* <!-- ENTRY POINT FOR MAIN --> */}
            </section>
        </div>
    )
}

export default Index