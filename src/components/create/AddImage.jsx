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
  Text,
} from "@chakra-ui/react";
import { Field, FieldArray } from "formik";
import { convertImageToBase64 } from "../../utils/Convert";
import { HiOutlineCamera } from "react-icons/hi";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const AddImage = ({ name, setBlogImages, blogImages }) => {
  const onUpload = async (e, index) => {
    if (e.target.files[0].size > 1000000) {
      e.target.value = null;
      return toast.error("Image cannot be larger than 1MB");
    }
    const base64 = await convertImageToBase64(e.target.files[0]);
    setBlogImages((prev) =>
      prev.map((each, i) => (index === i ? base64 : each))
    );
  };

  const removeImage = (indexNumber) => {
    setBlogImages((prev) => prev.filter((_, index) => index !== indexNumber));
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
          <Flex mb={"8px"} justifyContent={"space-between"}>
            <Text className="medium-text fw-bold">Upload Image</Text>
            <Button
              rightIcon={<HiOutlineCamera size={15} />}
              size={"sm"}
              className="bg-green text-white"
              isDisabled={images.length === 4}
              onClick={() => {
                push("");
                setBlogImages((prev) => [...prev, ""]);
              }}
              type="button"
            >
              Add Image
            </Button>
          </Flex>
          <SimpleGrid spacing={"20px"} columns={{ base: 1, md: 2, lg: 4 }}>
            {images.map((_, index) => (
              <Box key={index}>
                <Field name={`images[${index}]`} validate={validateImages}>
                  {({ field, meta, form }) => (
                    <FormControl isInvalid={meta.error && meta.touched}>
                      <FormLabel htmlFor={field.name} className="cursor" m={0}>
                        <Box height={"280px"} border={"1px solid black"}>
                          <Image
                            width={"100%"}
                            h={"100%"}
                            objectFit={"cover"}
                            alt="Image"
                            src={
                              blogImages[index] ||
                              "https://res.cloudinary.com/dbxvk3apv/image/upload/v1690571372/Nairaland/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector_xso7re.jpg"
                            }
                          />
                        </Box>
                      </FormLabel>
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        name={field.name}
                        id={field.name}
                        display={"none"}
                        onChange={(e) => {
                          onUpload(e, index);
                          form.setFieldValue(
                            `images[${index}]`,
                            e.target.value
                          );
                        }}
                      />
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {index > 0 && (
                  <Flex justifyContent={"center"}>
                    <Button
                      type="button"
                      size={"sm"}
                      bg={"red"}
                      _hover={{
                        background: "red",
                      }}
                      color={"white"}
                      mt={"5px"}
                      onClick={() => {
                        remove();
                        removeImage(index);
                      }}
                    >
                      Remove image
                    </Button>
                  </Flex>
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </FieldArray>
  );
};

export default AddImage;
