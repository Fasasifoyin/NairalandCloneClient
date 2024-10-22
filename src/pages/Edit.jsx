import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CreateHero from "../components/create/CreateHero";
import Tags from "../components/create/Tags";
import FormikControl from "../components/formik/FormikControl";
import { Form, Formik } from "formik";
import { createValidation } from "../components/formik/FormikValidation";
import AddImage from "../components/create/AddImage";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { editBlog, getSingleBlog } from "../app/actions/Blogs";
import { Details, Status, Error } from "../app/slice//Detailed/DetailedSlice";
import { BlogStatus } from "../app/slice/CreateSlice";

const Edit = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = useSelector(Details);
  const status = useSelector(Status);
  const error = useSelector(Error);

  const editStatus = useSelector(BlogStatus);

  const [tags, setTags] = useState([]);
  const [blogImages, setBlogImages] = useState([""]);

  const initialValues = {
    title: blog?.title || "",
    body: blog?.body || "",
    images: blog?.images || [""],
  };

  const onSubmit = (values, { resetForm }) => {
    if (!tags.length) {
      return toast.error("Please select a tag");
    }

    const { title, body } = values;

    const formData = {
      title,
      body,
      images: blogImages,
      tags,
      blogId: blog._id,
      resetForm,
      navigate
    };

    dispatch(editBlog(formData))
  };

  useEffect(() => {
    dispatch(getSingleBlog(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    if (blog?.tags && status === "success") {
      setTags(blog.tags);
      setBlogImages(blog.images);
    }
  }, [blog, status]);

  return (
    <Box mt={"30px"}>
      {status === "pending" && <Text textAlign={"center"}>Loading</Text>}
      {status === "failed" && <Text textAlign={"center"}>{error}</Text>}
      {status === "success" && (
        <Box>
          <CreateHero header={"Edit your blog"} />
          <Box className="cc-container page-alignment">
            <Tags tags={tags} setTags={setTags} />
            <Box mt={"30px"}>
              <Formik
                initialValues={initialValues}
                validationSchema={createValidation}
                onSubmit={onSubmit}
              >
                {() => (
                  <Form>
                    <Flex direction={"column"} gap={"30px"}>
                      <FormikControl
                        placeholder="Enter Title"
                        control="Input"
                        name="title"
                        label="Title"
                      />
                      <FormikControl
                        placeholder="Enter Story"
                        control="Textarea"
                        name="body"
                        label="Story"
                      />
                      <AddImage
                        setBlogImages={setBlogImages}
                        blogImages={blogImages}
                        name="images"
                      />
                      <Button
                        width={"max-content"}
                        size={"md"}
                        className="bg-green text-white"
                        type="submit"
                        isLoading={editStatus === "pending"}
                      >
                        Edit post
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Edit;
