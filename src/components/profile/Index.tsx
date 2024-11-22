"use client";
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import React from 'react'
import { userType } from '../editor/Types';
import ProfileMain from './profileMain';
import User from '../user/userMain';
import MetaBlog from '../editor/metaBlog';
import ChartJS from '../chart/chartJS';
import Post from '../posts/post';

export default function Index({ user }: { user: userType | null }) {
  const countRef = React.useRef(0);
  const profileRef = React.useRef(null);
  React.useEffect(() => {
    if (typeof window !== "undefined" && countRef.current === 0 && profileRef.current && user) {
      const profileMainInjector = document.querySelector("div#profileMainIndex") as HTMLElement;
      const modSelector = new ModSelector();
      const service = new Service(modSelector);
      const _user = new User(modSelector, service);
      const metablog = new MetaBlog(modSelector, service, _user);
      const chart = new ChartJS(modSelector, service, _user);
      const post = new Post(modSelector, service, _user);
      const profile = new ProfileMain(modSelector, service, _user, metablog, chart, post)
      profile.main({ parent: profileMainInjector, user }).then(() => {
        countRef.current++;
        profile.cleanUpKeepOne(profileMainInjector, "section#main-outerMain")
      });
    }

  }, [profileRef, countRef, user]);
  return (
    <div id="profileMainIndex" ref={profileRef}></div>
  )
}
