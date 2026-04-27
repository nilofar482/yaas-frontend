import { useState } from "react";
import "./product.css";
import Sandles from "./sandles";
import Perfumes from "./perfume";

function Product() {
 const [category, setCategory] = useState("sandles");

  return (
    <div>
      <p className="top-sales">Top Sales</p>
<div className="products">
  <button 
    className={category === "sandles" ? "active" : ""}
    onClick={() => setCategory("sandles")}
  >
    Sandles
  </button>

  <button 
    className={category === "perfumes" ? "active" : ""}
    onClick={() => setCategory("perfumes")}
  >
    Perfumes
  </button>

</div>

      {category === "sandles" && <Sandles />}
      {category === "perfumes" && <Perfumes />}
    </div>
  );
}

export default Product;