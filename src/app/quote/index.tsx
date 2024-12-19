"use client";
import { quoteCalcItemType, userType } from '@/components/editor/Types';
import React from 'react';
import Quote from './quote';
import ModSelector from '@/components/editor/modSelector';
import Service from '@/components/common/services';
import Htmlpdf from '@/components/common/htmltwocanvas';
import Htmltwocanvas from '@/components/common/htmltwocanvas';

export default function Index({ user, list }: { user: userType | null, list: quoteCalcItemType[] }) {
    const clientRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && clientRef.current, list) {
            const target = document.querySelector("div#get-quote-injection") as HTMLElement;
            if (target) {
                const modSelector = new ModSelector();
                const service = new Service(modSelector);
                const html2canvas = new Htmltwocanvas(service);
                const quote = new Quote(service, user, list, html2canvas);
                quote.main({ parent: target });
            }

        }
    }, [user, list]);
    return (
        <div id="get-quote-injection" ref={clientRef}></div>
    )
}
