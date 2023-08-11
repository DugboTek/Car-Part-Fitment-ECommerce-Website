import React from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "../ProductPage/ProductInfo";
import "../../Styles/ProductPage/ProductSpecs.css";

function ProductSpecs({ product }) {
  return (
    <div className="product-specs-container">
      <div className="productspec-img">
        <ProductImage imgSrc={product.image_url}></ProductImage>
      </div>
      <ProductInfo product={product} />
    </div>
  );
}

export default ProductSpecs;
