import ContactIcon from "../../Shared/ContactIcon";
import Banner from "./Banner";
import Category from "./Category";
import ContactForm from "./ContactFrom";
import LocationTurf from "./LocationTurf";
import Section from "./Section";

;

const Home = () => {
    return (
        <div className="bg-white text-gray-700">
            <Banner></Banner>
            <Section></Section>
            <Category></Category>
            <LocationTurf></LocationTurf>
            <ContactForm></ContactForm>
            <ContactIcon></ContactIcon>

        </div>
    );
};

export default Home;