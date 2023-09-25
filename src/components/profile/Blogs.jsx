/* eslint-disable react/prop-types */
import { Box, Button, Flex, Icon, Image } from "@chakra-ui/react";
import { convertDate } from "../../utils/Date";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../layouts/ConfirmationModal";

import { useDispatch, useSelector } from "react-redux";
import { deleteBlog } from "../../app/actions/Blogs";
import { DeleteBlogStatus } from "../../app/slice/ProfileSlice";
import Search from "../Detailed/Search";
import { FiSearch } from "react-icons/fi";
import SearchText from "./SearchText";

const Blogs = ({ userProfile, user }) => {
  const dispatch = useDispatch();
  const status = useSelector(DeleteBlogStatus);
  const [remove, setRemove] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [search, setSearch] = useState("");
  const myBlog = userProfile.allBlogs
    .slice(0)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  const deleteHelper = () => {
    dispatch(deleteBlog({ blogId: id, setRemove }));
  };

  const onSearch = () => {
    setSearch("");
  };

  const [index, setIndex] = useState(6);

  return (
    <Box>
      <Flex align={"center"} justify={"space-between"}>
        <Box display={{ base: show ? "none" : "block", sm: "block" }}>
          <h5 className="large-text fw-bold">Blogs Posted</h5>
        </Box>
        <Box
          display={{ base: show ? "block" : "none", sm: "block" }}
          width={{ base: "80%", sm: "250px", md: "300px", lg: "320px" }}
        >
          <Search
            placeholder={"Search your blogs"}
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
            cancel
          />
        </Box>
        <Icon
          display={{ base: show ? "none" : "block", sm: "none" }}
          as={FiSearch}
          className="text-green text-green-light-5-hover"
          boxSize={6}
          onClick={() => setShow(true)}
        />
        <Box
          onClick={() => setShow(false)}
          display={{ base: show ? "block" : "none", sm: "none" }}
        >
          <p>Cancel</p>
        </Box>
      </Flex>
      <Flex direction={"column"} gap={"25px"} mt={"35px"} mb={"15px"}>
        {myBlog.length ? (
          myBlog.slice(0, index).map((each) => (
            <Flex
              key={each._id}
              className="bg-cream"
              p={"15px 20px"}
              justify={"space-between"}
              align={"center"}
            >
              <Box
                w={{ base: "70px", sm: "90px", md: "112px" }}
                h={{ base: "70px", sm: "90px", md: "112px" }}
                borderRadius={"50%"}
              >
                <Image
                  w={"100%"}
                  h={"100%"}
                  borderRadius={"50%"}
                  objectFit={"cover"}
                  src={each.images[0]}
                  alt="image"
                />
              </Box>
              <Flex
                w={{
                  base: "calc(96% - 70px)",
                  sm: "calc(98% - 90px)",
                  md: "calc(99% - 112px)",
                }}
              >
                <Flex
                  w={"100%"}
                  direction={{ base: "column", md: "row" }}
                  justify={{ md: "space-between" }}
                  align={{ base: "start", md: "center" }}
                  gap={{ base: "15px", md: 0 }}
                >
                  <Box w={{ md: "50%", lg: "70%" }}>
                    <SearchText
                      search={String(search)}
                      title={String(each.title)}
                      slug={each.slug}
                    />

                    <p style={{ color: "rgb(0,0,0,0.5)" }}>
                      Posted on {convertDate(each.createdAt)}{" "}
                    </p>
                  </Box>
                  {userProfile.userName === user.userName && (
                    <Flex gap={"20px"} direction={"row"}>
                      <Flex
                        gap={"5px"}
                        align={"center"}
                        border={"1px solid red"}
                        padding={"3px 10px"}
                        borderRadius={"17px"}
                        className="bg-hover-red text-hover-white text-red cursor"
                        onClick={() => {
                          setRemove(true);
                          setId(each._id);
                        }}
                      >
                        <Icon as={AiOutlineDelete} boxSize={6} />
                        <p>Delete Blog</p>
                      </Flex>
                      <Link to={`/blog/edit/${each.slug}`}>
                        <Flex
                          h={"100%"}
                          gap={"5px"}
                          align={"center"}
                          border={"1px solid black"}
                          padding={"5px 10px"}
                          borderRadius={"17px"}
                          className="bg-hover-black text-hover-white cursor"
                        >
                          <Icon as={AiFillEdit} boxSize={6} />
                          <p>Edit</p>
                        </Flex>
                      </Link>
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </Flex>
          ))
        ) : (
          <h5 className="medium-text fw-bold">
            None of your blogs match your search
          </h5>
        )}
      </Flex>
      <Flex justify={"flex-end"}>
        {index < myBlog.length && (
          <Button
            className="bg-green text-white"
            size={"sm"}
            onClick={() =>
              setIndex((prev) =>
                prev + 6 > myBlog.length ? myBlog.length : prev + 6
              )
            }
          >
            View More
          </Button>
        )}
        {index === myBlog.length && myBlog.length > 6 && (
          <Button
            className="bg-green text-white"
            size={"sm"}
            onClick={() => setIndex(6)}
          >
            View less
          </Button>
        )}
      </Flex>

      {remove && (
        <ConfirmationModal
          actiontype={"Are you sure you want to delete this blog"}
          warningNote={
            "Please note that this action is not reversible and this blog will be deleted permanently"
          }
          buttonText={"Delete Blog"}
          setFalse={setRemove}
          action={deleteHelper}
          status={status}
        />
      )}
    </Box>
  );
};

export default Blogs;
