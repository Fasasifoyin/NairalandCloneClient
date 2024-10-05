/* eslint-disable react/prop-types */
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ totalPages, currentPage, route, initial, search }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const page = Number(currentPage);
  const [hover, setHover] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const createSearchParams = (page) => {
    const searchParams = new URLSearchParams({
      searchQuery: search,
      page,
    });

    return `/blog/search?${searchParams.toString()}`;
  };

  const createNextOrPrevSearchParams = (action) => {
    const searchParams = new URLSearchParams({
      searchQuery: search,
      page:
        action === "prev"
          ? page - 1 > 1
            ? page - 1
            : 1
          : page + 1 > totalPages
          ? page
          : page + 1,
    });

    return `/blog/search?${searchParams.toString()}`;
  };

  const slide = (index, each) => {
    if (index === 4) {
      setStart((prevValue) =>
        totalPages - each >= 3 ? prevValue + 3 : prevValue + (totalPages - each)
      );
      setEnd((prevValue) =>
        totalPages - each >= 3 ? prevValue + 3 : totalPages
      );
    }
    if (index === 0) {
      setStart((prevValue) => (prevValue - 3 >= 0 ? prevValue - 3 : 0));
      setEnd((prevValue) => (prevValue - 3 >= 5 ? prevValue - 3 : 5));
    }
  };

  const next = () => {
    setStart((prevValue) =>
      prevValue + 1 > pages.length - 6 ? pages.length - 5 : prevValue + 1
    );
    setEnd((prevValue) =>
      prevValue + 1 > pages.length ? pages.length : prevValue + 1
    );
  };

  const prev = () => {
    setStart((prevValue) => (prevValue - 1 < 0 ? 0 : prevValue - 1));
    setEnd((prevValue) => (prevValue - 1 < 5 ? 5 : prevValue - 1));
  };

  useEffect(() => {
    if (totalPages > 5 && page > 4) {
      setStart(totalPages - page >= 3 ? page - 2 : totalPages - 5);
      setEnd(totalPages - page >= 3 ? page + 3 : totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "20px", md: "8px" }}
      align={"center"}
      flexWrap={"wrap"}
    >
      {pages.length > 5 &&
        (!page || page === 1 ? (
          <Box
            border={"1px solid black"}
            px={"10px"}
            py={"7px"}
            className={"disabled"}
            bg={"rgb(0,0,0,0.3)"}
          >
            <Text className="medium-text fw-medium">Prev</Text>
          </Box>
        ) : (
          <Link
            to={
              search
                ? createNextOrPrevSearchParams("prev")
                : page - 1 > 1
                ? `${route}/${page - 1}`
                : initial || route
            }
          >
            <Box
              border={"1px solid black"}
              px={"10px"}
              py={"7px"}
              onClick={() => {
                prev();
              }}
            >
              <Text className="medium-text fw-medium">Prev</Text>
            </Box>
          </Link>
        ))}
      <Flex gap={"8px"} flexWrap={"wrap"}>
        {pages.slice(start, end).map((each, index) => (
          <Link
            key={each}
            to={
              search
                ? createSearchParams(each)
                : each > 1
                ? `${route}/${each}`
                : initial || route
            }
          >
            <Flex
              onMouseEnter={() => setHover(each)}
              onMouseLeave={() => setHover(null)}
              justify={"center"}
              align={"center"}
              className="cursor"
              bg={each === (page || 1) || each === hover ? "#175616" : ""}
              border={"1px solid black"}
              w={"40px"}
              h={"30px"}
              onClick={() => {
                slide(index, each);
              }}
            >
              <Text
                className={`${
                  each === (page || 1) || each === hover
                    ? "text-white"
                    : "text-black"
                } fw-medium`}
              >
                {each}
              </Text>
            </Flex>
          </Link>
        ))}
      </Flex>
      {pages.length > 5 &&
        (page === pages.length ? (
          <Box
            border={"1px solid black"}
            px={"10px"}
            py={"7px"}
            className={"disabled"}
            bg={"rgb(0,0,0,0.3)"}
          >
            <Text className="medium-text fw-medium">Next</Text>
          </Box>
        ) : (
          <Link
            to={
              search
                ? createNextOrPrevSearchParams("next")
                : `${route}/${page ? page + 1 : 2}`
            }
          >
            <Box
              border={"1px solid black"}
              px={"10px"}
              py={"7px"}
              onClick={() => {
                next();
              }}
            >
              <Text className="medium-text fw-medium">Next</Text>
            </Box>
          </Link>
        ))}
    </Flex>
  );
};

export default Pagination;
