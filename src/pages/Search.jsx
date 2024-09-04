import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { Error, Status, allSearchBlogId } from "../app/slice/SearchSlice";
import { search as searchApi } from "../app/actions/Search";

const Search = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const searchQuery = query.get("searchQuery");

  const dispatch = useDispatch();
  const searches = useSelector(allSearchBlogId);
  const status = useSelector(Status);
  const error = useSelector(Error);
  // console.log(searches);

  const [title, setTitle] = useState("true");
  const [body, setBody] = useState("false");
  const [category, setCategory] = useState("false");
  const [categories, setCategories] = useState([]);
  console.log(searches, error);
  console.log(categories);

  useEffect(() => {
    dispatch(
      searchApi({
        search: searchQuery,
        title,
        body,
        category,
        categories: categories.length ? categories.join(",") : "All",
      })
    );
  }, [dispatch, searchQuery, title, body, category, categories]);

  const onChange = (value) => {
    if (value === "title") {
      setTitle((prev) => (prev === "true" ? "false" : "true"));
    } else if (value === "body") {
      setBody((prev) => (prev === "true" ? "false" : "true"));
    } else {
      setCategory((prev) => (prev === "true" ? "false" : "true"));
    }
  };

  const categoriesFunction = (value) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((cur) => cur !== value)
        : [...prev, value]
    );
  };

  return (
    <Box>
      {/* <Box mb={"60px"}>
        <Navbar
          text={"black"}
          hover={"#175616"}
          buttonBg={"#175616"}
          buttonColor={"white"}
          btnHover={"white"}
          btnColorHover={"green"}
          logoutBg={"none"}
          logoutColor={"#175616"}
          logoutHoverBorder={"#175616"}
        />
      </Box> */}
      <input
        onChange={() => onChange("title")}
        checked={title === "true"}
        id="title"
        type="checkbox"
      />
      <label htmlFor="title">Title</label>
      <input
        onChange={() => onChange("body")}
        checked={body === "true"}
        id="body"
        type="checkbox"
      />
      <label htmlFor="body">Body</label>
      <input
        onChange={() => onChange("")}
        checked={category === "true"}
        id="category"
        type="checkbox"
      />
      <label htmlFor="category">Category</label>

      <input
        onChange={() => categoriesFunction("Politics")}
        type="checkbox"
        id="Pro"
        checked={categories.includes("Politics")}
      />
      <label htmlFor="Pro">Politics</label>
      <input
        onChange={() => categoriesFunction("Prob")}
        type="checkbox"
        id="Prob"
        checked={categories.includes("Prob")}
      />
      <label htmlFor="Prob">Prob</label>
    </Box>
  );
};

export default Search;
