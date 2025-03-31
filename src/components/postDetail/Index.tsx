"use client";
import React from 'react';
import style from "./postdetail.module.css";
import { postType, userType } from '../editor/Types'
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import PostDetail from './postdetail';
import User from '../user/userMain';
import Dataset from '../common/dataset';
import AuthService from '../common/auth';
import RegSignIn from '../nav/regSignin';

export default function Index({ post, user, isUser, poster }: { post: postType | null, user: userType | null, isUser: boolean, poster: userType | null }) {
    const countRef = React.useRef(0);
    const docRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && docRef.current && countRef.current === 0 && post) {
            const injector = document.querySelector("section#postdetail") as HTMLElement;
            const dataset = new Dataset()
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            auth.getUser({ user, count: countRef.current }).then(async (res) => {
                if (res) {
                    const pathname = window.location.pathname;
                    const regSignIn = new RegSignIn(modSelector, service, res.user, res.status);
                    const _user = new User(modSelector, service, res.status, regSignIn, res.user);
                    const _post = new PostDetail(modSelector, service, res.status, res.user);
                    _post.main({ injector, post, count: countRef.current, poster: poster, isPage: true, isUser, user, pathname }).then((count) => {
                        countRef.current = count;
                        _post.cleaupKeepOne({ parent: injector, class_: `postdetail-main-container` });
                    });
                }
            });
        }
    }, [countRef, docRef, post, user, isUser, poster]);
    return (
        <section ref={docRef} id="postdetail" className={style.postdetailIndex}></section>
    )
}
