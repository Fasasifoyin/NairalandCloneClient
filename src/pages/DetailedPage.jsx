/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/react";
import HeroSection from "../components/Detailed/HeroSection";
import Bloggger from "../components/Detailed/Bloggger";
import RelatedPost from "../components/Detailed/RelatedPost";
import Latest from "../components/Detailed/Latest";
import Comment from "../components/Detailed/Comment";
import { useElementHeightContext } from "../hooks/useElementHeightContext";

import { useDispatch, useSelector } from "react-redux";
import { Details, Status, Error } from "../app/slice//Detailed/DetailedSlice";
import {
  getDetailedLatest,
  getDetailedRelated,
  getSingleBlog,
} from "../app/actions/Blogs";
import { getComments } from "../app/actions/Comment";
import {
  allDetailedRelatedId,
  Status as RelatedStatus,
} from "../app/slice/Detailed/DetailedRelated";
import { allDetailedLatestId } from "../app/slice//Detailed/DetailedLatest";
import {
  allCommentIds,
  setEmpty,
  Status as CommentStatus,
  TotalComments,
} from "../app/slice/Detailed/CommentSlice";
import { UserDetails } from "../app/slice/UserSlice";
import SendComments from "../components/Detailed/SendComments";

const DetailedPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const elementHeight = useElementHeightContext();

  const user = useSelector(UserDetails);

  const blog = useSelector(Details);
  const status = useSelector(Status);
  const error = useSelector(Error);

  const related = useSelector(allDetailedRelatedId);
  const relatedStatus = useSelector(RelatedStatus);

  const comments = useSelector(allCommentIds);
  const commentStatus = useSelector(CommentStatus);
  const totalComments = useSelector(TotalComments);
  const [likeId, setLikeId] = useState(-1);
  const [deleteId, setDeleteId] = useState(-1);

  useEffect(() => {
    dispatch(getSingleBlog(slug)).then((action) => {
      if (action.type === getSingleBlog.fulfilled.type) {
        const { tags, _id } = action.payload;
        if (tags) {
          dispatch(getDetailedRelated({ tags: tags.join(",") }));
        }
        if (_id) {
          dispatch(getComments({ blogId: _id, length: 0 }));
        }
      }
    });

    return () => {
      dispatch(setEmpty([]));
    };
  }, [dispatch, slug]);

  useEffect(() => {
    if (blog && blog.slug === slug) {
      dispatch(getComments({ blogId: blog._id, length: comments.length }));
    }
  }, [dispatch, page]);

  return (
    <Box className="cc-container page-alignment" mt={"30px"}>
      <Flex w={"100%"} justifyContent={"space-between"} position={"relative"}>
        <Box width={{ base: "100%", lg: "60%" }}>
          {status === "pending" && <Text>Loading...</Text>}
          {status === "failed" && <Text>{error}</Text>}
          {status === "success" && (
            <>
              <HeroSection blog={blog} />
              <Bloggger blogger={blog.author} userName={user.userName} />
              {relatedStatus === "success" && (
                <Box mt={"15px"}>
                  <Text className="fw-bold" mb={"20px"}>
                    POSTS YOU MIGHT LIKE
                  </Text>
                  {related.length > 0 ? (
                    <Box className="relatedScroller snaps scrollbody">
                      {related
                        .filter((each) => each !== blog._id)
                        .map((each) => (
                          <RelatedPost key={each} each={each} />
                        ))}
                    </Box>
                  ) : (
                    <Text className="small-text">No related post</Text>
                  )}
                  <Box border={"1px solid #175616"} mt={"15px"} />
                </Box>
              )}
              <SendComments blogId={blog._id} auth={user.token} />
            </>
          )}
        </Box>
        {/* latest begin */}
        <Box
          hideBelow={"lg"}
          h={"min-content"}
          width={"30%"}
          border={"1px solid blue"}
          position={"sticky"}
          top={`${elementHeight}px`}
          right={0}
        ></Box>
        {/* latest end */}
      </Flex>
      {status === "success" && (
        <Box mt={"30px"}>
          <Text className="fw-bold">
            Comments {commentStatus === "success" && `(${totalComments})`}
          </Text>
          {comments?.length ? (
            <Flex mt={"10px"} direction={"column"} gap={"20px"}>
              {comments?.map((each, index) => (
                <Comment
                  key={each}
                  commentid={each}
                  index={index}
                  auth={user}
                  blogId={blog._id}
                  likeId={likeId}
                  setLikeId={setLikeId}
                  deleteId={deleteId}
                  setDeleteId={setDeleteId}
                />
              ))}
            </Flex>
          ) : (
            commentStatus === "success" && <Text mt={"10px"}>No comment</Text>
          )}
          {commentStatus === "pending" && (
            <Text mt={"10px"}>Loading comments...</Text>
          )}
          {comments.length < totalComments && commentStatus === "success" && (
            <Text
              className="cursor"
              mt={"10px"}
              onClick={() => setPage((prev) => prev + 1)}
            >
              See more comments
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DetailedPage;
