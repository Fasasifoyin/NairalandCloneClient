import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Navbar from "../components/layouts/Navbar";
import CreateHero from "../components/create/CreateHero";
import Tags from "../components/create/Tags";
import { Formik, Form } from "formik";
import FormikControl from "../components/formik/FormikControl";
import AddImage from "../components/create/AddImage";
import { toast } from "react-hot-toast";
import { createValidation } from "../components/formik/FormikValidation";

import { useDispatch, useSelector } from "react-redux";
import { UserDetails } from "../app/Slice/UserSlice";
import { createBlog } from "../app/actions/Blogs";
import { BlogStatus } from "../app/slice/CreateSlice";
import Footer from "../components/layouts/Footer";

const Create = () => {
  const user = useSelector(UserDetails);
  const status = useSelector(BlogStatus);
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [blogImages, setBlogImages] = useState(["", "", "", ""]);

  const initialValues = {
    title: "",
    body: "",
    images: [""],
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
    };

    dispatch(createBlog(formData));
  };

  return (
    <Box>
      <Box mb={{ base: "20px", lg: "60px" }}>
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
      </Box>
      <Box className="cc-container page_alignment" mb={"100px"}>
        <CreateHero user={user} header={"Create your blog"} />
        <Tags setTags={setTags} tags={tags} />
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
                <Flex justify={"end"}>
                  <Button
                    isLoading={status === "pending"}
                    h={"60px"}
                    w={"180px"}
                    type="submit"
                    className="bg-green bg-hover-cream2 text-white text-hover-black"
                    borderRadius={"5px"}
                  >
                    <h5 className="btn-large-text">Create Blog</h5>
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Create;
