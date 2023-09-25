/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { useState } from "react";

const InfoBox = ({ title, body, about }) => {
  const [index, setIndex] = useState(1);
  const number = index * 2000;

  return (
    <Box>
      <p style={{ color: "rgb(0,0,0,0.7)" }}>{title}</p>
      {!about && <h5 className="medium-text fw-bold">{body}</h5>}
      {about && (
        <h5>
          {body &&
            body
              .slice(0, number)
              .trim()
              .split("\n\n")
              .map((paragraph, index) => (
                <span
                  className="fw-bold"
                  style={{ display: "block" }}
                  key={index}
                >
                  {paragraph
                    .split("\n")
                    .reduce((total, line, index) => [
                      total,
                      <br key={index} />,
                      line,
                    ])}
                  {index ===
                    body.slice(0, number).trim().split("\n\n").length - 1 && (
                    <span>
                      {number < body.length && (
                        <span
                          onClick={() => setIndex((prev) => prev + 1)}
                          className="text-green text-green-light-5-hover cursor"
                        >
                          ...Read More
                        </span>
                      )}
                      {number >= body.length && body.length > 2000 && (
                        <span
                          onClick={() => setIndex(1)}
                          className="text-green text-green-light-5-hover cursor"
                        >
                          {" "}
                          See less
                        </span>
                      )}
                    </span>
                  )}
                </span>
              ))}
        </h5>
      )}
    </Box>
  );
};

export default InfoBox;
