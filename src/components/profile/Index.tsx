"use client";
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import React from 'react'
import { userType } from '../editor/Types';
import ProfileMain from './profileMain';
import User from '../user/userMain';
import MetaBlog from '../editor/metaBlog/metaBlog';
import ChartJS from '../chart/chartJS';
import Post from '../posts/post';
import Headerflag from '../editor/headerFlag/headerflag';
import Dataset from '../common/dataset';
import HtmlElement from '../editor/htmlElement';
import ShapeOutside from '../editor/shapeOutside';
import Design from '../common/design';
import Ven from '../common/venDiagram';
import Reference from '../editor/reference';
import PasteCode from '../common/pasteCode';
import AuthService from '../common/auth';
import RegSignIn from '../nav/regSignin';
import Message from '../common/message';

export default function Index({ user }: { user: userType | null }) {
  const countRef = React.useRef(0);
  const profileRef = React.useRef(null);
  React.useEffect(() => {
    if (typeof window !== "undefined" && countRef.current === 0 && profileRef.current && user) {
      const profileMainInjector = document.querySelector("div#profileMainIndex") as HTMLElement;
      const dataset = new Dataset();
      const modSelector = new ModSelector(dataset);
      const service = new Service(modSelector);
      const auth = new AuthService(modSelector, service)
      auth.getUser({ user, count: countRef.current }).then(async (res) => {
        if (res?.user) {
          const regSignIn = new RegSignIn(modSelector, service, res.user)
          const _user = new User(modSelector, service, res.status, regSignIn, res.user);
          _user.user = res.user
          const shapeOutside = new ShapeOutside(modSelector, service, _user);
          const design = new Design(modSelector);
          const ven = new Ven(modSelector);
          const reference = new Reference(modSelector);
          const headerFlag = new Headerflag(modSelector, service, _user);
          const pasteCode = new PasteCode(modSelector, service);
          const metablog = new MetaBlog(modSelector, service, modSelector.blog);
          const htmlElement = new HtmlElement(modSelector, service, _user, shapeOutside, design, ven, reference, headerFlag, pasteCode);
          const message = new Message(modSelector, service, null, null, res.user);
          const chart = new ChartJS(modSelector, service, _user, message);
          const post = new Post(modSelector, service, res.status, res.user);
          const profile = new ProfileMain(modSelector, service, _user, metablog, chart, post, htmlElement);
          await profile.main({ parent: profileMainInjector, user: res.user }).then(() => {
            countRef.current++;
            profile.cleanUpKeepOne(profileMainInjector, "section#main-outerMain")
          });
        }
      });
    }

  }, [profileRef, countRef, user]);
  return (
    <div id="profileMainIndex" ref={profileRef}></div>
  )
}
