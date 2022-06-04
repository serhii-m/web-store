import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ItemsCheck from "./ItemsCheck";

const ItemsNav: React.FC = () => {
  const { tagTypes, error } = useTypedSelector((state) => state.tagType);
  const { fetchTags } = useActions();

  useEffect(() => {
    fetchTags();
  }, []);

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="itemsWrapper">
      <Accordion style={{ position: "fixed", width: "16rem"}}>
        {tagTypes.map((tagType) => (
          <Accordion.Item eventKey={tagType._id} key={tagType._id}>
            <Accordion.Header>{tagType.title}</Accordion.Header>
            <Accordion.Body>
              <ItemsCheck type_id={tagType._id} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ItemsNav;