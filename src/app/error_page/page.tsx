"use server";
import React from 'react'
import Index from './Index'
import Meta from '@/components/meta/meta';

export default async function error_() {
    return (
        <div className="isLocal container-fluid mx-auto"><Index /> </div>
    )
}