import Navbar from "../../components/web_page/navbar.jsx";
import Footer from "../../components/web_page/footer";
import ContainerButton from "../../components/web_page/container-button.jsx";

import Tittle from "../../components/web_page/tittle.jsx";
import "../../style/web_page/Home.module.css";
function Home() {
  return (
    <>
      <Navbar />
      <Tittle />
      <ContainerButton />
      <Footer />
    </>
  );
}

export default Home;
