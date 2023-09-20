/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import InfoBox from "./InfoBox";
import { updateProfileValidation } from "../formik/FormikValidation";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../app/actions/User";
import { UpdateStatus } from "../../app/slice/ProfileSlice";

const Personal = ({ userProfile, user }) => {
  const status = useSelector(UpdateStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const initialValues = {
    firstName: userProfile.firstName || "",
    lastName: userProfile.lastName || "",
    userName: userProfile.userName || "",
    email: userProfile.email || "",
    phone: userProfile.phone || "",
    occupation: userProfile.occupation || "",
    about: userProfile.about || "",
  };

  const onSubmit = (values) => {
    const body = { ...values, user: userProfile.userName, setEdit, navigate };
    dispatch(updateProfile(body));
  };

  return (
    <Box>
      <Flex mb={"30px"} justify={"space-between"} align={"center"}>
        <h5 className="large-text fw-bold">Personal information</h5>
        {userProfile.userName === user.userName && (

        <Flex
          className="cursor"
          gap={"5px"}
          align={"center"}
          border={"1px solid #175616"}
          borderRadius={"20px"}
          padding={"5px 10px"}
          onClick={() => setEdit(!edit)}
        >
          {edit && <p>Clear</p>}
          {!edit && <p style={{ fontStyle: "italic" }}>Edit</p>}
          {!edit && <Icon as={AiFillEdit} />}
        </Flex>
        )}
      </Flex>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={updateProfileValidation}
      >
        {() => (
          <Form>
            <SimpleGrid columns={{ base: 2, md: 3 }} gap={"30px"} mb={"30px"}>
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="firstName"
                    placeholder=""
                    type="text"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"First Name"}
                  />
                </Box>
              ) : (
                <InfoBox title={"First Name"} body={userProfile.firstName} />
              )}
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="lastName"
                    placeholder=""
                    type="text"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"Last Name"}
                  />
                </Box>
              ) : (
                <InfoBox title={"Last Name"} body={userProfile.lastName} />
              )}
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="userName"
                    placeholder=""
                    type="text"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"User Name"}
                  />
                </Box>
              ) : (
                <InfoBox title={"User Name"} body={userProfile.userName} />
              )}
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="email"
                    placeholder=""
                    type="email"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"E-mail Address"}
                  />
                </Box>
              ) : (
                <InfoBox title={"E-mail Address"} body={userProfile.email} />
              )}
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="phone"
                    placeholder=""
                    type="number"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"Phone Number"}
                  />
                </Box>
              ) : (
                <InfoBox title={"Phone Number"} body={userProfile.phone} />
              )}
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="occupation"
                    placeholder=""
                    type="text"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"Occupation"}
                  />
                </Box>
              ) : (
                <InfoBox title={"Occupation"} body={userProfile.occupation} />
              )}
            </SimpleGrid>
            {edit ? (
              <Box mb={"30px"}>
                <FormikControl
                  control="Textarea"
                  name="about"
                  label={"About"}
                  defaultLabel
                  placeholder=""
                />
              </Box>
            ) : (
              <InfoBox title={"About"} body={userProfile.about} />
            )}
            {edit && (
              <Flex justify={"flex-end"}>
                <Button
                  isLoading={status === "pending"}
                  type="submit"
                  className="bg-green text-white"
                >
                  Edit Profile
                </Button>
              </Flex>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Personal;
