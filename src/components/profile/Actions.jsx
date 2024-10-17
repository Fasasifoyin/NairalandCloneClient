/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import FormikControl from "../formik/FormikControl";
import { updatePasswordValidation } from "../formik/FormikValidation";
import ConfirmationModal from "../layouts/ConfirmationModal";

import { deleteUser, updatePassword } from "../../app/actions/User";
import { DeleteStatus, UpdateStatus } from "../../app/slice/ProfileSlice";
import { LOGOUT } from "../../app/slice/UserSlice";
import { setEmpty } from "../../app/slice/Detailed/CommentSlice";

const Actions = ({ userProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector(UpdateStatus);
  const [password, setPassword] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const loggingOut = () => {
    dispatch(LOGOUT());
    dispatch(setEmpty([]));
    navigate("/");
  };

  const onSubmit = (values) => {
    const data = { ...values, userName: userProfile.userName };
    dispatch(updatePassword(data));
  };

  useEffect(() => {
    if (status === "success") {
      setPassword(false);
    }
  }, [status]);

  // const deleteStatus = useSelector(DeleteStatus);
  // const [remove, setRemove] = useState(false);
  // const [log, setLog] = useState(false);

  // const deleteHelper = () => {
  //   dispatch(
  //     deleteUser({
  //       userName: userProfile.userName,
  //       dispatch,
  //       navigate,
  //       setRemove,
  //     })
  //   );
  // };


  return (
    <Box className="cc-container page-alignment" mt={"120px"}>
      <Flex
        justify={"space-between"}
        alignItems={"center"}
        direction={{ base: "column-reverse", md: "row" }}
        gap={{ base: "20px", md: 0 }}
      >
        <Text
          className="text-green cursor"
          onClick={() => setPassword(!password)}
        >
          Change password
        </Text>
        <Flex gap={"20px"}>
          <Button
            onClick={loggingOut}
            size={"sm"}
            className="bg-green text-white"
            width={"140px"}
          >
            Log out
          </Button>
          <Button size={"sm"} bg={"red"} color={"white"} width={"140px"}>
            Delete account
          </Button>
        </Flex>
      </Flex>
      {password && (
        <Box mt={"40px"}>
          <Formik
            initialValues={initialValues}
            validationSchema={updatePasswordValidation}
            onSubmit={onSubmit}
          >
            {() => (
              <Form>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={"30px"}>
                  <FormikControl
                    control="Password"
                    name="oldPassword"
                    placeholder="Enter old password"
                  />
                  <FormikControl
                    control="Password"
                    name="newPassword"
                    placeholder="Enter new password"
                  />
                  <FormikControl
                    control="Password"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                  />
                </SimpleGrid>
                <Button
                  size={"sm"}
                  className="bg-green text-white"
                  mt={"20px"}
                  type="submit"
                  isLoading={status === "pending"}
                >
                  Change password
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      )}
    </Box>
    // <Box mb={{ base: "50px", lg: "70px" }}>
    //   <Flex justify={"space-between"} align={"center"}>
    //     <Box>
    //       <h4
    //         onClick={() => setPassword(!password)}
    //         className="medium-text cursor text-green text-green-light-5-hover"
    //       >
    //         Change Password
    //       </h4>
    //     </Box>
    //     <Flex gap={"20px"} direction={{ base: "column", sm: "row" }}>
    //       <Flex
    //         gap={"5px"}
    //         align={"center"}
    //         border={"1px solid red"}
    //         padding={"10px 15px"}
    //         borderRadius={"20px"}
    //         className="bg-hover-red text-hover-white text-red cursor"
    //         onClick={() => setRemove(true)}
    //       >
    //         <Icon as={AiOutlineDelete} boxSize={6} />
    //         <p>Delete Account</p>
    //       </Flex>
    //       <Flex
    //         gap={"5px"}
    //         align={"center"}
    //         border={"1px solid black"}
    //         padding={"10px 15px"}
    //         borderRadius={"20px"}
    //         className="bg-hover-black text-hover-white cursor"
    //         onClick={() => setLog(true)}
    //       >
    //         <Icon as={MdLogout} boxSize={6} />
    //         <p>Log Out</p>
    //       </Flex>
    //     </Flex>
    //   </Flex>

    //   {password && (
    //     <Box mt={"30px"}>
    //       <Formik
    // validationSchema={updatePasswordValidation}
    //         onSubmit={onSubmit}
    //       >
    //         {() => (
    //           <Form>
    //             <SimpleGrid
    //               columns={{ base: 1, md: 2 }}
    //               gap={"30px"}
    //               mb={"30px"}
    //             >
    //               <Box>
    // <FormikControl
    //   control="Password"
    //   name="password"
    //   placeholder=""
    //   base={"35px"}
    //   lg={"56px"}
    //   defaultLabel
    //   label={"Password"}
    // />
    //               </Box>
    //               <Box>
    //                 <FormikControl
    //                   control="Password"
    //                   name="newPassword"
    //                   placeholder=""
    //                   base={"35px"}
    //                   lg={"56px"}
    //                   defaultLabel
    //                   label={"New Password"}
    //                 />
    //               </Box>
    //             </SimpleGrid>
    //             <Flex justify={"flex-end"}>
    //               <Button
    //                 isLoading={passwordStatus === "pending"}
    //                 type="submit"
    //                 className="bg-green text-white"
    //               >
    //                 Update Password
    //               </Button>
    //             </Flex>
    //           </Form>
    //         )}
    //       </Formik>
    //     </Box>
    //   )}
    //   {remove && (
    //     <ConfirmationModal
    //       actiontype={"Are you sure you want to delete your account"}
    //       warningNote={
    //         "Please note that this action is not reversible and your account will be deleted permanently"
    //       }
    //       buttonText={"Delete Account"}
    //       setFalse={setRemove}
    //       action={deleteHelper}
    //       status={deleteStatus}
    //     />
    //   )}
    //   {log && (
    //     <ConfirmationModal
    //       actiontype={"Are you sure you want to logout"}
    //       buttonText={"Log Out"}
    //       setFalse={setLog}
    //       action={loggingOut}
    //     />
    //   )}
    // </Box>
  );
};

export default Actions;
