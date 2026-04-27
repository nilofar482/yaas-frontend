import { useState } from "react";
import "./product.css";
import Sandles from "./sandles";
import Perfumes from "./perfume";

function Product() {
 const [category, setCategory] = useState("sandles");

  return (
    <div>

<div className="products">
  <p>Top Sales</p>
  <button 
    className={category === "sandles" ? "active" : ""}
    onClick={() => setCategory("sandles")}
  >
    sandles
  </button>

  <button 
    className={category === "perfumes" ? "active" : ""}
    onClick={() => setCategory("perfumes")}
  >
    perfumes
  </button>

</div>

      {category === "sandles" && <Sandles />}
      {category === "perfumes" && <Perfumes />}
    </div>
  );
}

export default Product;