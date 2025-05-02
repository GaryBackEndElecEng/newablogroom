import React from 'react';
import type { Metadata } from 'next';
import styles from "./resumeBuilder.module.css";


export const metadata: Metadata = {
    title: {
        default: "ResumeBuilder",
        template: `%s | ResumeBuilder`,

    },
    description: "ResumeBuilder for ablogroom.com",
    keywords: ["Canada's Resume Builder", "Resume Builder", "ResumeBuilder", "Build a resume", "best in Canada"],

    alternates: {
        canonical: "/resumebuilder",
        languages: {
            "en-US": "/en-US",
            "fr-CA": "/fr-CA"
        }
    },
    openGraph: {
        title: "Register",
        description: 'registration for www.ablogroom.com',
        url: "/register",
        images: [
            {
                url: "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/castleOcean600X240.png",
                width: 600,
                height: 240
            },
            {
                url: "https://new-master.s3.ca-central-1.amazonaws.com/ablogroom/gb_logo_600.png",
                width: 600,
                height: 600
            },
        ],
    }
}
export default function registerlayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div id="registerLayout" className={styles.resumeBuilderLayout}>
            {children}
        </div>
    )
}