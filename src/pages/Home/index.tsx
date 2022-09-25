import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import MissionContent from "../../content/MissionContent.json";
import ContactContent from "../../content/ContactContent.json";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Contact = lazy(() => import("../../components/ContactForm"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Home = () => {
  const history = useHistory();

  return (
    <>
      <Header />
      <Container>
        <ScrollToTop />
        <ContentBlock
          type="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="developer.svg"
          onClick={() => history.push("/login")}
          id="intro"
        />

        <ContentBlock
          type="right"
          title={MiddleBlockContent.title}
          content={MiddleBlockContent.text}
          icon="product-launch.svg"
          id="about"
        />

        <ContentBlock
          type="right"
          title={MissionContent.title}
          content={MissionContent.text}
          icon="graphs.svg"
          id="mission"
        />

        <Contact
          title={ContactContent.title}
          content={ContactContent.text}
          id="contact"
        />
      </Container>
      <Footer />
    </>
  );
};

export default Home;
