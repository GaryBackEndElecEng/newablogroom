
import Index from "@/components/home/Index";
import "bootstrap/dist/css/bootstrap.min.css";



export default function Home() {

  const styleOne = { marginInline: 0, height: "100%", paddingInline: 0 }


  return (
    <main id="page-main-home" style={styleOne} className=" my-0 d-flex flex-column align-items-center w-100 mx-auto">
      <Index />
    </main>
  );
}

