import { useEffect } from "react";
import { Box, Button, Flex, FormControl, Icon, Input } from "@chakra-ui/react";
import Logo from "./Logo";
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoTwitter,
  BiLogoLinkedin,
} from "react-icons/bi";
import { Formik, Form, Field } from "formik";
import { AiOutlineHeart } from "react-icons/ai";
import { tagsList } from "../../utils/Data";
import { Link } from "react-router-dom";
import FooterLatest from "./FooterLatest";

import { useDispatch, useSelector } from "react-redux";
import { UserDetails } from "../../app/slice/UserSlice";
import { Status, allFooterBlogsId } from "../../app/slice/FooterSlice";
import { getFooter } from "../../app/actions/Blogs";

const Footer = () => {
  const dispatch = useDispatch();
  const user = useSelector(UserDetails);
  const blogs = useSelector(allFooterBlogsId);
  const status = useSelector(Status);
  const initialBlog = ["", "", ""];

  useEffect(() => {
    if (status === "idle") {
      dispatch(getFooter(3));
    }
  }, [status, dispatch]);

  const initialValues = {
    email: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box>
      <Box hideBelow={"lg"} pt={"5.5rem"} pb={"10px"} bg={"black"}>
        <Box className="cc-container page_alignment">
          <Box mb={"80px"}>
            <Flex gap={"2%"} justify={"space-between"}>
              <Box width={"16.2%"}>
                <Flex direction={"column"} gap={"20px"}>
                  <Logo color={"#175616"} fs={"logo-text"} />
                  <h5 className="medium-text text-white">
                    Nairaland is Africa’s largest discussion forum and Nigeria’s
                    most popular website for the latest news across Africa,
                    Created by Oluwaseun Osewa.
                  </h5>
                </Flex>
              </Box>
              <Box width={"19.8%"}>
                <Flex direction={"column"} gap={"20px"}>
                  <h5 className="text-white medium-text">LATEST POSTS</h5>
                  <Flex direction={"column"} gap={"10px"}>
                    {(blogs.length ? blogs : initialBlog).map((each, index) => (
                      <FooterLatest key={index} each={each} />
                    ))}
                  </Flex>
                </Flex>
              </Box>
              <Box width={"25%"}>
                <Flex direction={"column"} gap={"20px"}>
                  <h5 className="text-white medium-text">CATEGORIES</h5>
                  <Flex flexWrap={"wrap"} gap={"7px"}>
                    {tagsList.map((each, index) => (
                      <Link to={`/tag/${each}`} key={index}>
                        <Box
                          className="bg-white text-green bg-hover-green text-hover-white"
                          p={"5px"}
                        >
                          <h6 className="tiny-text">{each}</h6>
                        </Box>
                      </Link>
                    ))}
                  </Flex>
                </Flex>
              </Box>
              <Box width={"31%"}>
                <Flex direction={"column"} gap={"20px"}>
                  <h5 className="text-white medium-text">NEWSLETTER</h5>
                  <h6
                    className="small-text"
                    style={{ color: "rgb(255,255,255,0.8)" }}
                  >
                    Subscribe to our newsletter to get unfiltered access to the
                    latest information all across Africa
                  </h6>
                  {user.token ? (
                    <Flex gap={"10px"} justify={"end"}>
                      <Button
                        borderRadius={"5px"}
                        className="bg-white text-green bg-hover-green text-hover-white"
                      >
                        <h4 className="medium-text">Subscribe</h4>
                      </Button>
                    </Flex>
                  ) : (
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      {() => (
                        <Form>
                          <Field name="email">
                            {({ field }) => (
                              <FormControl>
                                <Flex justify={"space-between"}>
                                  <Box width={"70%"}>
                                    <Input
                                      {...field}
                                      height={"55px"}
                                      borderRadius={0}
                                      border={"none"}
                                      borderBottom={"1px solid white"}
                                      color={"white"}
                                      focusBorderColor={"none"}
                                      placeholder="YOUR E-MAIL"
                                      _placeholder={{
                                        color: "rgb(255,255,255, 0.8)",
                                      }}
                                      className="footer_input"
                                      type="email"
                                      required
                                    />
                                  </Box>
                                  <Box width={"28%"}>
                                    <Button
                                      type="submit"
                                      className="bg-white text-green bg-hover-green text-hover-white"
                                      borderRadius={"0px"}
                                      w={"100%"}
                                      h={"55px"}
                                    >
                                      <p>Subscribe</p>
                                    </Button>
                                  </Box>
                                </Flex>
                              </FormControl>
                            )}
                          </Field>
                        </Form>
                      )}
                    </Formik>
                  )}
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box>
            <Flex
              mb={"20px"}
              pos={"relative"}
              h={"28.28px"}
              align={"center"}
              justify={"center"}
            >
              <Box border={"1px solid white"} w={"100%"} />
              <Box
                className="rotate"
                bg={"white"}
                width={"20px"}
                h={"20px"}
                pos={"absolute"}
                left={"50%"}
                top={"11px"}
                transform={"translateX(-50%)"}
              />
            </Flex>
            <Flex justify={"center"} gap={3} align={"center"}>
              <h6 className="small-text text-white">Thanks for the visit</h6>
              <Flex align={"center"} gap={2}>
                <Icon color={"white"} as={AiOutlineHeart} boxSize={5} />
                <Logo color={"white"} fs={"small-text"} />
              </Flex>
            </Flex>
            <h6
              style={{ textAlign: "center" }}
              className="small-text text-white"
            >
              Copyright &copy; 2005 - 2023 Oluwaseun Osewa. All Rights Reserved
            </h6>
            <h6
              style={{ textAlign: "center" }}
              className="small-text text-white"
            >
              <span className="small-text fw-bold text-white">Disclaimer</span>:
              Every Nairaland member is solely responsible for anything that
              he/she posts or uploads on Nairaland.
            </h6>
          </Box>{" "}
        </Box>
      </Box>
      <Flex
        direction={"column"}
        align={"center"}
        hideFrom={"lg"}
        bg={"black"}
        p={"40px 0px 60px 0px"}
        textAlign={"center"}
        gap={"30px"}
      >
        <Flex gap={6}>
          <Box
            display={"grid"}
            placeItems={"center"}
            width={"35px"}
            h={"35px"}
            borderRadius={"50%"}
            bg={"white"}
          >
            <Icon color={"black"} as={BiLogoFacebook} boxSize={6} />
          </Box>
          <Box
            display={"grid"}
            placeItems={"center"}
            width={"35px"}
            h={"35px"}
            borderRadius={"50%"}
            bg={"white"}
          >
            <Icon color={"black"} as={BiLogoInstagram} boxSize={6} />
          </Box>
          <Box
            display={"grid"}
            placeItems={"center"}
            width={"35px"}
            h={"35px"}
            borderRadius={"50%"}
            bg={"white"}
          >
            <Icon color={"black"} as={BiLogoTwitter} boxSize={6} />
          </Box>
          <Box
            display={"grid"}
            placeItems={"center"}
            width={"35px"}
            h={"35px"}
            borderRadius={"50%"}
            bg={"white"}
          >
            <Icon color={"black"} as={BiLogoLinkedin} boxSize={6} />
          </Box>
        </Flex>
        <Box>
          <h4 className="text-white large-text">+234 9036748844</h4>
          <h4 className="text-white large-text">Help@Nairaland.com</h4>
        </Box>
        <Box>
          <h5 className="text-white medium-text">
            &copy; 2023 Nairaland. All rights reserved
          </h5>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
