"use client"
import React from "react";
import { elementType, colType, rowType, selectorType, element_selType, blogType } from "@/components/editor/Types";


type editorContextType = {
    rows: rowType[],
    setRows: React.Dispatch<React.SetStateAction<rowType[]>>,
    row: rowType,
    setRow: React.Dispatch<React.SetStateAction<rowType>>,
    col: colType,
    setCol: React.Dispatch<React.SetStateAction<colType>>,
    element: elementType,
    setElement: React.Dispatch<React.SetStateAction<elementType>>,
    elements: elementType[],
    setElements: React.Dispatch<React.SetStateAction<elementType[]>>,
    element_sel: element_selType,
    setElement_sel: React.Dispatch<React.SetStateAction<element_selType>>,
    element_sels: element_selType[],
    setElement_sels: React.Dispatch<React.SetStateAction<element_selType[]>>,
    selectors_: selectorType[],
    setSelectors_: React.Dispatch<React.SetStateAction<selectorType[]>>,
    blog_: blogType,
    setBlog_: React.Dispatch<React.SetStateAction<blogType>>,
    blogs: blogType[] | null,
    setBlogs: React.Dispatch<React.SetStateAction<blogType[] | null>>,
}
const EditorContext = React.createContext<editorContextType>({} as editorContextType)

const EditorContextProvider = (props: any) => {

    const [row, setRow] = React.useState<rowType>({} as rowType);
    const [rows, setRows] = React.useState<rowType[]>([]);
    const [col, setCol] = React.useState<colType>({} as colType);
    const [element, setElement] = React.useState<elementType>({} as elementType);
    const [elements, setElements] = React.useState<elementType[]>([]);
    const [element_sel, setElement_sel] = React.useState<element_selType>({} as element_selType);
    const [element_sels, setElement_sels] = React.useState<element_selType[]>([]);
    const [selectors_, setSelectors_] = React.useState<selectorType[]>([]);
    const [blog_, setBlog_] = React.useState<blogType>({} as blogType);
    const [blogs, setBlogs] = React.useState<blogType[] | null>(null);
    return (
        <EditorContext.Provider value={{ element, setElement, elements, setElements, element_sel, setElement_sel, element_sels, setElement_sels, row, setRow, col, setCol, rows, setRows, selectors_, setSelectors_, blog_, setBlog_, blogs, setBlogs, }} >{props.children}</EditorContext.Provider>
    )
}
export default EditorContextProvider;

export const useEditor = () => {
    return React.useContext(EditorContext)
}
export const StorBlog = ({ blog }: { blog: blogType }) => {
    const { setBlog_ } = useEditor();
    setBlog_(blog)
    return (<></>)
}