/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { convertDate } from "../../utils/Date";
import { FaFacebookF, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const HeroSection = ({ blog }) => {
  const date = convertDate(blog?.createdAt);

  const [index, setIndex] = useState(1);
  const number = index * 2000;

  return (
    <Box>
      <Text className="fw-bold Xlarge-text">{blog?.title}</Text>
      <Text className="small-text fw-bold" color={"rgb(0, 0, 0, 0.3)"}>
        {date} / {blog?.tags[0]}
      </Text>
      <Box
        mt={"20px"}
        h={{ md: "400px", base: "350px" }}
        w={{ base: "100%", md: "80%" }}
      >
        <Image
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          src={blog?.images[0]}
          borderRadius={"4px"}
          alt="Image"
        />
      </Box>
      <Text mt={"10px"} wordBreak={"break-word"}>
        {blog.body
          .slice(0, number)
          .trim()
          .split("\n\n")
          .map((paragraph, index) => (
            <Text as={"span"} style={{ display: "block" }} key={index}>
              {paragraph
                .split("\n")
                .reduce((total, line, index) => [
                  total,
                  <br key={index} />,
                  line,
                ])}
              {index ===
                blog.body.slice(0, number).trim().split("\n\n").length - 1 && (
                <Text as={"span"}>
                  {number <= blog.body.length && (
                    <Text
                      as={"span"}
                      onClick={() => setIndex((prev) => prev + 1)}
                      className="text-green text-green-light-5-hover cursor"
                    >
                      ...Read More
                    </Text>
                  )}
                  {number >= blog.body.length && blog.body.length > 2000 && (
                    <Text
                      as={"span"}
                      onClick={() => setIndex(1)}
                      className="text-green text-green-light-5-hover cursor"
                    >
                      {" "}
                      See less
                    </Text>
                  )}
                </Text>
              )}
            </Text>
          ))}
      </Text>
      {blog.images.length > 1 && (
        <SimpleGrid mt={"20px"} columns={{ base: 2, md: 3 }} gap={5}>
          {blog.images.slice(1, blog.images.length).map((each, index) => (
            <Box key={index} width={"100%"} h={"150px"}>
              <Image
                w={"100%"}
                h={"100%"}
                objectFit={"cover"}
                src={each}
                borderRadius={"4px"}
                alt="Image"
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify={"space-between"}
        align={"center"}
        gap={"10px"}
        mt={"15px"}
      >
        <Text className="fw-bold">
          Tags:{" "}
          {blog.tags.map((each, index) => (
            <Text as={"span"} key={index} className="fw-bold small-text">
              {each}
              {index === blog.tags.length - 1 ? "." : ","}{" "}
            </Text>
          ))}
        </Text>
        <Flex align={"center"} gap={"5px"}>
          <Text>Share:</Text>
          <Flex gap={"15px"}>
            <FacebookShareButton
              url={`http://localhost:5173/${blog?.slug}`}
              title={blog?.title}
            >
              <Icon as={FaFacebookF} boxSize={3} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`http://localhost:5173/${blog?.slug}`}
              title={blog?.title}
            >
              <Icon as={FaXTwitter} boxSize={3} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`http://localhost:5173/${blog?.slug}`}
              title={blog?.title}
            >
              <Icon as={FaWhatsapp} boxSize={3} />
            </WhatsappShareButton>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeroSection;
