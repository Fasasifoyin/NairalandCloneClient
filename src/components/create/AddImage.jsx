import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Field, FieldArray } from "formik";
import { convertImageToBase64 } from "../../utils/Convert";
import { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const AddImage = ({ name, setBlogImages, blogImages }) => {
  const [imageNumber, setImageNumber] = useState(-1);

  const onUpload = async (e) => {
    if (e.target.files[0].size > 7168) {
      e.target.value = null;
      return toast.error("Image cannot be larger than 7MB");
    }
    const base64 = await convertImageToBase64(e.target.files[0]);
    console.log(e.target.files[0]);
    setBlogImages((currentArray) =>
      currentArray.map((each, index) => (index === imageNumber ? base64 : each))
    );
  };

  const removeImage = (indexNumber) => {
    setBlogImages((currentArray) =>
      currentArray.filter((each, index) => index !== indexNumber)
    );
    setBlogImages((currentArray) => [...currentArray, ""]);
  };

  const validateImages = (value) => {
    let error;
    if (!value) {
      error = "Select an image";
    }
    return error;
  };

  return (
    <FieldArray name={name}>
      {({
        push,
        remove,
        form: {
          values: { images },
        },
      }) => (
        <Box>
          <h3 className="fw-medium" style={{ marginBottom: "10px" }}>
            Upload Image
          </h3>
          <Flex w={"100%"} justify={"flex-end"}>
            <Button
              bg={"#175616"}
              _hover={{
                background: "#175616",
              }}
              color={"white"}
              isDisabled={images.length === 4}
              onClick={() => push("")}
              type="button"
              rightIcon={<HiOutlineCamera size={25} />}
            >
              Add Image
            </Button>
          </Flex>
          <SimpleGrid
            mt={"25px"}
            spacing={"20px"}
            columns={{ base: 1, md: 2, lg: 4 }}
          >
            {images.map((each, index) => (
              <Flex
                h={{ md: "390px" }}
                justify={{ lg: "space-between" }}
                direction={"column"}
                key={index}
              >
                <Box>
                  <Field name={`images[${index}]`} validate={validateImages}>
                    {({ field, meta, form }) => {
                      return (
                        <FormControl isInvalid={meta.error && meta.touched}>
                          <FormLabel
                            onClick={() => setImageNumber(index)}
                            className="cursor"
                            htmlFor={field.name}
                          >
                            <Box
                              height={{ base: "280px", md: "320px" }}
                              border={"1px solid black"}
                            >
                              <Image
                                objectFit={"cover"}
                                src={
                                  blogImages[index] ||
                                  "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690571372/Nairaland/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector_xso7re.jpg"
                                }
                                w={"100%"}
                                h={"100%"}
                                alt="post-image"
                              />
                            </Box>
                          </FormLabel>
                          <Input
                            type="file"
                            onChange={(e) => {
                              onUpload(e);
                              form.setFieldValue(
                                `images[${index}]`,
                                e.target.value
                              );
                            }}
                            accept="image/png, image/jpeg"
                            name={field.name}
                            id={field.name}
                            display={"none"}
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      );
                    }}
                  </Field>
                </Box>
                <Flex justify={"center"}>
                  {index > 0 && (
                    <Button
                      type="button"
                      bg={"red"}
                      _hover={{
                        background: "red",
                      }}
                      color={"white"}
                      onClick={() => {
                        remove(index);
                        removeImage(index);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </FieldArray>
  );
};

export default AddImage;
