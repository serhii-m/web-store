import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Form, Spinner } from "react-bootstrap";

type Props = {
  type_id: string;
}

const ItemsCheck: React.FC<Props> = ({ type_id }) => {
  const { types, loading, error } = useTypedSelector((state) => state.type);
  const { fetchTypes, fetchProducts } = useActions();
  
  const [search, setSearch] = useState<string[]>([]);

  const handleOnClickCheck = (e: any) => {
    if (e.target.checked) {
      return setSearch([...search, e.target.name]);
    }

    return setSearch([...search.filter((el) => el !== e.target.name)]);
  }

  let searchParams: string = "";

  if (search) {
    searchParams = "?typeSlug=" + search.join(",");
  }

  useEffect(() => {
    fetchTypes();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, searchParams]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {types.map((type) =>
        type.tagTypeId === type_id ? (
          <Form.Check
            key={type._id}
            name={type.slug}
            type="checkbox"
            id={type._id}
            label={type.title}
            onClick={handleOnClickCheck}
          />
        ) : null
      )}
    </>
  );
};

export default ItemsCheck;