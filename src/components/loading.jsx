import { MagnifyingGlass } from "react-loader-spinner";

function LoadingGlass() {
  return (
    <MagnifyingGlass
      visible={true}
      height="120"
      width="120"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#FFFFFF"
      color="#5D5BE1"
    />
  );
}

export default LoadingGlass;
