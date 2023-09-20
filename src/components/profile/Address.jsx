/* eslint-disable react/prop-types */
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import FormikControl from "../formik/FormikControl";
import InfoBox from "./InfoBox";

import { useDispatch, useSelector } from "react-redux";
import { updateAddress } from "../../app/actions/User";
import { AddressStatus } from "../../app/slice/ProfileSlice";

const Address = ({ userProfile, user }) => {
  const dispatch = useDispatch();
  const status = useSelector(AddressStatus)
  const [edit, setEdit] = useState(false);

  const initialValues = {
    country: userProfile.country || "",
    state: userProfile.state || "",
    postalCode: userProfile.postalCode || "",
  };

  const onSubmit = (values) => {
    const body = { ...values, userName: userProfile.userName, setEdit };
    dispatch(updateAddress(body));
  };

  return (
    <Box>
      <Flex mb={"30px"} justify={"space-between"} align={"center"}>
        <h5 className="large-text fw-bold">Address information</h5>
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
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {() => (
          <Form>
            <SimpleGrid columns={{ base: 2, md: 3 }} gap={"30px"} mb={"30px"}>
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="country"
                    placeholder=""
                    type="text"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"Country"}
                  />
                </Box>
              ) : (
                <InfoBox title={"Country"} body={userProfile.country} />
              )}
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="state"
                    placeholder=""
                    type="text"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"State"}
                  />
                </Box>
              ) : (
                <InfoBox title={"State"} body={userProfile.state} />
              )}
              {edit ? (
                <Box>
                  <FormikControl
                    control="Input"
                    name="postalCode"
                    placeholder=""
                    type="number"
                    base={"35px"}
                    lg={"56px"}
                    defaultLabel
                    label={"Postal Code"}
                  />
                </Box>
              ) : (
                <InfoBox title={"Postal Code"} body={userProfile.postalCode} />
              )}
            </SimpleGrid>
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

export default Address;
