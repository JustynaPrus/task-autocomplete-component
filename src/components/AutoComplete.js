import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { Wrapper, InputContainer, StyledList } from "./AutoComplete.styles.js";

const AutoComplete = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetch(`https://randomuser.me/api/?results=100`)
      .then((response) => response.json())
      .then((data) => setData(data.results));
  };

  const names = data.map((item) => item.name.first);

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 0) {
      const filterSuggestions = names.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(query) > -1
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    setSuggestions([]);
    setSelected((selected) => [...selected, e.target.innerText]);
    setSuggestionsActive(false);
    setValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelected((selected) => [...selected, value]);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    } else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    } else if (e.keyCode === 13 && suggestionIndex !== 0) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
      setSelected((selected) => [...selected, suggestions[suggestionIndex]]);
      setValue("");
    }
  };

  const Suggestions = () => {
    return (
      <StyledList>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion}
            </li>
          );
        })}
      </StyledList>
    );
  };

  const SelectedItems = (props) => {
    const { item, id } = props;
    return (
      <ul>
        <li id={id}>
          {item}
          <IoIosClose
            className="close"
            alt="close icon"
            style={{ width: 20, height: 20 }}
            onClick={(e) => handleRemove(id)}
          />
        </li>
      </ul>
    );
  };

  const handleRemove = (id) => {
    const newList = selected.filter((item, itemId) => itemId !== id);
    setSelected(newList);
  };

  return (
    <Wrapper>
      <h1>UI component for autocomplete</h1>
      <h2>Choose names for your team members!</h2>
      <InputContainer>
        {selected.map((obj, index) => (
          <SelectedItems key={index} item={obj} id={index} />
        ))}
        <form>
          <input
            type="text"
            autoComplete="all"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" onClick={handleSubmit}>
            Dodaj
          </button>
        </form>
      </InputContainer>
      {suggestionsActive && <Suggestions />}
    </Wrapper>
  );
};

export default AutoComplete;
