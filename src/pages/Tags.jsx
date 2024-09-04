import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getRelatedTags } from "../app/actions/Blogs";
import {
  Status,
  TotalPages,
  allRelatedTagsId,
  Error,
} from "../app/slice/RelatedTags";

const Tags = () => {
  const { tagName, page } = useParams();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const relatedTags = useSelector(allRelatedTagsId);
  // const totalPages = useSelector(TotalPages);
  // const status = useSelector(Status);
  // const error = useSelector(Error);
  // console.log(relatedTags, totalPages, status, error);

  // useEffect(() => {
  //   dispatch(getRelatedTags({ page: page || 1, tags: tagName }));
  // }, [tagName, dispatch, page]);

  // useEffect(() => {
  //   if (Number(page) === 1) {
  //     navigate(`/tag/${tagName}`);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location, navigate, page]);

  return (
    <div>
      <h2>{tagName}</h2>
    </div>
  );
};

export default Tags;
