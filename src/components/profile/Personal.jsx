/* eslint-disable react/prop-types */
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import InfoBox from "./InfoBox";
import { updateProfileValidation } from "../formik/FormikValidation";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../app/actions/User";
import { UpdateStatus } from "../../app/slice/ProfileSlice";

const Personal = ({ userProfile, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(UpdateStatus);

  const initialValues = {
    firstName: userProfile.firstName || "",
    lastName: userProfile.lastName || "",
    userName: userProfile.userName || "",
    email: userProfile.email || "",
    phone: userProfile.phone || "",
    occupation: userProfile.occupation || "",
    about: userProfile.about || "",
    country: userProfile.country || "",
    state: userProfile.state || "",
    postalCode: userProfile.postalCode || "",
  };

  const onSubmit = (values) => {
    const body = { ...values, user: userProfile.userName, navigate };
    dispatch(updateProfile(body));
  };

  return (
    <Box className="cc-container page-alignment" mt={"60px"}>
      <Text className="fw-bold medium-text">Personal Information</Text>
      <Box mt={"15px"}>
        {userProfile.userName === user.userName ? (
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={updateProfileValidation}
          >
            {() => (
              <Form>
                <SimpleGrid columns={{ base: 2, md: 3 }} gap={"30px"}>
                  <FormikControl
                    control="Input"
                    name="firstName"
                    type="text"
                    defaultLabel
                    label={"First Name"}
                  />
                  <FormikControl
                    control="Input"
                    name="lastName"
                    type="text"
                    defaultLabel
                    label={"Last Name"}
                  />
                  <FormikControl
                    control="Input"
                    name="userName"
                    type="text"
                    defaultLabel
                    label={"User Name"}
                  />
                  <FormikControl
                    control="Input"
                    name="email"
                    type="email"
                    defaultLabel
                    label={"E-mail"}
                  />
                  <FormikControl
                    control="Input"
                    name="phone"
                    type="number"
                    defaultLabel
                    label={"Phone Number"}
                  />
                  <FormikControl
                    control="Input"
                    name="occupation"
                    type="text"
                    defaultLabel
                    label={"Occupation"}
                  />
                  <FormikControl
                    control="Input"
                    name="country"
                    type="text"
                    defaultLabel
                    label={"Country"}
                  />
                  <FormikControl
                    control="Input"
                    name="state"
                    type="text"
                    defaultLabel
                    label={"State"}
                  />
                  <FormikControl
                    control="Input"
                    name="postalCode"
                    type="number"
                    defaultLabel
                    label={"Postal Code"}
                  />
                </SimpleGrid>
                <Button isLoading={status === "pending"} type="submit" mt={"30px"} bg={"green"} color={"white"}>
                  Edit profile
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <SimpleGrid columns={{ base: 2, md: 3 }} gap={"30px"}>
            <InfoBox title={"First Name"} body={userProfile.firstName} />
            <InfoBox title={"Last Name"} body={userProfile.lastName} />
            <InfoBox title={"User Name"} body={userProfile.userName} />
            <InfoBox title={"Email address"} body={userProfile.email} />
            <InfoBox title={"Phone"} body={userProfile.phone} />
            <InfoBox title={"Occupation"} body={userProfile.occupation} />
            <InfoBox title={"Country"} body={userProfile.country} />
            <InfoBox title={"State"} body={userProfile.state} />
            <InfoBox title={"Postal Code"} body={userProfile.postalCode} />
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default Personal;
