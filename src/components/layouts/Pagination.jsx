/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({ totalPages, currentPage, route, initial }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const page = Number(currentPage);
  const [hover, setHover] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);

  const slide = (index) => {
    if (index === 4) {
      setStart((prevValue) =>
        prevValue + 4 > pages.length - 6 ? pages.length - 5 : prevValue + 3
      );
      setEnd((prevValue) =>
        prevValue + 4 > pages.length ? pages.length : prevValue + 3
      );
    } else if (index === 0) {
      setStart((prevValue) => (prevValue - 4 < 0 ? 0 : prevValue - 3));
      setEnd((prevValue) => (prevValue - 4 < 5 ? 5 : prevValue - 3));
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

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: "20px", md: "8px" }}
      align={"center"}
      flexWrap={"wrap"}
    >
      {pages.length > 5 &&
        (!page ? (
          <Box
            border={"1px solid black"}
            px={"15px"}
            py={"10px"}
            className={"disabled"}
            bg={"rgb(0,0,0,0.3)"}
          >
            <h4 className="large-text fw-medium">Prev</h4>
          </Box>
        ) : (
          <Link to={page - 1 > 1 ? `${route}/${page - 1}` : initial || route}>
            <Box
              border={"1px solid black"}
              px={"15px"}
              py={"10px"}
              onClick={() => {
                prev();
              }}
            >
              <h4 className="large-text fw-medium">Prev</h4>
            </Box>
          </Link>
        ))}
      <Flex gap={"8px"} flexWrap={"wrap"}>
        {pages.slice(start, end).map((each, index) => (
          <Link
            key={each}
            to={each > 1 ? `${route}/${each}` : initial || route}
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
              h={"50px"}
              onClick={() => {
                slide(index);
              }}
            >
              <h4
                className={`${
                  each === (page || 1) || each === hover
                    ? "text-white"
                    : "text-black"
                } large-text fw-medium`}
              >
                {each}
              </h4>
            </Flex>
          </Link>
        ))}
      </Flex>
      {pages.length > 5 &&
        (page === pages.length ? (
          <Box
            border={"1px solid black"}
            px={"15px"}
            py={"10px"}
            className={"disabled"}
            bg={"rgb(0,0,0,0.3)"}
          >
            <h4 className="large-text fw-medium">Next</h4>
          </Box>
        ) : (
          <Link to={`${route}/${page ? page + 1 : 2}`}>
            <Box
              border={"1px solid black"}
              px={"15px"}
              py={"10px"}
              onClick={() => {
                next();
              }}
            >
              <h4 className="large-text fw-medium">Next</h4>
            </Box>
          </Link>
        ))}
    </Flex>
  );
};

export default Pagination;
