import { TailSpin } from "react-loader-spinner";

const TailSpinn = () => {
  return (
    <TailSpin
      height="30"
      width="30"
      color="#4fa94d"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default TailSpinn;
