import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "../components/layouts/Navbar";
import CreateHero from "../components/create/CreateHero";
import Tags from "../components/create/Tags";
import FormikControl from "../components/formik/FormikControl";
import { Form, Formik } from "formik";
import { createValidation } from "../components/formik/FormikValidation";
import AddImage from "../components/create/AddImage";
import Footer from "../components/layouts/Footer";

import { useDispatch, useSelector } from "react-redux";
import { editBlog, getSingleBlog } from "../app/actions/Blogs";
import { Details, Status, Error } from "../app/slice//Detailed/DetailedSlice";
import { UserDetails } from "../app/slice/UserSlice";
import { toast } from "react-hot-toast";
import { EditStatus } from "../app/slice/CreateSlice";

const Edit = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(UserDetails);

  const blog = useSelector(Details);
  const status = useSelector(Status);
  const error = useSelector(Error);

  const [tags, setTags] = useState([]);
  const [blogImages, setBlogImages] = useState([]);

  const editStatus = useSelector(EditStatus);

  useEffect(() => {
    dispatch(getSingleBlog(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (status === "success") {
      setTags(blog.tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, status]);

  useEffect(() => {
    if (status === "success") {
      const length = blog.images.length;
      if (length === 1) {
        setBlogImages([...blog.images, "", "", ""]);
      } else if (length === 2) {
        setBlogImages([...blog.images, "", ""]);
      } else if (length === 3) {
        setBlogImages([...blog.images, ""]);
      } else {
        setBlogImages(blog.images);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, slug]);

  const initialValues = {
    title: blog?.title,
    body: blog?.body,
    images: blog?.images,
  };

  const onSubmit = (values) => {
    if (!tags.length) {
      return toast.error("Please select a tag");
    }

    const { title, body } = values;
    const filterImage = blogImages.filter((each) => each !== "");

    const formData = {
      title,
      body,
      filterImage,
      tags,
      blogId: blog._id,
      navigate,
    };
    dispatch(editBlog(formData));
    // console.log(formData);
  };

  return (
    <Box>
      {/* <Box mb={{ base: "20px", lg: "60px" }}>
        <Navbar
          text={"black"}
          activeText={"#175616"}
          hover={"#175616"}
          buttonBg={"#175616"}
          buttonColor={"white"}
          btnHover={"cream2"}
          btnColorHover={"green"}
          logoutBg={"none"}
          logoutColor={"#175616"}
          logoutHoverBorder={"#175616"}
        />
      </Box> */}
      <Box className="cc-container page_alignment" mb={"100px"}>
        <CreateHero user={user} header={"Edit Blog"} />
        <Box>
          {status === "pending" && <p>Loading...</p>}
          {status === "failed" && <p>{error}</p>}
        </Box>
        {status === "success" && (
          <Box>
            <Tags setTags={setTags} tags={tags} edit />
            <Box>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={createValidation}
              >
                {() => (
                  <Form>
                    <Box mb={{ base: "40px", lg: "60px" }}>
                      <FormikControl
                        placeholder="Enter Title"
                        control="Input"
                        name="title"
                        label="Title"
                        base={"50px"}
                        lg={"70px"}
                      />
                    </Box>
                    <Box mb={{ base: "40px", lg: "60px" }}>
                      <FormikControl
                        placeholder="Enter Story"
                        control="Textarea"
                        name="body"
                        label="Story"
                      />
                    </Box>
                    <Box mb={{ base: "40px", lg: "60px" }}>
                      <AddImage
                        setBlogImages={setBlogImages}
                        blogImages={blogImages}
                        name="images"
                      />
                    </Box>
                    <Flex justify={"end"} >
                      <Button
                        isLoading={editStatus === "pending"}
                        h={"60px"}
                        w={"180px"}
                        type="submit"
                        className="bg-green bg-hover-cream2 text-white text-hover-black"
                        borderRadius={"5px"}
                      >
                        <h5 className="btn-large-text">Edit Blog</h5>
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Edit;
