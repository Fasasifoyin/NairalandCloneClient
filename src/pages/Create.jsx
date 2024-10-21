import { useEffect, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import CreateHero from "../components/create/CreateHero";
import Tags from "../components/create/Tags";
import { Formik, Form } from "formik";
import FormikControl from "../components/formik/FormikControl";
import AddImage from "../components/create/AddImage";
import { toast } from "react-hot-toast";
import { createValidation } from "../components/formik/FormikValidation";

import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../app/actions/Blogs";
import { BlogStatus } from "../app/slice/CreateSlice";

const Create = () => {
  const dispatch = useDispatch();
  const status = useSelector(BlogStatus);

  const [tags, setTags] = useState([]);
  const [blogImages, setBlogImages] = useState(["", "", "", ""]);

  const initialValues = {
    title: "",
    body: "",
    images: [""],
  };

  const onSubmit = (values, { resetForm }) => {
    if (!tags.length) {
      return toast.error("Please select a tag");
    }

    const { title, body } = values;
    const filterImage = blogImages.filter((each) => each !== "");

    const formData = {
      title,
      body,
      images: filterImage,
      tags,
      resetForm,
    };

    dispatch(createBlog(formData));
  };

  useEffect(() => {
    if (status === "success") {
      setTags([]);
      setBlogImages(["", "", "", ""]);
    }
  }, [status]);

  return (
    <Box mt={"30px"}>
      <CreateHero header={"Create your blog"} />
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
                    isLoading={status === "pending"}
                  >
                    Create post
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default Create;
