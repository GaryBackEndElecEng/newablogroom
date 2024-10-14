"use client"
import Admin from '@/components/admin/admin';
import AuthService from '@/components/common/auth';
import Service from '@/components/common/services';
import ModSelector from '@/components/editor/modSelector';
import User from '@/components/user/userMain';
import React from 'react';

export default function Index() {
    React.useEffect(() => {
        const getIndex = document.getElementById("admin-injection") as HTMLElement;
        const modSelector = new ModSelector();
        const auth = new AuthService(modSelector);
        // auth.admin = emailArr;
        const service = new Service(modSelector, auth);
        const user = new User(modSelector, service, auth);
        const admin = new Admin(service, modSelector, auth, user);
        admin.main(getIndex);
    }, []);
    return (
        <div id="admin-injection"></div>
    )
}
