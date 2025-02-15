import { getErrorMessage } from "@/lib/errorBoundaries";


type policyType = {
    id: number,
    title: string,
    sectionTitle: string,
    subSectionTitle: string,
    content: string,
    content1: string,
    content2: string,
    content3: string,
    webImage: string
}
async function getTerms(): Promise<policyType | undefined> {
    const url = `https://newmasterconnect.herokuapp.com/api/category/`;
    try {
        const res = await fetch(url);
        const body = await res.json();
        const policy: policyType = body.filter((obj: any) => (obj.name === "privacy"))[0].catWordSnippet[0]
        return policy;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg)
    }
}
const page = async () => {
    const style: { [key: string]: string } = { minHeight: "126vh", maxWidth: "900px", width: "100%", backgroundColor: "white" };
    const policy: policyType | undefined = await getTerms();

    return (
        <main className="mx-auto container" style={style}>
            {policy ?
                <section className="d-flex flex-column justify-content-center align-items-center position-relative">
                    <h1 className="text-center text-primary mx-auto text-3xl text-black py-2">
                        {policy.title}
                    </h1>
                    <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content}</article>
                    <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content1}</article>
                    <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content2}</article>
                    <article className="m-auto justify-self-center p-1 px-2 py-3 text-lg text-black indent-2 firstLet" >{policy.content3}</article>
                </section>
                :
                <div className="flex flex-cols justify-center items-center">
                    <h3 className="text text-2xl">could not get</h3>
                </div>
            }
        </main>
    )
}

export default page

