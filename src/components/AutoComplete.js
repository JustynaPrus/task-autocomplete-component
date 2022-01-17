import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import "./AutoComplete.css";

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
  console.log(data);

  const names = data.map((item) => item.name.first);
  console.log(names);

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
  console.log(selected);

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
    } else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <ul className="suggestions">
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
      </ul>
    );
  };

  const SelectedItems = () => {
    return (
      <>
        {selected.map((item, index) => (
          <li key={index}>
            {item}
            <IoIosClose
              className="close"
              alt="close icon"
              onClick={handleRemove}
            />
          </li>
        ))}
      </>
    );
  };

  const handleRemove = () => {
    setSelected();
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
      <SelectedItems />
    </div>
  );
};

export default AutoComplete;
