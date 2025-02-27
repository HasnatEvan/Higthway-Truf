import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import bannerImage1 from "../../assets/logo/banner1.png";
import bannerImage2 from "../../assets/logo/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  const images = [bannerImage1, bannerImage2];

  return (
    <Link to={'/all-slots'}>
      <div className="w-full mx-auto relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="shadow-lg"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="relative flex justify-center">
              {/* Banner image */}
              <div className="relative w-full flex justify-center">
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  loading="lazy"
                  className="w-full h-auto max-h-[650px] object-contain  "
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Link>
  );
};

export default Banner;
