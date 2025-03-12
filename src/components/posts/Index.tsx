"use client";
import React from 'react';
import ModSelector from '../editor/modSelector';
import Service from '../common/services';
import AuthService from '../common/auth';
import Post from './post';
import User from '../user/userMain';
import styles from "./post.module.css"
import { postType, userType } from '../editor/Types';
import Dataset from '../common/dataset';



export default function Index({ posts, usersinfo, user }: { posts: postType[], usersinfo: userType[], user: userType | null }) {
    const refPosts = React.useRef(null);
    const countRef = React.useRef(0);

    React.useEffect(() => {
        if (typeof window !== 'undefined' && refPosts.current && countRef.current === 0 && posts) {
            const htmlPosts = document.querySelector("section#posts") as HTMLElement;
            const dataset = new Dataset();
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            auth.getSessionUser({ user }).then(async (res) => {
                if (res) {

                    const _user = new User(modSelector, service, auth);
                    const _posts = new Post(modSelector, service, auth, _user, res.user);
                    _posts.loadPosts({ posts }).then(async (retPosts) => {
                        if (retPosts) {
                            _posts.main({ injector: htmlPosts, posts: retPosts, usersinfo: usersinfo }).then(async () => {
                                countRef.current++;

                            });

                        }
                    });
                }
            });
        }
    }, [posts, usersinfo, user, refPosts, countRef]);
    return (
        <section ref={refPosts} id="posts" className={styles.mainPost}>

        </section>
    )
}
