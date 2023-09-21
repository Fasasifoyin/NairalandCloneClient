import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "../components/layouts/Navbar";
import Search from "../components/Detailed/Search";
import HeroSection from "../components/Detailed/HeroSection";
import Bloggger from "../components/Detailed/Bloggger";
import RelatedPost from "../components/Detailed/RelatedPost";
import Latest from "../components/Detailed/Latest";
import Categories from "../components/Detailed/Categories";
import { tagsList } from "../utils/Data";
import DetailedForm from "../components/Detailed/DetailedForm";
import Footer from "../components/layouts/Footer";
import Comment from "../components/Detailed/Comment";
import useDidMountEffect from "../hooks/useDidMountEffect";

import { useDispatch, useSelector } from "react-redux";
import { Details, Status, Error } from "../app/slice//Detailed/DetailedSlice";
import {
  getDetailedLatest,
  getDetailedRelated,
  getSingleProduct,
} from "../app/actions/Blogs";
import { createComment, getComments } from "../app/actions/Comment";
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

const check = (array, id, number) => {
  const first = array.slice(0).filter((each) => each !== id);
  const second = first.slice(0, number);
  return second;
};

const DetailedPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector(UserDetails);

  const blog = useSelector(Details);
  const status = useSelector(Status);
  const error = useSelector(Error);

  const initialRelated = useSelector(allDetailedRelatedId);
  const [related, setRelated] = useState([]);
  const relatedStatus = useSelector(RelatedStatus);

  const initialLatest = useSelector(allDetailedLatestId);
  const [latest, setLatest] = useState([]);
  const latestSkeleton = ["", "", "", ""];

  const [categories, setCategories] = useState([]);

  const comments = useSelector(allCommentIds);
  const commentStatus = useSelector(CommentStatus);
  const totalComments = useSelector(TotalComments);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setLatest([]);
    setRelated([]);
    setIndex(0);
    dispatch(setEmpty([]));
  }, [slug, dispatch]);

  useEffect(() => {
    dispatch(getSingleProduct(slug));
  }, [dispatch, slug]);

  useDidMountEffect(
    () => {
      if (status === "success") {
        const tags = blog.tags.join(",");
        dispatch(getDetailedRelated({ page: 1, tags }));
      }
    },
    blog._id,
    status,
    dispatch
  );

  useDidMountEffect(
    () => {
      if (status === "success") {
        dispatch(getDetailedLatest(5));
      }
    },
    status,
    dispatch
  );

  useDidMountEffect(
    () => {
      if (status === "success") {
        dispatch(getComments({ blogId: blog._id, index }));
      }
    },
    blog._id,
    status,
    dispatch,
    index
  );

  useEffect(() => {
    setCategories(
      [...tagsList].sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 8)
    );
  }, [slug]);

  useDidMountEffect(() => {
    setLatest(check(initialLatest, blog._id, 4));
  }, initialLatest);

  useDidMountEffect(() => {
    setRelated(check(initialRelated, blog._id, 5));
  }, initialRelated);

  useDidMountEffect(() => {
    if (error === "Blog not found") {
      dispatch(getDetailedLatest(5));
    }
  }, error);

  const initialValues = {
    comment: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    const { comment } = values;
    const form = { comment, blogId: blog._id };
    if (user.token) {
      dispatch(createComment(form));
      onSubmitProps.resetForm();
    } else {
      navigate("/signin", { state: { from: location } });
    }
  };

  const checkMore = Boolean(totalComments > comments.length);
  const [reply, setReply] = useState(-1);
  const [seeComments, setSeeComments] = useState(-1);

  return (
    <Box>
      <Box className="bg-cream" mb={"60px"}>
        <Navbar
          text={"black"}
          hover={"#175616"}
          buttonBg={"#175616"}
          buttonColor={"white"}
          btnHover={"white"}
          btnColorHover={"green"}
          logoutBg={"none"}
          logoutColor={"#175616"}
          logoutHoverBorder={"#175616"}
        />
      </Box>
      <Box mb={"100px"} className="page_alignment cc-container">
        <Flex
          mb={"40px"}
          direction={{ base: "column", lg: "row" }}
          justify={
            blog?.title || status === "failed" ? "space-between" : "flex-end"
          }
        >
          <Box width={{ base: "100%", lg: "67%" }}>
            <Box mb={"30px"}>
              {status === "pending" && <p>Loading...</p>}
              {status === "failed" && <p>{error}</p>}
              {status === "success" && (
                <Box>
                  <HeroSection blog={blog} />
                  <Bloggger user={blog.author} />
                  {relatedStatus === "success" && (
                    <Box>
                      <Box mb={"20px"}>
                        <h4 className="medium-text fw-bold">
                          POSTS YOU MIGHT LIKE
                        </h4>
                      </Box>
                      {related.length ? (
                        <Box className="relatedScroller snaps scrollbody">
                          {related.map((each) => (
                            <RelatedPost key={each} each={each} />
                          ))}
                        </Box>
                      ) : (
                        <p className="large-text fw-bold">No related post</p>
                      )}
                      <Box border={"1px solid #175616"} mt={"30px"} />
                    </Box>
                  )}
                </Box>
              )}
            </Box>
            <Box hideFrom={"lg"} mb={"30px"}>
              <h4
                style={{ marginBottom: "20px" }}
                className="medium-text fw-medium"
              >
                Latest Posts
              </h4>
              <Box className="scroller scrollbody snaps">
                {(latest.length ? latest : latestSkeleton).map(
                  (each, index) => (
                    <Latest latest={each} key={index} />
                  )
                )}
              </Box>
            </Box>
            <Box hideFrom={"lg"} mb={"30px"}>
              <Categories categories={categories} />
            </Box>
            {status === "success" && (
              <Box>
                <DetailedForm
                  onSubmit={onSubmit}
                  initialValues={initialValues}
                />
              </Box>
            )}
          </Box>
          <Box width={{ base: "100%", lg: "25%" }}>
            <Search />
            <Box hideBelow={"lg"} mb={"150px"}>
              <h4
                style={{ marginBottom: "20px" }}
                className="medium-text fw-medium"
              >
                Latest Posts
              </h4>
              <Box className="scroller">
                {(latest.length ? latest : latestSkeleton).map(
                  (each, index) => (
                    <Latest latest={each} key={index} />
                  )
                )}
              </Box>
            </Box>
            <Box hideBelow={"lg"}>
              <Categories categories={categories} />
            </Box>
          </Box>
        </Flex>
        {status === "success" && (
          <Box>
            <Flex mb={"10px"} direction={"column"} gap={"20px"}>
              {comments.length
                ? comments.map((each, index) => (
                    <Comment
                      key={each}
                      each={each}
                      index={index}
                      reply={reply}
                      setReply={setReply}
                      seeComments={seeComments}
                      setSeeComments={setSeeComments}
                      blogId={blog._id}
                    />
                  ))
                : commentStatus === "success" && <p>No Comment</p>}
            </Flex>
            {commentStatus === "pending" && <p>Loading...</p>}
            {checkMore && commentStatus === "success" && (
              <Button onClick={() => setIndex(comments.length)}>
                Read More
              </Button>
            )}
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default DetailedPage;
