"use client";
import React from 'react';
import style from "./postdetail.module.css";
import { postType, userType } from '../editor/Types'
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import PostDetail from './postdetail';

export default function Index({ post, user }: { post: postType | null, user: userType | null }) {
    const countRef = React.useRef(0);
    const docRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && docRef.current && countRef.current === 0 && post && user) {
            const injector = document.querySelector("section#postdetail") as HTMLElement;
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const _post = new PostDetail(modSelector, service);
            _post.main({ injector, post, count: countRef.current, poster: user, isPage: true }).then((count) => {
                countRef.current = count;
            });
        }
    }, [countRef, docRef, post, user]);
    return (
        <section ref={docRef} id="postdetail" className={style.postdetail}>Index</section>
    )
}
