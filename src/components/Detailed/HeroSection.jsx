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
  const paragraphs = blog.body.split(/\n\n/);
  const date = convertDate(blog?.createdAt);

  const [index, setIndex] = useState(15);
  // const number = index * 2000;

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
      <Box mt={"20px"}>
        {paragraphs.slice(0, index).map((paragraph, index) => (
          <Text textAlign={"justify"} key={index} mt={"7px"}>
            {paragraph}
          </Text>
        ))}
        {paragraphs.length > index && (
          <Text
            color={"blue"}
            className="cursor fw-bold"
            onClick={() => setIndex((prev) => prev + 10)}
          >
            See more
          </Text>
        )}
      </Box>
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
              url={`https://nairaland-clone-client.vercel.app/${blog?.slug}`}
              title={blog?.title}
            >
              <Icon as={FaFacebookF} boxSize={3} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://nairaland-clone-client.vercel.app/${blog?.slug}`}
              title={blog?.title}
            >
              <Icon as={FaXTwitter} boxSize={3} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`https://nairaland-clone-client.vercel.app/${blog?.slug}`}
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
