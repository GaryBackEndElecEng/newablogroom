

/* Your icon name from database data can now be passed as prop */

export const MouseOver = ({ parent, msg }: { parent: HTMLElement, msg: string }) => {

    const getSpans = parent.querySelectorAll("span");
    const check = ([...getSpans as any] as HTMLElement[]).map(span => span.nodeName).includes("SPAN");
    if (check) {
        ([...getSpans as any] as HTMLElement[]).map(span => (
            parent.removeChild(span)
        ));
        return
    }


    const span = document.createElement("span");
    parent.style.position = "relative;"
    span.style.cssText = "display:block;font-size:10px;position:absolute;top:-25px;left:-50px;width:100px; height:auto; background:white;z-index:200;color:black;padding:5px;";
    span.className = "text-center";
    span.textContent = msg;
    parent.appendChild(span);
    span.animate([
        { transform: "scale(1)", color: "red" },
        { transform: "scale(1.05)", color: "black" },
        { transform: "scale(1)", color: "red" },
    ], { duration: 700, iterations: 1 });
    setTimeout(() => {
        if (check) {
            ([...getSpans as any] as HTMLElement[]).map(span => (
                parent.removeChild(span)
            ));
        }
    }, 1700);



}