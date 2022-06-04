import React from 'react';
import {Pagination} from "react-bootstrap";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Pages: React.FC = () => {
  const {products, loading, err} = useTypedSelector(
    (state) => state.product
  );

  return (
    <Pagination className="mt-3">
    {/* pages.map(page =>
        <Pagination.Item
         key={page}
          active={products.page === page}
          onClick={() => products.setPage(page)}
        >
          {page}
        </Pagination.Item>
      )}*/}
    </Pagination>
  )
}

export default Pages;