import React from "react";
import { StyledList } from "./Suggestions.styles";
import "./AutoComplete.styles";

const Suggestions = (props) => {
  return (
    <StyledList>
      <li
        className={props.index === props.suggestionIndex ? "active" : ""}
        key={props.index}
        onClick={props.click}
      >
        {props.suggestion}
      </li>
    </StyledList>
  );
};

export default Suggestions;
