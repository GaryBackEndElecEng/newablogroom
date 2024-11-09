"use client"
import Admin from '@/components/admin/admin';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import { userType } from '@/components/editor/Types';
import User from '@/components/user/userMain';
import React from 'react';

export default function Index({ users, admin }: { users: userType[], admin: userType | null }) {
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (typeof window !== "undefined" && users && admin && countRef.current === 0) {

            const getIndex = document.getElementById("admin-injection") as HTMLElement;
            const modSelector = new ModSelector();
            // auth.admin = emailArr;
            const service = new Service(modSelector);
            const user = new User(modSelector, service);
            const adminClass = new Admin(service, modSelector, user, users, admin);
            adminClass.main({ injector: getIndex, count: countRef.current }).then(async (res) => {
                if (res) {
                    countRef.current = res;
                }
            });
        }
    }, [users, admin]);
    return (
        <div id="admin-injection"></div>
    )
}
