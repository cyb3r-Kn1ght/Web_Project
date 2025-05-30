import Navbar from "../../components/web_page/navbar.jsx";
import React, { lazy, Suspense, useEffect } from 'react';
import "../../style/web_page/Home_module.css";

const Tittle = lazy(() => import('../../components/web_page/tittle.jsx'));
const ContainerButton = lazy(() => import('../../components/web_page/container-button.jsx'));
const Footer = lazy(() => import('../../components/web_page/footer.jsx'));

function Home() {
  useEffect(() => {
    document.title = 'AI ChatBot-Home';
  }, []);
  return (
    <>
      <Navbar />
      <Suspense>
        <Tittle />
        <ContainerButton />
        <br />
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
