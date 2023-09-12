/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Image, SimpleGrid } from "@chakra-ui/react";
import { convertDate } from "../../utils/Date";
import { Link, useNavigate } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";

const HeroSection = ({ blog }) => {
  const date = convertDate(blog.createdAt);
  const navigate = useNavigate();

  return (
    <Box mb={"40px"}>
      <Box
        onClick={() => navigate(`/blog/edit/${blog.slug}`)}
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
        <p>{blog.body}</p>
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
