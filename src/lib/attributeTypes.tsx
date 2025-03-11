
export type typeAttType = {
    key: "data-type"
    value: "element" | "col" | "row" | "main",
};


export type classListType = {
    [key: string]: string
};


export type cssMsgType = {
    [key: string]: string
};


export type keyValueStrType = {
    key: string,
    value: string | undefined,
};


export type idEnumType = "type" | "rowType" | "colType" | "eleType" | "name" | "element" | "aria" | "ID" | "column" | "row" | "rowNum" | "numCols" | "numEles" | "IDRowCol" | "IDCol" | "placement" | "link" | "email" | "tel" | "time" | "imgKey" | "editableTrue" | "editableFalse" | "flex" | "attr" | "backgroundImg" | "shapeOutside" | "shapeOutsideCircle" | "shapeOutsideSquare" | "shapeOutsidePolygon" | "headerflag" | "isCode" | "isArrow" | "isArt" | "isVen" | "isWave" | "isArch" | "btn" | "msg" | "delete" | "link2" | "card" | "card2" | "fill" | "graph" | "forType" | "imgDesc" | "elementId" | "ordered" | "divContId" | "parent_id" | "ele_id" | "selectorId" | "rowId" | "row_id" | "col_id" | "selector_id" | "colId" | "rowOrder" | "colOrder" | "eleOrder" | "elePlacement" | "dFlex" | "design" | "isRow" | "isColumn" | "isElement" | "referenceLink" | "isPasteCode" | "isCodeElement" | "isCircle" | "addClass" | "reference" | "isEdit" | "bgColor" | "height" | "cssStyle" | "parentId" | "noFlex" | "isHeader" | "isImage" | "noImage" | "isFooter" | "selRowCol" | "eleId" | "update" | "img" | "text" | "reflink" | "isReference" | "pasteCode" | "isHeaderflag" | "titleArt" | "arch" | "arrow" | "wave" | "circle" | "ven" | "selRow" | "clean" | "links" | "linkImgs" | "para" | "backgroundImage" | "blogId" | "imgBgKey" | "linearGrad" | "isChart" | "chart" | "addUrlImg";

export type typeEnumType = "headerflag" | "shapeOutside" | "design" | "reference" | "pasteCode" | "ven" | "chart";

export type attrEnumType = "shapeOutsideCircle" | "shapeOutsideSquare" | "shapeOutsidePolygon" | "isVen" | "isArrow" | "isCircle" | "isArch" | "isPasteCode" | "isHeaderflag" | "isArt" | "isWave" | "link" | "email" | "tel" | "time" | "isReference" | "backgroundImg" | "imgDesc" | "imgKey" | "isBlog" | "blogId" | "linearGrad" | "isChart" | "addUrlImg";
export type attrDesignEnumType = "isArt" | "isCircle" | "isWave" | "isArrow" | "isArch"

export type locationEnumType = "headerflag" | "shapeOutside" | "design" | "reference" | "pasteCode" | "customHeader" | "normalHeader" | "flexbox" | "htmlElement" | "footer" | "dataset" | "main" | "sidebar" | "ven" | "edit" | "display" | "user" | "header";
export type eleEnumType = "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "a" | "time" | "section" | "artcle" | "header" | "pre" | "img" | "ul" | "li" | "ol" | "blockquote" | "footer" | "small" | "button" | "article" | "canvas";
export type idValueType = {
    eleId: string,
    id: idEnumType,
    attValue: string
};


export type displayIdValueResponseType = { id: idEnumType, isValue: boolean, value: string | undefined }


export type headerEnumType = "custom" | "normal" | undefined;


export type levelEnumType = "element" | "col" | "row" | "selector" | "main" | "footer" | "header" | "blog" | undefined


export type typeToIdType = {
    type: "generic" | "design" | "shapeOutside" | "shapeCircle" | "shapeSquare" | "shapePolygon" | "code" | "order" | "placement" | "custom" | "headerflag" | "links" | "info" | "upload" | "attr" | "flex" | "reference" | undefined,
    id: string | undefined
}


export type IDKeyValueType = {
    eleProperty: "attr" | "type" | "imgKey" | "generic" | "flex" | "class" | "imgBgKey",
    type: "generic" | "design" | "shapeOutside" | "shapeCircle" | "shapeSquare" | "shapePolygon" | "code" | "order" | "placement" | "custom" | "headerflag" | "links" | "info" | "upload" | "attr" | "flex" | "reference" | "charts" | "addUrlImg" | undefined,
    level: levelEnumType,
    nodes: eleEnumType[],
    class_: string | undefined,
    id: idEnumType,
    key: string,
    value: string | undefined,
};
export type IDTypesType = {
    type: "generic" | "design" | "shapeOutside" | "code" | "custom" | "headerflag" | "links" | "info" | "upload" | "attr" | "ven" | "chart",
    nodes: string[],
    id: string
};
export type appendAttType = {
    eleProperty: "attr" | "type" | "imgKey" | "generic" | "flex" | "class" | "imgBgKey",
    type: "generic" | "design" | "shapeOutside" | "shapeCircle" | "shapeSquare" | "shapePolygon" | "code" | "order" | "placement" | "custom" | "headerflag" | "links" | "info" | "upload" | "attr" | "flex" | "headers" | "reference" | "charts" | "addUrlImg" | undefined,
    level: levelEnumType,
    node: string,
    id: string,
    key: string,
    value: string | undefined

};
export type standardAttType = {
    eleProperty: "attr" | "type" | "imgKey" | "generic" | "flex" | "class" | "imgBgKey",
    level: levelEnumType,
    cat: "normal" | "links" | "custom" | "flex" | "info" | "upload" | "headers" | "shapeOutside" | "headerflag",
    loc: "flexbox" | "htmlElement" | "both",
    type: "generic" | "design" | "shapeOutside" | "shapeOutsideCircle" | "shapeOutsideSquare" | "shapeOutsidePolygon" | "code" | "order" | "placement" | "custom" | "headerflag" | "links" | "info" | "upload" | "attr" | "flex" | "headers" | "reference" | "ven" | "charts" | undefined,
    class_?: string,
    action: "hover" | "click" | "toggle" | "none" | "insert" | "upload" | "label_attr" | "label_type" | "stringify",
    node?: string,
    keyvalues: IDKeyValueType[],
}
export type insertClassMsgType = {
    level: levelEnumType,
    type: "htmlElement" | "flexbox" | "all",
    method?: string,
    action: actionType,
};
export type actionType = {
    name: "hover" | "click" | "toggle" | "none" | "generic" | "insert",
    action: bodyActionType[]
}
export type bodyActionType = {
    id?: string,
    type?: string,
    eleType?: string,
    class_?: string,
    key?: string,
    value: string | undefined,
}
export type cssClassType = {
    level: levelEnumType,
    headerType: headerEnumType,
    id: idEnumType,
    loc: "flexbox" | "htmlElement",
    type: locationEnumType | undefined,
    eleType?: eleEnumType,
    key: string | undefined,
    className: string | undefined,
    css: string | undefined,
}
export type keyValueType = {
    key: string,
    value: string | boolean | number | undefined,
}
export type flexToAttInterfaceType = {
    key: string,
    value: string | boolean | number | undefined,
    level?: string,
    attType?: string,
    flex: boolean
}

export type rowAttType = {
    id: number,
    name: string,
    eleId: string,
    selectorEleId: string,
    rowNum?: number,
    type: string,
    classList?: string[],
    order: number,
    flex: keyValueType,
    cssMsg: cssMsgType,
    attr: string
}
export type colAttType = {
    id: number,
    name: string,
    eleId: string,
    colNum?: number,
    rowEleId: string,
    type: string,
    classList: string[],
    order: number,
    flex: keyValueType,
    cssMsg: cssMsgType,
    attr: string
}
export type eleAttType = {
    id: number,
    cat: "flexbox" | "htmlElement" | undefined,
    name: string,
    eleId: string,
    eleNum?: number,
    colEleId: string,
    type: string,
    classList: string[],
    flex?: keyValueType,
    order?: number,
    placement?: number,
    cssMsg: cssMsgType,
    attr: string
}
export type flexAttributeType = {
    anchorContainer?: string,
    link?: string,
    email?: string,
    tel?: string,
    time?: string,
    imgKey?: string,
    attr?: string
    backgroundImage?: boolean,
    shapeOutside?: boolean,
    shapeOutsideCircle?: boolean,
    shapeOutsideSquare?: boolean,
    shapeOutsidePolygon?: boolean,
};
export type flexCoreType = {
    name?: string,
    col?: number,
    row?: number,
    order: number,
    selectorId?: string,
    colId: string,
    rowId: string,
    placement: number,
    elementId?: string,
    user_id?: string,
    position?: string,
};

export type selectIdType = {
    eleId: string,
    eleNum: number,
    rowIds: rowIdType[]
}
export type rowIdType = {
    eleId: string,
    eleNum: number,
    colIds: colIdType[]
}
export type colIdType = {
    eleId: string,
    eleNum: number,
    eleIds: eleIdType[]
}
export type eleIdType = {
    eleId: string,
    eleNum: number,
}
export type getKeyvaluePairsType = {
    id: string,
    name: string,
    level: "row" | "col" | "element",
    keyvalue: keyValueType
}
export type elementParamType = {
    attr: string,
    type: string,
    imgKey: string,
    eleId: string,
    id: number,
    placement: number,
    order: number,
    name: string,
    rowNum: number,
    colNum: number,
    header: boolean,
    footer: boolean,
    headerType: string

};
export type selRowColType = {
    selectorId: string,
    rowId: string,
    colId: string
}
export type rowColType = {
    rowId: string,
    colId: string
}
export type selRowType = {
    selectorId: string,
    rowId: string
}