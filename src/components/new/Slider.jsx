import { useCallback, useEffect, useRef, useState } from "react";
import { newPageSlide } from "../../app/actions/Blogs";
import { Box, Button, Flex, Icon, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { Slides, Status } from "../../app/slice/new/NewSliderSlice";

const Slider = () => {
  const dispatch = useDispatch();

  const slides = useSelector(Slides);
  const status = useSelector(Status);

  const timerRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const goToNext = useCallback(() => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  }, [current, slides]);

  const goToPrevious = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(newPageSlide(3));
    }
  }, [dispatch, status]);

  return (
    <Box
      mb={"100px"}
      hideBelow={"lg"}
      w={"100%"}
      h={"590px"}
      className="skeleton"
    >
      <Box overflow={"hidden"} h={"100%"}>
        <Flex
          w={`${100 * slides.length}%`}
          transform={`translateX(${-(current * 33.33333333333333)}%)`}
          transition={`transform ease-out 1s`}
          h={"100%"}
        >
          {slides.map((each, index) => (
            <Box key={each._id} width={"100%"} pos={"relative"}>
              <Image
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
                src={each.images[0]}
                alt="Image"

              />
              <Box
                pos={"absolute"}
                w={"100%"}
                top={"50%"}
                transform={"translateY(-50%)"}
              >
                <Box className="page_alignment cc-container">
                  <Flex justify={"space-between"} align={"center"}>
                    <Flex width={"60%"} gap={"20px"} align={"center"}>
                      <Icon
                        boxShadow={"0px 0px 5px rgb(0,0,0,0.1)"}
                        onClick={goToPrevious}
                        color={"white"}
                        as={AiOutlineLeft}
                        boxSize={20}
                        className="cursor"
                      />
                      <Flex
                        direction={"column"}
                        gap={"10px"}
                        opacity={current === index ? 1 : 0}
                        transition={
                          current === index
                            ? "opacity ease-in-out 1.1s"
                            : "opacity ease-in-out 0.8s"
                        }
                      >
                        <h5 className="medium-text text-white shadow">
                          {each.tags[0]}
                        </h5>
                        <h3 className="text-white fw-bold shadow">
                          {" "}
                          {each.title.length > 50
                            ? `${each.title.slice(0, 50)}...`
                            : each.title}
                        </h3>
                        <Link to={`/${each.slug}`}>
                          <Button
                            className="bg-hover-green"
                            mt={"10px"}
                            color={"white"}
                            bg={"black"}
                          >
                            Read More
                          </Button>
                        </Link>
                      </Flex>
                    </Flex>
                    <Icon
                      boxShadow={"0px 0px 5px rgb(0,0,0,0.1)"}
                      onClick={() => goToNext()}
                      color={"white"}
                      as={AiOutlineRight}
                      boxSize={20}
                      className="cursor"
                    />
                  </Flex>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Slider;
