import { Link } from "react-router-dom";

const Logo = (props) => {
  return (
    <Link
      to={"/"}
      onClick={() => props.setproductData(props.productData)}
      className="logo cursor-pointer"
    >
      <img src="./Logo/logo.png" alt="logo" />
    </Link>
  );
};

export default Logo;
