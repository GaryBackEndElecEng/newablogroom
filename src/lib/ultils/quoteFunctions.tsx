import { quoteCalcItemType, returnCalcType, returnQuoteFinalType, subQuoteTypeType, userType } from "@/components/editor/Types";

export function calculateQuote({ nameValue, list, user }: { nameValue: { name: string, value: string | undefined }[], list: quoteCalcItemType[], user: userType | null }): returnQuoteFinalType | undefined {
    if (!(nameValue && nameValue.length > 0)) return;
    //RETURNS TOTAL:$AMOUNT,TOTAL HRS, RETURNS CALCULATED TYPE[]
    let totalTime: number = 0;
    let totalCost: number = 0;
    let totalList: returnCalcType[] = [];
    //updates qty in list
    const listUpdate = updateList({ list, nameValue });
    //SUMS TO TOTAL PER CATAGORY && ASSIGNS TOTALLIST FOR ALL
    totalList = nameValue.map(item => {
        return subCalc({ item, list: listUpdate, type: item.name as subQuoteTypeType });
    }).filter(item_ => (item_ !== undefined));
    totalList.map(item => {
        totalTime += item.total_time;
        totalCost += item.total_cost;
    });
    return {
        total: totalCost,
        totalHrs: totalTime,
        returnCalcList: totalList,
        user
    }
}

export function subCalc({ item, list, type }: { item: { name: string, value: string | undefined }, list: quoteCalcItemType[], type: subQuoteTypeType }): {
    total_time: number;
    total_cost: number;
    type: string;
    list: quoteCalcItemType[];
} | undefined {
    //GETS LIST FROM THE DB (LIST), THEN CALCULATES TIME TOTAL PER TYPE WITH LIST OF BASIC &&
    //  CUSTOM THE TOTAL TIME PER **CATAGORY** AS TYPE,RETURN TOTAL,TYPE,CATAGORY LIST
    if (!type) return { total_time: 0, total_cost: 0, type: "no type", list: [] as quoteCalcItemType[] }
    let totalTime: number = 0;
    let totalCost: number = 0;
    const subArr = list.filter(item => (item.type === type));
    if (!(subArr && subArr.length > 0)) return;
    if (item && item.value) {
        const special = subArr.map(item_ => {
            //special plus basic
            const qty = item_.qty as number;
            totalTime += qty * item_.time;
            totalCost += qty * item_.dollar * item_.time;
            return item_;
        });
        return {
            total_time: totalTime,
            total_cost: totalCost,
            type: type,
            list: special
        }
    } else {
        const basic = subArr.filter(itm => (itm.type === "text")).map(item_ => {
            if (item_.basic === true) {
                //basic: not selected
                const qty = item_.qty as number;
                totalTime += qty * item_.time;
                totalCost += qty * item_.dollar * item_.time;
                return item_;
            }
        }).filter(item => (item !== undefined));
        return {
            total_time: totalTime,
            total_cost: totalCost,
            type: type,
            list: basic
        }
    }
};

export function updateList({ list, nameValue }: { list: quoteCalcItemType[], nameValue: { name: string, value: string | undefined }[] }) {
    if (!(list && list.length > 0)) return list;
    // VALUE NEEDS TO BE A STRING-NUMBER
    list = list.map(item => {
        nameValue.map(nv => {
            const isNumber = (nv.value && !isNaN(parseInt(nv.value))) ? Number(nv.value) : null;
            if (isNumber) {
                if (item.isPage) {
                    item.qty = isNumber;
                }
                if (nv.name === "pages" && item.type === "pages") {
                    item.qty = isNumber;
                }
                if (nv.name === "#users" && item.type === "#users") {
                    item.qty = isNumber;
                }
            }
        });

        return item;
    });// VALUE NEEDS TO BE A STRING-NUMBER
    return list;
}