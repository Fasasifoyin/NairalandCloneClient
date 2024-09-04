/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { AiOutlineHeart, AiOutlineDelete, AiFillHeart } from "react-icons/ai";
import { Timeago } from "../../utils/Timeago";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteChildComment,
  likeChildComment,
} from "../../app/actions/Comment";
import { LuLoader2 } from "react-icons/lu";
import {
  DeleteChildCommentStatus,
  LikeChildCommentStatus,
  setEmpty,
} from "../../app/slice/Detailed/CommentSlice";

const ChildComments = ({ data, auth, commentId, blogId }) => {
  const sortedData = data
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log(auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(-1);
  const [deleteId, setDeleteId] = useState(-1);
  const [likeId, setLikeId] = useState(-1);

  const deleteStatus = useSelector(DeleteChildCommentStatus);
  const likeStatus = useSelector(LikeChildCommentStatus);

  const deleteComment = (commentId, childCommentId, blogId) => {
    if (auth.token) {
      setDeleteId(childCommentId);
      dispatch(deleteChildComment({ commentId, childCommentId, blogId }));
    } else {
      dispatch(setEmpty([]));
      navigate("/signin", { state: { from: location } });
    }
  };

  const likeComment = (commentId, childCommentId, blogId) => {
    if (auth.token) {
      setLikeId(childCommentId);
      dispatch(likeChildComment({ commentId, childCommentId, blogId }));
    } else {
      dispatch(setEmpty([]));
      navigate("/signin", { state: { from: location } });
    }
  };

  return (
    <Flex justifyContent={"flex-end"} mt={"25px"}>
      <Flex width={"calc(100% - 50px)"} direction={"column"} gap={"20px"}>
        {data.length ? (
          sortedData.map((each) => (
            <Flex key={each._id} gap={"5px"}>
              <Box width={"25px"} h={"25px"} borderRadius={"50%"}>
                <Image
                  w={"100%"}
                  h={"100%"}
                  borderRadius={"50%"}
                  objectFit={"cover"}
                  src={
                    each?.creator?.image ||
                    "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg"
                  }
                  alt={each?.creator?.firstName || "Unknown"}
                />
              </Box>
              <Box flex={1}>
                <Text className="tiny-text fw-bold">
                  {auth.userName === each?.creator?.userName
                    ? "You"
                    : each?.creator?.firstName
                    ? each.creator?.firstName
                    : "Unknown"}{" "}
                  <Text as={"span"} className="tiny-text fw-regular">
                    {Timeago(each.createdAt)}
                  </Text>
                </Text>
                <Text className="tiny-text" wordBreak={"break-word"}>
                  {each.comment}
                </Text>
                <Flex gap={"20px"} align={"center"} mt={"4px"}>
                  <Flex gap={"3px"} align={"center"}>
                    {likeStatus === "pending" && likeId === each._id ? (
                      <Icon as={LuLoader2} boxSize={4} />
                    ) : (
                      <Icon
                        className="cursor"
                        as={
                          each.likes.includes(auth._id)
                            ? AiFillHeart
                            : AiOutlineHeart
                        }
                        boxSize={4}
                        onClick={() => likeComment(commentId, each._id, blogId)}
                      />
                    )}

                    <Text className="tiny-text">{each.likes.length}</Text>
                  </Flex>
                  {each.creator.userName === auth.userName &&
                    (deleteStatus === "pending" && deleteId === each._id ? (
                      <Icon as={LuLoader2} boxSize={4} />
                    ) : showDelete === each._id ? (
                      <Flex gap={"15px"}>
                        <Text
                          className="tiny-text text-red cursor"
                          onClick={() =>
                            deleteComment(commentId, each._id, blogId)
                          }
                        >
                          Confirm
                        </Text>
                        <Text
                          className="tiny-text cursor"
                          onClick={() => setShowDelete(-1)}
                        >
                          Cancel
                        </Text>
                      </Flex>
                    ) : (
                      <Icon
                        className="cursor"
                        as={AiOutlineDelete}
                        boxSize={4}
                        onClick={() => setShowDelete(each._id)}
                      />
                    ))}
                </Flex>
              </Box>
            </Flex>
          ))
        ) : (
          <Text className="tiny-text">No comment</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ChildComments;
