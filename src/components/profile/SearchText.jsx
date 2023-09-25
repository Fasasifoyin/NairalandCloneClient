/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SearchText = ({ title, search, slug }) => {
  const regExp = search && title.split(new RegExp(`(${search})`, "gi"));

  return (
    <Box>
      {search ? (
        <Link to={`/${slug}`}>
          {search &&
            regExp.map((each, i) => (
              <h5
                className="fw-bold medium-text"
                key={i}
                style={{ display: "inline" }}
              >
                {each.toLowerCase() === search.toLowerCase() ? (
                  <span className="bg-green text-white medium-text">{each}</span>
                ) : (
                  each
                )}
              </h5>
            ))}
        </Link>
      ) : (
        <Link to={`/${slug}`}>
          <h5 className="medium-text fw-bold">
            {title.length > 30 ? `${title.slice(0, 30).trim()}...` : title}
          </h5>
        </Link>
      )}
    </Box>
  );
};

export default SearchText;
