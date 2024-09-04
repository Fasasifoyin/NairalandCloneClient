/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineDelete,
} from "react-icons/ai";
import { LuLoader2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { BsReply } from "react-icons/bs";
import ChildCommentForm from "./ChildCommentForm";
import ChildComments from "./ChildComments";

import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCommentStatus,
  LikeStatus,
  commentId,
  setEmpty,
} from "../../app/slice/Detailed/CommentSlice";
import {
  likeComment as Like,
  deleteComment as Delete,
} from "../../app/actions/Comment";
import { Timeago } from "../../utils/Timeago";

const Comment = ({
  commentid,
  index,
  auth,
  blogId,
  likeId,
  setLikeId,
  deleteId,
  setDeleteId,
}) => {
  const comment = useSelector((state) => commentId(state, commentid));
  const time = Timeago(comment.createdAt);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const likeStatus = useSelector(LikeStatus);
  const deleteStatus = useSelector(DeleteCommentStatus);

  const [showChildComments, setShowChildComments] = useState(false);
  const [showChildReply, setShowChildReply] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const showComments = () => {
    setShowChildComments(!showChildComments);
    setShowChildReply(false);
  };

  const showReply = () => {
    setShowChildReply(!showChildReply);
    setShowChildComments(false);
  };

  const likeComment = (commentId) => {
    if (auth.token) {
      setLikeId(commentId);
      dispatch(Like(commentId));
    } else {
      dispatch(setEmpty([]));
      navigate("/signin", { state: { from: location } });
    }
  };

  const deleteComment = (commentId, blogId) => {
    if (auth.token) {
      setDeleteId(commentId);
      dispatch(Delete({ commentId, blogId }));
    } else {
      dispatch(setEmpty([]));
      navigate("/signin", { state: { from: location } });
    }
  };


  return (
    <Box
      borderRadius={"5px"}
      bg={index % 2 === 0 ? "#E8ECE0" : "#F6F6EC"}
      p={"10px"}
    >
      <Flex gap={"10px"}>
        <Box width={"40px"} h={"40px"} borderRadius={"50%"}>
          <Image
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            objectFit={"cover"}
            src={
              comment?.creator?.image ||
              "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690553303/Nairaland/default_avatar_cxfqgl.jpg"
            }
            alt={comment?.creator?.firstName || "Unknown"}
          />
        </Box>
        <Box flex={1}>
          <Text className="tiny-text fw-bold">
            {auth.userName === comment?.creator?.userName
              ? "You"
              : comment?.creator?.firstName
              ? comment.creator?.firstName
              : "Unknown"}{" "}
            <Text as={"span"} className="tiny-text fw-regular">
              {time}
            </Text>
          </Text>
          <Text className="small-text" wordBreak={"break-word"}>
            {comment?.comment}
          </Text>
          <Flex gap={"30px"} mt={"5px"} align={"center"}>
            <Icon
              className="cursor"
              as={BsReply}
              boxSize={"22px"}
              onClick={showReply}
            />
            <Flex
              gap={"5px"}
              align={"center"}
              onClick={showComments}
              className="cursor"
            >
              <Icon as={AiOutlineComment} boxSize={5} />
              <Text className="small-text">{comment.childComments.length}</Text>
            </Flex>
            <Flex gap={"5px"} align={"center"}>
              {likeStatus === "pending" && likeId === comment._id ? (
                <Icon as={LuLoader2} boxSize={5} />
              ) : (
                <Icon
                  onClick={() => likeComment(comment._id)}
                  className="cursor"
                  as={
                    comment.likes.includes(auth._id)
                      ? AiFillHeart
                      : AiOutlineHeart
                  }
                  boxSize={5}
                />
              )}
              <Text className="small-text">{comment.likes.length}</Text>
            </Flex>
            {comment?.creator?._id === auth?._id &&
              (deleteStatus === "pending" && deleteId === comment?._id ? (
                <Icon as={LuLoader2} boxSize={5} />
              ) : showDelete ? (
                <Flex gap={"15px"}>
                  <Text
                    className="tiny-text text-red cursor"
                    onClick={() => deleteComment(comment?._id, blogId)}
                  >
                    Confirm
                  </Text>
                  <Text
                    className="tiny-text cursor"
                    onClick={() => setShowDelete(false)}
                  >
                    Cancel
                  </Text>
                </Flex>
              ) : (
                <Icon
                  className="cursor"
                  as={AiOutlineDelete}
                  boxSize={5}
                  onClick={() => setShowDelete(true)}
                />
              ))}
          </Flex>
        </Box>
      </Flex>
      {showChildReply && (
        <ChildCommentForm commentId={comment._id} auth={auth} />
      )}
      {showChildComments && (
        <ChildComments
          data={comment.childComments}
          auth={auth}
          commentId={comment._id}
          blogId={blogId}
        />
      )}
    </Box>
  );
};

export default Comment;
