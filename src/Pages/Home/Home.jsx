import ContactIcon from "../../Shared/ContactIcon";
import AllSlots from "../AllSlots/AllSlots";
import Banner from "./Banner";
import Category from "./Category";
import ContactForm from "./ContactFrom";
import LocationTurf from "./LocationTurf";
import Section from "./Section";

;

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <AllSlots></AllSlots>
            <Section></Section>
            <Category></Category>
            <LocationTurf></LocationTurf>
            <ContactForm></ContactForm>
            <ContactIcon></ContactIcon>

        </div>
    );
};

export default Home;