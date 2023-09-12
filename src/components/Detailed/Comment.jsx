/* eslint-disable react/prop-types */
import { Box, Flex, Icon, Image } from "@chakra-ui/react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsReply } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import ChildCommentForm from "./ChildCommentForm";
import ChildComments from "./ChildComments";
// import ChildCommentModal from "./ChildCommentModal";
// import LikesModal from "./LikesModal";

import { useDispatch, useSelector } from "react-redux";
import { commentId } from "../../app/slice/Detailed/CommentSlice";
import { UserDetails } from "../../app/slice/UserSlice";
import {
  likeComment as Like,
  createChildComment,
  deleteComment,
} from "../../app/actions/Comment";
import { toast } from "react-hot-toast";
import { Timeago } from "../../utils/Timeago";

const Comment = ({
  each,
  index,
  slugg,
  reply,
  setReply,
  seeComments,
  setSeeComments,
  blogId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comment = useSelector((state) => commentId(state, each));
  const user = useSelector(UserDetails);
  const time = Timeago(comment.createdAt);
  // const [viewChildComments, setViewChildComments] = useState(-1);
  // const [viewLikes, setViewLikes] = useState(-1);

  const likeComment = (userId, commentId) => {
    if (userId) {
      dispatch(Like(commentId));
    } else {
      navigate(`/signin?redirect=/${slugg}`);
    }
  };

  const initialValues = {
    childComment: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    if (user.token) {
      const { childComment } = values;
      const form = { childComment, commentId: comment._id };
      onSubmitProps.resetForm();
      // setReply(-1);
      dispatch(createChildComment(form));
    } else {
      toast.error("Not a user");
    }
  };

  const deleteCom = () => {
    if (user.token) {
      dispatch(deleteComment({ commentId: comment._id, blogId }));
    } else {
      toast.error("Not a user");
    }
  };

  const openReply = (index) => {
    if (index === reply) {
      setReply(-1);
    } else {
      setSeeComments(-1);
      setReply(index);
    }
  };

  const openSeeComments = (index) => {
    if (index === seeComments) {
      setSeeComments(-1);
    } else {
      setReply(-1);
      setSeeComments(index);
    }
  };

  return (
    <Box borderRadius={"5px"} bg={index % 2 === 0 ? "#E8ECE0" : "#F6F6EC"}>
      <Flex p={"10px"} justify={"space-between"} align={"center"}>
        <Box
          w={{ base: "50px", md: "70px" }}
          h={{ base: "50px", md: "70px" }}
          borderRadius={"50%"}
        >
          <Image
            w={"100%"}
            h={"100%"}
            borderRadius={"50%"}
            objectFit={"cover"}
            src={comment.creator.image}
            alt={comment.creator.firstName}
          />
        </Box>
        <Flex
          direction={"column"}
          gap={"5px"}
          w={{ base: "calc(98% - 50px)", md: "calc(98% - 70px)" }}
        >
          <Flex gap={"5px"}>
            <p>{comment.creator.firstName}</p>
            <p>{time}</p>
          </Flex>

          <h4 className="medium-text">{comment.comment}</h4>
          <Flex align={"center"} columns={3} gap={{ base: "50px", md: "80px" }}>
            <Flex align={"center"} gap={"5px"}>
              <Icon
                onClick={() => openReply(index)}
                className="cursor"
                as={BsReply}
                boxSize={5}
              />
            </Flex>
            <Flex align={"center"} gap={"5px"}>
              <Icon
                boxSize={4}
                onClick={() => openSeeComments(index)}
                // onClick={() => setViewChildComments(index)}
                className="cursor"
                as={FaRegComment}
              />
              <h6 className="small-text">{comment.childComments.length}</h6>
            </Flex>
            <Flex align={"center"} gap={"5px"}>
              <Icon
                boxSize={4}
                className="cursor"
                as={
                  comment.likes.includes(user._id)
                    ? AiFillHeart
                    : AiOutlineHeart
                }
                onClick={() => likeComment(user._id, comment._id)}
              />
              <h6 className="small-text">{comment.likes.length}</h6>
            </Flex>
            <Flex align={"center"} gap={"5px"}>
              <Icon
                _hover={{ color: "red" }}
                className="cursor"
                as={MdOutlineDeleteOutline}
                boxSize={5}
                onClick={deleteCom}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg={index % 2 === 0 ? "#F6F6EC" : "#E8ECE0"}
        justify={"flex-end"}
        className={reply === index ? "open" : "close"}
        borderBottomRadius={"5px"}
      >
        <ChildCommentForm
          reply={reply}
          index={index}
          onSubmit={onSubmit}
          initialValues={initialValues}
        />
      </Flex>
      <Flex
        justify={"flex-end"}
        className={seeComments === index ? "open" : "close"}
      >
        <ChildComments
          id={comment._id}
          child={comment.childComments}
          index={index}
          seeComments={seeComments}
          user={user}
          blogId={blogId}
        />
      </Flex>

      {/* <ChildCommentModal
        Comment={comment.comment} 
        id={comment._id}
        image={comment.creator.image}
        User={comment.creator.firstName}
        child={comment.childComments}
        view={viewChildComments}
        setView={setViewChildComments}
        index={index}
      /> */}
      {/* <LikesModal
        child={comment.likes}
        view={viewLikes}
        setView={setViewLikes}
        index={index}
      /> */}
    </Box>
  );
};

export default Comment;
