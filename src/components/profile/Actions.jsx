/* eslint-disable react/prop-types */
import { Box, Flex, Icon } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../app/actions/User";
import { useEffect, useState } from "react";
import ConfirmationModal from "../layouts/ConfirmationModal";
import { DeleteStatus } from "../../app/slice/ProfileSlice";
import { LOGOUT } from "../../app/slice/UserSlice";
import { useNavigate } from "react-router-dom";
import useDidMountEffect from "../../hooks/useDidMountEffect";

const Actions = ({ userProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const deleteStatus = useSelector(DeleteStatus);
  const [remove, setRemove] = useState(false);
  const [log, setLog] = useState(false);

  const deleteHelper = () => {
    dispatch(deleteUser(userProfile.userName));
  };

  const loggingOut = () => {
    dispatch(LOGOUT());
    navigate("/");
    setLog(false);
  };

  useEffect(() => {
    if (deleteStatus === "success" || deleteStatus === "failed") {
      setRemove(false);
    }
  }, [deleteStatus]);

  useDidMountEffect(() => {
    if (deleteStatus === "success") {
      loggingOut();
    }
  }, deleteStatus);

  return (
    <Box>
      <Flex justify={"space-between"} align={"center"}>
        <Box></Box>
        <Flex gap={"20px"}>
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
