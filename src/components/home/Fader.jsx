import { useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  randomBlogs as Random,
  Status,
} from "../../app/slice/home/RandomBlogsSlice";
import { getRandomBlogs } from "../../app/actions/Blogs";

const Fader = () => {
  const dispatch = useDispatch();

  const randomBlogs = useSelector(Random);
  const randomBlogsStatus = useSelector(Status);

  useEffect(() => {
    if (randomBlogsStatus === "idle") {
      dispatch(getRandomBlogs(3));
    }
  }, [dispatch, randomBlogsStatus]);

  return (
    <Swiper
      modules={[A11y, Autoplay, EffectFade]}
      slidesPerView={1}
      effect={"fade"}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      speed={"1000"}
    >
      {randomBlogs.map((each) => (
        <SwiperSlide key={each._id}>
          <Link to={`/${each.slug}`}>
            <Box
              pos={"relative"}
              w={"100%"}
              h={{ lg: "37.44rem", md: "30rem" }}
            >
              <Image
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
                src={each.images[0]}
                alt="Image"
              />
              <Box
                w={"75%"}
                pos={"absolute"}
                bottom={"10%"}
                left={"50%"}
                transform={"translateX(-50%)"}
              >
                <h2
                  style={{
                    textAlign: "center",
                    textShadow: "0px 0px 5px rgb(0,0,0,0.2)",
                  }}
                  className="fw-bold text-white"
                >
                  {each.title.length > 70
                    ? `${each.title.slice(0, 67).trim()}...`
                    : each.title}
                </h2>
              </Box>
            </Box>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Fader;
