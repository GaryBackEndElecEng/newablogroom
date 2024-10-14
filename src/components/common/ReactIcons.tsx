import { createRoot } from 'react-dom/client';
import { IconType } from "react-icons";
// import * as Icons from "react-icons/fa";

/* Your icon name from database data can now be passed as prop */

export const FaCreate = ({ parent, name, cssStyle }: { parent: HTMLElement, name: IconType | undefined, cssStyle: { [key: string]: string } }) => {
    const css = { ...cssStyle, display: "block", cursor: "pointer" }
    const IconComponent = name as IconType;
    const Icon = <IconComponent style={css} /> as React.ReactNode;
    parent.onmouseover = (e: MouseEvent) => {
        if (e) {
            parent.animate([
                { fontSize: "100%" },
                { fontSize: "105%" },
                { fontSize: "100%" },
            ], { duration: 500, iterations: 1 });
        }
    };
    const doc = createRoot(parent);
    doc.render(Icon);

}
export const FaBtn = ({ parent, icon, cssStyle }: { parent: HTMLElement, icon: IconType | undefined, cssStyle: { [key: string]: string } }) => {
    const css = { ...cssStyle, display: "block", cursor: "pointer" };
    const IconComponent = icon as IconType;
    const Icon = <IconComponent style={css} /> as React.ReactNode;
    parent.onmouseover = (e: MouseEvent) => {
        if (e) {
            parent.animate([
                { background: "inherit" },
                { background: "black", color: "white" },
                { background: "inherit" },
            ], { duration: 700, iterations: 1 });
        }
    };
    const doc = createRoot(parent);
    doc.render(Icon);

}