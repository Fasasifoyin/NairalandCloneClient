// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import { Box, Flex, Icon, Image, Input } from "@chakra-ui/react";
// import Modal from "../layouts/Modal";
// import { IoIosSend } from "react-icons/io";
// import { MdFullscreenExit } from "react-icons/md";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import TailSpinn from "../../utils/TailSpin";
// import useElementHeight from "../../hooks/useElementHeight";
// import useScrollPosition from "../../hooks/useScrollPosition";

// import { useDispatch, useSelector } from "react-redux";
// import { UserDetails } from "../../app/Slice/UserSlice";
// import { createChildComment, likeChildComment } from "../../app/actions/Blogs";
// import { ChildCommentStatus } from "../../app/slice/Detailed/CommentSlice";
// import { toast } from "react-hot-toast";

// const ChildCommentModal = ({
//   view,
//   index,
//   child,
//   setView,
//   Comment,
//   image,
//   User,
//   id,
// }) => {
//   const dispatch = useDispatch();
//   const user = useSelector(UserDetails);
//   const [childComment, setChildComment] = useState("");
//   const status = useSelector(ChildCommentStatus);

//   const { elementRef, elementHeight } = useElementHeight();
//   const { myElementRef, positionTop } = useScrollPosition();
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     if (elementHeight + 23 <= positionTop) {
//       setVisible(false);
//     } else {
//       setVisible(true);
//     }
//   }, [elementHeight, positionTop]);

//   const onSubmit = () => {
//     if (childComment && user.token) {
//       const form = { childComment, commentId: id };
//       dispatch(createChildComment(form));
//       setChildComment("");
//     } else if (!childComment) {
//       toast.error("Leave a comment");
//     } else {
//       toast.error("Not a user");
//     }
//   };

//   const like = (childCommentId) => {
//     if (user.token) {
//       dispatch(likeChildComment({ commentId: id, childCommentId }));
//     } else {
//       toast.error("Not a user");
//     }
//   };

//   // console.log(positionTop)

//   return (
//     <Modal view={view} index={index} setView={setView}>
//       <Box
//         px={"20px"}
//         pt={"10px"}
//         width={"100%"}
//         h={"100%"}
//         transform={view === index ? "scale(1)" : "scale(0.2)"}
//         transition={"transform ease-in 150ms, bottom ease-in 150ms"}
//         bg={"white"}
//       >
//         <Flex direction={"column"} justify={"space-between"} h={"100%"}>
//           <Box h={"85%"} pt={visible ? "0px" : "35px"}>
//             <Box
//               ref={myElementRef}
//               h={"100%"}
//               overflowY={"auto"}
//               className="scrollbody"
//             >
//               <Flex justify={"space-between"} align={"center"} ref={elementRef}>
//                 <Box
//                   w={{ base: "50px", md: "70px" }}
//                   h={{ base: "50px", md: "70px" }}
//                   borderRadius={"50%"}
//                 >
//                   <Image
//                     w={"100%"}
//                     h={"100%"}
//                     objectFit={"cover"}
//                     borderRadius={"50%"}
//                     src={image}
//                   />
//                 </Box>
//                 <Box w={{ base: "calc(98% - 50px)", md: "calc(98% - 70px)" }}>
//                   <Flex justify={"space-between"} mb={"5px"}>
//                     <p style={{ width: "80%" }}>{User}</p>
//                     <Icon
//                       onClick={() => setView(-1)}
//                       className="cursor"
//                       as={MdFullscreenExit}
//                       boxSize={6}
//                     />
//                   </Flex>
//                   <h4 className="medium-text">
//                     {Comment.length > 60
//                       ? `${Comment.slice(0, 60).trim()}...`
//                       : Comment}
//                   </h4>
//                 </Box>
//               </Flex>
//               <Box border={"1px solid #175616"} my={"10px"} />
//               <Icon
//                 onClick={() => setView(-1)}
//                 className="cursor"
//                 as={MdFullscreenExit}
//                 boxSize={6}
//                 pos={"fixed"}
//                 top={"10px"}
//                 right={"20px"}
//                 display={visible ? "none" : "block"}
//               />
//               <Box>
//                 <Box pos={visible ? "" : "fixed"} top={"10px"} left={"20px"}>
//                   <h4 className="medium-text">
//                     {child.length ? "Comments" : "No Comments"}
//                   </h4>
//                 </Box>

//                 <Flex mt={"10px"} direction={"column"} gap={"10px"}>
//                   {child.length ? (
//                     child
//                       .map((each, index) => (
//                         <Flex
//                           align={"center"}
//                           key={each._id}
//                           p={"5px"}
//                           bg={index % 2 === 0 ? "#E8ECE0" : "#F6F6EC"}
//                           justify={"space-between"}
//                         >
//   <Box w={"40px"} h={"40px"} borderRadius={"50%"}>
//     <Image
//       w={"100%"}
//       h={"100%"}
//       objectFit={"cover"}
//       src={each.creator.image}
//       borderRadius={"50%"}
//     />
//   </Box>
//                           <Box w={{ base: "calc(98% - 40px)" }}>
//                             <h6 className="small-text">
//                               {each.creator.firstName}
//                             </h6>
//                             <p>{each.comment}</p>
//                             <Flex align={"center"} gap={"3px"}>
//                               <Icon
//                                 className="cursor"
//                                 onClick={() => like(each._id)}
//                                 boxSize={4}
//                                 as={
//                                   each.likes.includes(user._id)
//                                     ? AiFillHeart
//                                     : AiOutlineHeart
//                                 }
//                               />
//                               <h6 className="small-text">
//                                 {each.likes.length}
//                               </h6>
//                             </Flex>
//                           </Box>
//                         </Flex>
//                       ))
//                       .reverse()
//                   ) : (
//                     <span></span>
//                   )}
//                 </Flex>
//               </Box>
//             </Box>
//           </Box>
//           <Flex h={"12%"} justify={"space-between"} align={"center"}>
//             <Input
//               w={"88%"}
//               placeholder="Reply to this comment"
//               h={"100%"}
//               border={0}
//               borderRadius={0}
//               focusBorderColor={"white"}
//               value={childComment}
//               onChange={(e) => setChildComment(e.target.value)}
//             />
//             {status === "pending" ? (
//               <TailSpinn />
//             ) : (
//               <Icon
//                 as={IoIosSend}
//                 boxSize={{ md: 9, base: 8 }}
//                 color={"green"}
//                 className="cursor"
//                 onClick={onSubmit}
//               />
//             )}
//           </Flex>
//         </Flex>
//       </Box>

//       {/* <Box
//         px={"20px"}
//         pt={"10px"}
//         width={"100%"}
//         h={"100%"}
//         transform={view === index ? "scale(1)" : "scale(0.2)"}
//         transition={"transform ease-in 150ms, bottom ease-in 150ms"}
//         bg={"white"}
//       >
//         <Flex  direction={"column"} justify={"space-between"} h={"100%"}>
//           <Box
//             ref={myElementRef}
//             h={"85%"}
//             overflowY={"auto"}
//             className="scrollbody"
//             pt={visible ? "50px" : "35px"}
//           >

//           </Box>
//           <Flex h={"12%"} justify={"space-between"} align={"center"}>
//             <Input
//               w={"88%"}
//               placeholder="Reply to this comment"
//               h={"100%"}
//               border={0}
//               borderRadius={0}
//               focusBorderColor={"white"}
//               value={childComment}
//               onChange={(e) => setChildComment(e.target.value)}
//             />
//             {status === "pending" ? (
//               <TailSpinn />
//             ) : (
//               <Icon
//                 as={IoIosSend}
//                 boxSize={{ md: 9, base: 8 }}
//                 color={"green"}
//                 className="cursor"
//                 onClick={onSubmit}
//               />
//             )}
//           </Flex>
//         </Flex>
//       </Box> */}
//     </Modal>
//   );
// };

// export default ChildCommentModal;
