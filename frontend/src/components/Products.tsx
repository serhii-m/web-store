import React, { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Products: React.FC = () => {
  const { products, loading, err } = useTypedSelector(
    (state) => state.product
  )
  const { fetchProducts } = useActions();

  useEffect(() => {
    fetchProducts();
  }, [])

  if (loading) {
    return <h2>loading...</h2>
  }

  if (err) {
    return <h2>{err}</h2>
  }

  return (
    <div>
      {products.map((product, idx) => (
        <div key={idx}>
          <h1>{product.title}</h1>
          <p>{product.descr}</p>
          <img src={product.img_src} />
        </div>
      ))}
    </div>
  );
};

export default Products;