/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Image, SimpleGrid } from "@chakra-ui/react";
import { convertDate } from "../../utils/Date";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { useState } from "react";

const HeroSection = ({ blog }) => {
  const date = convertDate(blog.createdAt);

  const [index, setIndex] = useState(1);
  const number = index * 2000;

  return (
    <Box mb={"40px"}>
      <Box
        h={{ md: "600px", base: "350px" }}
        mb={{ base: "10px", md: "18px" }}
      >
        <Image
          w={"100%"}
          h={"100%"}
          objectFit={"cover"}
          src={blog.images[0]}
          borderRadius={"4px"}
          alt="Image"
        />
      </Box>
      <Box mb={{ base: "12px", md: "20px" }}>
        <h4
          style={{ textTransform: "uppercase" }}
          className="large-text fw-medium"
        >
          {date} / {blog.tags[0]}
        </h4>
      </Box>
      <Box mb={{ base: "12px", md: "20px" }}>
        <h3 className="fw-bold">{blog.title}</h3>
      </Box>

      <Box mb={{ base: "15px", md: "30px" }}>
        <p>
          {blog.body
            .slice(0, number)
            .trim()
            .split("\n\n")
            .map((paragraph, index) => (
              <span style={{ display: "block" }} key={index}>
                {paragraph
                  .split("\n")
                  .reduce((total, line, index) => [
                    total,
                    <br key={index} />,
                    line,
                  ])}
                {index ===
                  blog.body.slice(0, number).trim().split("\n\n").length -
                    1 && (
                  <span>
                    {number <= blog.body.length && (
                      <span
                        onClick={() => setIndex((prev) => prev + 1)}
                        className="text-green text-green-light-5-hover cursor"
                      >
                        ...Read More
                      </span>
                    )}
                    {number >= blog.body.length && blog.body.length > 2000 && (
                      <span
                        onClick={() => setIndex(1)}
                        className="text-green text-green-light-5-hover cursor"
                      >
                        {" "}
                        See less
                      </span>
                    )}
                  </span>
                )}
              </span>
            ))}
        </p>
      </Box>

      {blog.images.length > 1 && (
        <SimpleGrid
          mb={{ base: "15px", md: "30px" }}
          columns={{ base: 1, md: 2 }}
          gap={5}
        >
          {blog.images.slice(1, blog.images.length).map((each, index) => (
            <Box key={index} width={"100%"} h={"300px"}>
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
      >
        <Box>
          <span className="fw-bold small-text" style={{ textAlign: "center" }}>
            Tags:{" "}
          </span>
          {blog.tags.map((each, index) => (
            <span key={index} className="fw-bold small-text">
              {each}
              {index === blog.tags.length - 1 ? "." : ","}{" "}
            </span>
          ))}
        </Box>
        <Flex gap={"20px"}>
          <Link target="_blank" rel="noreferrer">
            <Icon color={"black"} as={BsFacebook} />
          </Link>
          <Link target="_blank" rel="noreferrer">
            <Icon color={"black"} as={BsFacebook} />
          </Link>
          <Link target="_blank" rel="noreferrer">
            <Icon color={"black"} as={BsFacebook} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default HeroSection;
