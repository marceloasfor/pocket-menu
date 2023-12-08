import Footer from "@/components/Home/Footer";
import LoginForm from "@/components/Home/LoginForm";
import Navbar from "@/components/Home/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex px-5 pt-36 pb-12 mb-12 lg:px-36">
        <div className="flex flex-col gap-4 w-full xl:pr-32 lg:w-1/2">
          <div className="flex flex-col gap-5">
            <p className=" text-[72px] leading-[70px] lg:text-[90px] text-transparent font-medium lg:leading-[95px] tracking-tight bg-gradient bg-clip-text">
              POCKET MENU
              <br />
            </p>
            <p className="text-lg leading-7 text-gray-600">
              Insira o código da mesa e o nome de usuário:
            </p>
          </div>
          <LoginForm />
        </div>
        <div className="object-cover w-0 lg:w-1/2">
          <img src="/images/image.png" alt="hero" />
        </div>
      </div>
      <Footer />
    </main>
  );
}