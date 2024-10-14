import React from 'react'
import Index from "@/components/editor/Index";
import type { Metadata } from "next";
import Meta from "@/components/meta/meta";
export const metadata: Metadata = Meta.metaEditor();


export default async function page() {

  return (
    <Index />
  )
}


