"use client";
import React from 'react';
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import Post from './post';
import User from '../user/userMain';
import styles from "./post.module.css"
import { postType, userType } from '../editor/Types';


export default function Index({ posts, usersinfo }: { posts: postType[], usersinfo: userType[] }) {
    const refPosts = React.useRef(null);
    const countRef = React.useRef(0);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && refPosts.current && countRef.current === 0) {
            const htmlPosts = document.querySelector("section#posts") as HTMLElement;
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const user = new User(modSelector, service);
            const _posts = new Post(modSelector, service, user);
            _posts.main({ injector: htmlPosts, posts: posts, usersinfo: usersinfo }).then(async () => {
                countRef.current++;

            });
        }
    }, [posts, usersinfo, refPosts, countRef]);
    return (
        <section ref={refPosts} id="posts" className={styles.mainPost}>

        </section>
    )
}
