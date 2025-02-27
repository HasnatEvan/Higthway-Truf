import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

// Import images
import cat1 from "../../assets/Gallery/imge1.jpg";
import cat2 from "../../assets/Gallery/imge2.jpg";
import cat3 from "../../assets/Gallery/imge3.jpg";
import cat4 from "../../assets/Gallery/imge4.jpg";
import cat5 from "../../assets/Gallery/imge5.jpg";
import cat6 from "../../assets/Gallery/imge6.jpg";
// import cat7 from "../../assets/Banner/Pasta.jpg";
// import cat8 from "../../assets/Banner/Drinks.jpg";
// import cat9 from "../../assets/Banner/Salad.jpg";

const Category = () => {
  const categories = [
    { image: cat1 },
    { image: cat2 },
    { image: cat3 },
    { image: cat4 },
    { image: cat5 },
    { image: cat6 },
    // { name: "Pasta", image: cat7 },
    // { name: "Drinks", image: cat8 },
    // { name: "Salad", image: cat9 },
  ];

  return (
    <section className="relative z-0"> {/* এখানে z-0 সেট করা হয়েছে */}
      <div className="mt-2">
        <h2 className="text-center text-3xl mb-4">𝑮𝒂𝒍𝒍𝒆𝒓𝒚</h2>
        <Swiper
          className="relative z-0" // Swiper-এর জন্য z-0 দেওয়া হয়েছে
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: false }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            480: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex flex-col items-center">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-opacity-50 text-white text-center py-2 rounded-t-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {category.name}
                </motion.div>
                <motion.img
                  src={category.image}
                  alt={`Category ${category.name}`}
                  className="w-full object-cover rounded-lg shadow-md 
                    h-56 sm:h-64 md:h-72 lg:h-80 xl:h-80
                    sm:w-[90%] md:w-[95%] lg:w-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Category;
