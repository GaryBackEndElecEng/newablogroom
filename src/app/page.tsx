
import Index from "@/components/home/Index";
import "bootstrap/dist/css/bootstrap.min.css";



export default function Home() {
  // await addpageCount();
  const styleOne = { marginInline: 0, minHeight: "100vh", paddingInline: 0, width: "100%" }


  return (
    <main id="page-main-home" style={styleOne} className=" my-0 d-flex flex-column align-items-center">
      <Index />
    </main>
  );
}

