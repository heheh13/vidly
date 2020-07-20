import React from "react";
import { getGenres, genres } from "../services/fakeGenreService";
const ListGroup = (props) => {
  const {
    activeItem,
    textProperty,
    valueProperty,
    items,
    onItemSelect,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item[textProperty])}
          className={
            item[textProperty] === activeItem
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
