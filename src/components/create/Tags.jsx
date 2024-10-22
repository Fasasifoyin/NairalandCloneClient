/* eslint-disable react/prop-types */
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";
import { tagsList } from "../../utils/Data";
import { GrFormAdd } from "react-icons/gr";
import { toast } from "react-hot-toast";

const Tags = ({ setTags, tags }) => {
  const addToTag = (value) => {
    if (tags.includes(value)) {
      return toast.error("Tag included already");
    } else if (tags.length >= 4) {
      return toast.error("Maximum of 4 tags");
    } else {
      setTags((prevValue) => [...prevValue, value]);
    }
  };

  const removeTag = (value) => {
    setTags(tags.filter((each) => each !== value));
  };

  return (
    <Box mt={"40px"}>
      <Text className="medium-text fw-bold" mb={"8px"}>
        Select Tags
      </Text>
      <Flex
        px={"15px"}
        gap={"20px"}
        flexWrap={"wrap"}
        alignItems={"center"}
        border={tags.length ? "2px solid #1B481D" : "1px solid #80A17B"}
        borderRadius={"5px"}
        minH={"50px"}
      >
        {tags.length ? (
          tags.map((each, index) => (
            <Button
              key={index}
              size={"sm"}
              className="bg-green text-white"
              rightIcon={
                <MdOutlineCancel size={15} onClick={() => removeTag(each)} />
              }
            >
              {each}
            </Button>
          ))
        ) : (
          <Text>Maximum of 4 tags</Text>
        )}
      </Flex>
      <Box mt={"15px"} p={"15px"} className="bg-cream" borderRadius={"5px"}>
        <Flex gap={"30px"} flexWrap={"wrap"}>
          {tagsList.map((each) => (
            <Button
              className={
                tags.includes(each.name)
                  ? "bg-green text-white"
                  : "bg-cream2 bg-hover-green text-hover-white"
              }
              size={"xs"}
              key={each.id}
              rightIcon={<GrFormAdd size={15} />}
              onClick={() => addToTag(each.name)}
            >
              {each.name}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Tags;
