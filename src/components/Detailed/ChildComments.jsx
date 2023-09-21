/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

import { useDispatch } from "react-redux";
import {
  deleteChildComment,
  likeChildComment,
} from "../../app/actions/Comment";
import { Timeago } from "../../utils/Timeago";

const ChildComments = ({ index, seeComments, id, child, user, blogId }) => {
  const dispatch = useDispatch();

  const like = (childCommentId) => {
    if (user.token) {
      dispatch(likeChildComment({ commentId: id, childCommentId }));
    } else {
      toast.error("Not a user");
    }
  };

  const deleteCom = (childCommentId) => {
    if (user.token) {
      dispatch(deleteChildComment({ commentId: id, childCommentId, blogId }));
    } else {
      toast.error("Not a user");
    }
  };

  // const increaseNumberShown = () => {
  //   const number = length - numberShown;
  //   setNumberShown(number < 9 ? numberShown + number : numberShown + 9);
  // };

  return (
    <Box
      className={seeComments === index ? "seen" : "not-seen"}
      m={"10px 10px 10px 0px"}
      w={{ base: "calc(98% - 70px)", md: "calc(98% - 90px)" }}
    >
      <Flex direction={"column"} gap={"20px"}>
        {child.length ? (
          child
            .map((each) => (
              <Flex key={each._id} justify={"space-between"}>
                <Box
                  w={{ base: "30px", md: "40px" }}
                  h={{ base: "30px", md: "40px" }}
                  borderRadius={"50%"}
                >
                  <Image
                    w={"100%"}
                    h={"100%"}
                    objectFit={"cover"}
                    src={
                      each?.creator?.image ||
                      "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg"
                    }
                    borderRadius={"50%"}
                    alt={each?.creator?.userName || "Unknown"}
                  />
                </Box>
                <Box w={{ base: "calc(99% - 30px)", lg: "calc(99% - 40px)" }}>
                  <Flex gap={"3px"}>
                    <h6 className="small-text">{each?.creator?.firstName || "Unknown"}</h6>
                    <h6 className="small-text">{Timeago(each.createdAt)}</h6>
                  </Flex>
                  <p>{each.comment}</p>
                  <Flex mt={"3px"} gap={"50px"}>
                    <Flex gap={"5px"} align={"center"}>
                      <Icon
                        className="cursor"
                        onClick={() => like(each._id)}
                        boxSize={3}
                        as={
                          each.likes.includes(user._id)
                            ? AiFillHeart
                            : AiOutlineHeart
                        }
                      />
                      <h6 className="tiny-text">{each.likes.length}</h6>
                    </Flex>

                    <Icon
                      boxSize={4}
                      _hover={{ color: "red" }}
                      as={MdOutlineDeleteOutline}
                      className="cursor"
                      onClick={() => deleteCom(each._id)}
                    />
                  </Flex>
                </Box>
              </Flex>
            ))
            .reverse()
        ) : (
          <h4>No comment</h4>
        )}
      </Flex>
    </Box>
  );
};

export default ChildComments;
