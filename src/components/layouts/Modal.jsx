// /* eslint-disable react/prop-types */
// import { Box, Flex } from "@chakra-ui/react";

// const Modal = ({ children, view, index, setView }) => {
//   return (
//     <Box>
//       <Box
//         pos={"fixed"}
//         top={0}
//         left={0}
//         w={"100%"}
//         h={"100%"}
//         zIndex={view === index ? 30 : -1}
//         opacity={view === index ? 1 : 0}
//         onClick={() => setView(-1)}
//         className="cursor"
//       >
//         <Box
//           pos={"fixed"}
//           top={0}
//           left={0}
//           width={"100%"}
//           h={"100%"}
//           bg={"black"}
//           opacity={view === index ? 0.7 : 0}
//           transition={"opacity 400ms ease"}
//         />
//       </Box>
//       <Box
//         pos={"fixed"}
//         top={"50%"}
//         left={"50%"}
//         transform={"translate(-50%, -50%)"}
//         width={"100%"}
//         maxWidth={"500px"}
//         height={"500px"}
//         maxH={"100vh"}
//         zIndex={view === index ? 40 : -1}
//         opacity={view === index ? 1 : 0}
//       >
//         <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
//           {children}
//         </Flex>
//       </Box>
//     </Box>
//     // <Box
//     // pos={"fixed"}
//     // top={0}
//     // left={0}
//     // w={"100%"}
//     // h={"100%"}
//     // zIndex={view === index ? 30 : -1}
//     // opacity={view === index ? 1 : 0}
//     // onClick={() => setView(-1)}
//     // >
//     // <Box
//     //   pos={"fixed"}
//     //   top={0}
//     //   left={0}
//     //   width={"100%"}
//     //   h={"100%"}
//     //   bg={"black"}
//     //   opacity={view === index ? 0.7 : 0}
//     //   transition={"opacity 400ms ease"}
//     // />
//     //   <Box
//     // border={"2px solid red"}
//     // pos={"fixed"}
//     // top={"50%"}
//     // left={"50%"}
//     // transform={"translate(-50%, -50%)"}
//     // width={"100%"}
//     // maxWidth={"500px"}
//     // height={"500px"}
//     // maxH={"100vh"}
//     // zIndex={40}
//     //   >
//     // <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
//     //   {children}
//     // </Flex>
//     //   </Box>
//     // </Box>
//   );
// };

// export default Modal;
