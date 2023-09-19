import { Triangle } from "react-loader-spinner";

const TriangleLoader = () => {
  return (
    <Triangle
      height="150"
      width="150"
      color="#175616"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    />
  );
};

export default TriangleLoader;
