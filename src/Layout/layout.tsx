import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Hero from "@/components/shared/Hero";


type Props = {
    children:React.ReactNode,
    showHero?:boolean
};

const Layout = ({children,showHero}:Props)=>{
  return(
    <div className=" flex flex-col min-h-scren ">
     <Header/>
     {showHero && <Hero/>}
     <div className="container mx-auto flex-1 py-10">
        {children}
     </div>
     <Footer/>
    </div>
  )
};

export default Layout