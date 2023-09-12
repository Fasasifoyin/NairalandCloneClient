/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { randomTagsId } from "../../app/slice/home/RandomTagsSlice";

const RandomTags = ({ tagsId }) => {
  const tag = useSelector((state) => randomTagsId(state, tagsId));

  return (
    <Box>
      <Box
        position={"relative"}
        hideBelow={"lg"}
        h={"350px"}
        className="skeleton"
      >
        <Image
          w={"100%"}
          h={"100%"}
          src={tag?.related[0]?.images[0]}
          objectFit={"cover"}
          alt="Image"
        />
        <Box
          pos={"absolute"}
          bottom={"5%"}
          left={"50%"}
          transform={"translateX(-50%)"}
          w={"80%"}
        >
          <Box h={"50px"} className="skeleton_2">
            {tag && (
              <Link to={`/tag/${tag?.tag}`}>
                <Box
                  className={"bg-black bg-hover-green"}
                  h={"100%"}
                  borderRadius={"5px"}
                  display={"grid"}
                  placeItems={"center"}
                >
                  <h4 className="text-white large-text">{tag?.tag}</h4>
                </Box>
              </Link>
            )}
          </Box>
        </Box>
      </Box>
      <Flex
        hideFrom={"lg"}
        align={"center"}
        justify={"space-between"}
        p={"20px"}
        h={"50px"}
        className={tag ? "bg-green" : "skeleton"}
      >
        <h4 className="text-white large-text">
          {tag?.tag.length > 15 ? `${tag?.tag.slice(0, 16)}...` : tag?.tag}
        </h4>
        {tag?.tag && (
          <Link to={`/tag/${tag?.tag}`}>
            <Icon color={"white"} as={AiOutlineRight} boxSize={7} />
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default RandomTags;
