"use client";
import { createRoot, Root } from 'react-dom/client';
import { IconType } from "react-icons";
// import * as Icons from "react-icons/fa";

/* Your icon name from database data can now be passed as prop */

export const FaCreate = ({ parent, name, cssStyle }: { parent: HTMLElement, name: IconType | undefined, cssStyle: { [key: string]: string } }): Root | undefined => {
    const css = { ...cssStyle, display: "block", cursor: "pointer" }
    const IconComponent = name as IconType;
    // let root:Root
    const isCreated = alreadyCreated({ parent });
    if (!isCreated) {
        const Icon = <IconComponent style={css} /> as React.ReactNode;
        const root = createRoot(parent);
        root.render(Icon);
        return root
    }

}
export const FaBtn = ({ parent, icon, cssStyle }: { parent: HTMLElement, icon: IconType | undefined, cssStyle: { [key: string]: string } }) => {
    const css = { ...cssStyle, display: "block", cursor: "pointer" };
    const IconComponent = icon as IconType;
    const Icon = <IconComponent style={css} /> as React.ReactNode;
    const doc = createRoot(parent);
    doc.render(Icon);

}
export function alreadyCreated(item: { parent: HTMLElement }): boolean {
    const { parent } = item;
    let bool: boolean;
    bool = false;
    ([...parent.children as any] as HTMLElement[]).map(child => {
        if (child && child.nodeName === "SVG") {
            bool = true
        }
    });
    return bool
}