"use client";
import React from 'react';
import style from "./postdetail.module.css";
import { postType, userType } from '../editor/Types'
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import PostDetail from './postdetail';
import Header from '../editor/header';
import User from '../user/userMain';

export default function Index({ post, user, isUser, poster }: { post: postType | null, user: userType | null, isUser: boolean, poster: userType | null }) {
    const countRef = React.useRef(0);
    const docRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && docRef.current && countRef.current === 0 && post) {
            const injector = document.querySelector("section#postdetail") as HTMLElement;
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const _user = new User(modSelector, service);
            const _post = new PostDetail(modSelector, service, _user, user);
            _post.main({ injector, post, count: countRef.current, poster: user, isPage: true, isUser }).then((count) => {
                countRef.current = count;
                _post.cleaupKeepOne({ parent: injector, class_: `postdetail-main-container` });
            });
        }
    }, [countRef, docRef, post, user, isUser]);
    return (
        <section ref={docRef} id="postdetail" className={style.postdetail}></section>
    )
}
