import Logo from "./logo";
import NavCategories from "./navCategories";
function Header(props) {
  return (
    <header>
      {/* <Logo
        setproductData={props.setproductData}
        productData={props.productData}
      /> */}
      <NavCategories
        setproductData={props.setproductData}
        productData={props.productData}
        filterData={props.filterData}
      />
    </header>
  );
}
export default Header;
