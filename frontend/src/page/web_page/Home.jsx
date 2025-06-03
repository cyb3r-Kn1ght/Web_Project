import Navbar from "../../components/web_page/navbar.jsx";
import  { lazy, Suspense, useEffect } from 'react';
import "../../style/web_page/Home_module.css";
import Tittle from "../../components/web_page/tittle.jsx";

const ContainerButton = lazy(() => import('../../components/web_page/container-button.jsx'));
const Footer = lazy(() => import('../../components/web_page/footer.jsx'));

function Home() {
  useEffect(() => {
    document.title = 'Chat AI với Người Nổi Tiếng - CelebrityChatbot';
  }, []);
  return (
    <>
      <Navbar />
      <Tittle />
      <Suspense>
        <ContainerButton />
      </Suspense>
      <Suspense>
        <br />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
