/* eslint-disable react/prop-types */
import { Box, Button, Flex } from "@chakra-ui/react";
import { MdOutlineCancel } from "react-icons/md";
import { tagsList } from "../../utils/Data";
import { GrFormAdd } from "react-icons/gr";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Tags = ({ setTags, tags, edit }) => {
  const addToTag = (value) => {
    if (tags.length >= 4) {
      return toast.error("Maximum of 4 tags");
    } else if (tags.includes(value)) {
      return toast.error("Tag included already");
    } else {
      setTags((prevValue) => [...prevValue, value]);
    }
  };

  const removeTag = (value, index) => {
    if(index === 0 && edit){
      toast.error("First Tag is niot allowed to be remove")
    }else{

      setTags(tags.filter((each) => each !== value));
    }
  };

  const [numberShown, setNumberShown] = useState(9);
  const length = tagsList.length;

  const increaseNumberShown = () => {
    const number = length - numberShown;
    setNumberShown(number < 9 ? numberShown + number : numberShown + 9);
  };

  const viewLess = () => {
    setNumberShown(9);
  };
  return (
    <Box mb={{ base: "40px", lg: "60px" }}>
      <h3 className="fw-medium" style={{ marginBottom: "10px" }}>
        Select Tags
      </h3>
      <Box
        p={"20px"}
        display={"flex"}
        mb={"20px"}
        gap={"20px"}
        flexWrap={"wrap"}
        alignItems={"center"}
        minH={{ base: "50px", lg: "66px" }}
        border={tags.length ? "2px solid #1B481D" : "1px solid #80A17B"}
        borderRadius={"5px"}
        // borderColor={tags.length && "#1B481D"}
      >
        {tags.length ? (
          tags.map((each, index) => (
            <Button
              color={"white"}
              rightIcon={
                <MdOutlineCancel size={20} onClick={() => removeTag(each, index)} />
              }
              h={{ base: "35px", lg: "45px" }}
              borderRadius={"5px"}
              bg={"#80A17B"}
              _hover={{ bg: "#80A17B" }}
              key={each}
            >
              <h5>{each}</h5>
            </Button>
          ))
        ) : (
          <h5>Maximum of 4 tags</h5>
        )}
      </Box>
      <Box mb={"20px"} p={"20px"} bg={"#F6F5EC"} borderRadius={"5px"}>
        <Flex gap={{ lg: "60px", base: "30px" }} flexWrap={"wrap"}>
          {tagsList.slice(0, numberShown).map((each) => (
            <Button
              onClick={() => addToTag(each)}
              rightIcon={<GrFormAdd size={30} />}
              key={each}
              bg={tags.includes(each) ? "#80A17B" : "#EDEFE4"}
              color={tags.includes(each) ? "white" : "#175616"}
              _hover={{
                bg: "#80A17B",
                color: "white",
              }}
            >
              <h4 className="fw-medium Xlarge-text">{each}</h4>
            </Button>
          ))}
        </Flex>
      </Box>
      <Box
        border="2px solid #1B481D"
        width={"max-content"}
        px={{ lg: "25px", base: "15px" }}
        py={{ lg: "17px", base: "12px" }}
        borderRadius={"10px"}
        className="cursor"
        onClick={numberShown === length ? viewLess : increaseNumberShown}
      >
        <p className="medium-text">{numberShown === length ? "View Less Tags" : "Show More Tags"}</p>
      </Box>
    </Box>
  );
};

export default Tags;
