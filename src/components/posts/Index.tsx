"use client";
import React from 'react';
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import Post from './post';
import User from '../user/userMain';
import styles from "./post.module.css"


export default function Index() {
    let count = 0;
    const refPosts = React.useRef(null);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && refPosts.current && count === 0) {
            const htmlPosts = document.querySelector("section#posts") as HTMLElement;
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const user = new User(modSelector, service);
            const posts = new Post(modSelector, service, user);
            const option = {
                headers: {
                    "Content-Type": "application/json"
                }, method: "GET"
            }
            fetch("/api/posts", option).then(async (res) => {
                if (res.ok) {
                    const post_s = await res.json();
                    await posts.main({ injector: htmlPosts, posts: post_s });
                    count++;
                }
            });
        }
    }, [count]);
    return (
        <section ref={refPosts} id="posts" className={styles.mainPost}>

        </section>
    )
}
