import { useEffect, useState } from "react";
import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { tagsList } from "../utils/Data.js";

import { useDispatch, useSelector } from "react-redux";
import {
  Error,
  Status,
  TotalPages,
  allSearchBlogId,
} from "../app/slice/SearchSlice";
import { search as searchApi } from "../app/actions/Search";
import Searchdesign from "../components/search/Searchdesign.jsx";
import Pagination from "../components/layouts/Pagination.jsx";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const page = query.get("page");
  const searchQuery = query.get("searchQuery") || "";

  const [search, setSearch] = useState(searchQuery);
  const [title, setTitle] = useState("true");
  const [body, setBody] = useState("false");
  const [tags, setTags] = useState("");

  const blogs = useSelector(allSearchBlogId);
  const status = useSelector(Status);
  const error = useSelector(Error);
  const totalPages = useSelector(TotalPages);
  console.log(totalPages);

  const updateSearch = (newSearch) => {
    setSearch(newSearch);
    const newSearchParams = new URLSearchParams({
      searchQuery: newSearch,
      page: 1,
    });
    navigate(`/blog/search?${newSearchParams.toString()}`);
  };

  const onChange = (value) => {
    if (value === "title") {
      setTitle((prev) => (prev === "true" ? "false" : "true"));
    } else if (value === "body") {
      setBody((prev) => (prev === "true" ? "false" : "true"));
    } else {
      setTags(value);
    }
    const newSearchParams = new URLSearchParams({
      searchQuery: search,
      page: 1,
    });
    navigate(`/blog/search?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(
        searchApi({
          search,
          page,
          title,
          body,
          tags,
        })
      );
    }, 1000);
    return () => {
      clearTimeout(delayDebounce);
    };
  }, [dispatch, search, page, title, body, tags]);

  return (
    <Box mt={"30px"} className="cc-container page-alignment">
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={"20px"}
      >
        <Input
          size={"sm"}
          w={{ base: "100%", lg: "35%" }}
          placeholder="Search"
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          fontWeight={"bold"}
          focusBorderColor="black"
        />
        <Select
          size={"sm"}
          onChange={(e) => onChange(e.target.value)}
          width={{ base: "40%", sm: "50%", lg: "35%" }}
          focusBorderColor="black"
        >
          <option value={""}>All</option>
          {tagsList.map((each) => (
            <option key={each.id} value={each.name}>
              {each.name}
            </option>
          ))}
        </Select>
        <Flex gap={"5px"} alignItems={"center"}>
          <input
            onChange={() => onChange("title")}
            checked={title === "true"}
            id="title"
            type="checkbox"
          />
          <label htmlFor="title">Title</label>
        </Flex>
        <Flex gap={"5px"} alignItems={"center"}>
          <input
            onChange={() => onChange("body")}
            checked={body === "true"}
            id="body"
            type="checkbox"
          />
          <label htmlFor="body">Content</label>
        </Flex>
      </Flex>
      {status === "pending" && <Text mt={"50px"}>Loading...</Text>}
      {status === "failed" && <Text mt={"50px"}>{error}</Text>}
      {status === "success" &&
        (blogs.length > 0 ? (
          <Box>
            <Flex direction={"column"} mt={"50px"} gap={"30px"}>
              {blogs.map((each) => (
                <Searchdesign key={each} id={each} />
              ))}
            </Flex>
            <Flex justify={"center"} mt={"20px"}>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                search={search}
              />
            </Flex>
            <Text mt={"7px"} textAlign={"center"} className="tiny-text">
              Available pages:{" "}
              <Text className="fw-bold tiny-text" as={"span"}>
                {totalPages}
              </Text>
            </Text>
          </Box>
        ) : (
          <Text mt={"50px"}>No blog contain your search</Text>
        ))}
    </Box>
  );
};

export default Search;
