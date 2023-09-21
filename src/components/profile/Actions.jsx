/* eslint-disable react/prop-types */
import { Box, Button, Flex, Icon, SimpleGrid } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updatePassword } from "../../app/actions/User";
import { useState } from "react";
import ConfirmationModal from "../layouts/ConfirmationModal";
import { DeleteStatus, PasswordStatus } from "../../app/slice/ProfileSlice";
import { LOGOUT } from "../../app/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import { updatePasswordValidation } from "../formik/FormikValidation";

const Actions = ({ userProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteStatus = useSelector(DeleteStatus);
  const passwordStatus = useSelector(PasswordStatus);
  const [remove, setRemove] = useState(false);
  const [log, setLog] = useState(false);
  const [password, setPassword] = useState(false);

  const initialValues = {
    password: "",
    newPassword: "",
  };

  const deleteHelper = () => {
    dispatch(
      deleteUser({
        userName: userProfile.userName,
        dispatch,
        navigate,
        setRemove,
      })
    );
  };

  const loggingOut = () => {
    navigate("/");
    dispatch(LOGOUT());
    setLog(false);
  };

  const onSubmit = (values) => {
    const data = { ...values, userName: userProfile.userName, setPassword };
    dispatch(updatePassword(data));
  };

  return (
    <Box>
      <Flex  justify={"space-between"} align={"center"}>
        <Box>
          <h4
            onClick={() => setPassword(!password)}
            className="medium-text cursor text-green text-green-light-5-hover"
          >
            Change Password
          </h4>
        </Box>
        <Flex gap={"20px"} direction={{ base: "column", sm: "row" }}>
          <Flex
            gap={"5px"}
            align={"center"}
            border={"1px solid red"}
            padding={"10px 15px"}
            borderRadius={"20px"}
            className="bg-hover-red text-hover-white text-red cursor"
            onClick={() => setRemove(true)}
          >
            <Icon as={AiOutlineDelete} boxSize={6} />
            <p>Delete Account</p>
          </Flex>
          <Flex
            gap={"5px"}
            align={"center"}
            border={"1px solid black"}
            padding={"10px 15px"}
            borderRadius={"20px"}
            className="bg-hover-black text-hover-white cursor"
            onClick={() => setLog(true)}
          >
            <Icon as={MdLogout} boxSize={6} />
            <p>Log Out</p>
          </Flex>
        </Flex>
      </Flex>

      {password && (
        <Box mt={"30px"}>
          <Formik
            initialValues={initialValues}
            validationSchema={updatePasswordValidation}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  gap={"30px"}
                  mb={"30px"}
                >
                  <Box>
                    <FormikControl
                      control="Password"
                      name="password"
                      placeholder=""
                      base={"35px"}
                      lg={"56px"}
                      defaultLabel
                      label={"Password"}
                    />
                  </Box>
                  <Box>
                    <FormikControl
                      control="Password"
                      name="newPassword"
                      placeholder=""
                      base={"35px"}
                      lg={"56px"}
                      defaultLabel
                      label={"New Password"}
                    />
                  </Box>
                </SimpleGrid>
                <Flex justify={"flex-end"}>
                  <Button
                    isLoading={passwordStatus === "pending"}
                    type="submit"
                    className="bg-green text-white"
                  >
                    Update Password
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      )}
      {remove && (
        <ConfirmationModal
          actiontype={"Are you sure you want to delete your account"}
          warningNote={
            "Please note that this action is not reversible and your account will be deleted permanently"
          }
          buttonText={"Delete Account"}
          setFalse={setRemove}
          action={deleteHelper}
          status={deleteStatus}
        />
      )}
      {log && (
        <ConfirmationModal
          actiontype={"Are you sure you want to logout"}
          buttonText={"Log Out"}
          setFalse={setLog}
          action={loggingOut}
        />
      )}
    </Box>
  );
};

export default Actions;
