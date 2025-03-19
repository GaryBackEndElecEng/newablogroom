"use client"
import Admin from '@/components/admin/admin';
import AuthService from '@/components/common/auth';
import Dataset from '@/components/common/dataset';
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
            const dataset = new Dataset();
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const auth = new AuthService(modSelector, service);
            const user = new User(modSelector, service, auth);
            auth.confirmUser({ user: admin, count: countRef.current }).then(async (res) => {
                if (res) {
                    countRef.current = res.count + 1;
                    const adminClass = new Admin(service, modSelector, user, users, res.user);
                    adminClass.main({ injector: getIndex, count: countRef.current }).then(async (res) => {
                        if (res) {
                            countRef.current = res;
                        }
                    });
                }
            });
        }
    }, [users, admin]);
    return (
        <div id="admin-injection"></div>
    )
}
