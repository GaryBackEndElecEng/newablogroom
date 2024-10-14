
import Index from "@/components/home/Index";




export default function Home() {
  // await addpageCount();
  const styleOne = { marginInline: 0, minHeight: "100vh", paddingInline: 0, width: "100%" }


  return (
    <main style={styleOne} className="mx-0 my-0 d-flex flex-column align-items-center">
      <Index />
    </main>
  );
}

