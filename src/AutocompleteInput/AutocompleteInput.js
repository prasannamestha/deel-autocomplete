import React, { Fragment } from "react";
import { getSearchData } from "../api";
import Suggestions from "./Suggestions";

export class AutocompleteInput extends React.PureComponent {
  state = {
    input: "",
    suggestions: {
      // keeping this as an object in order to maintain a collection of input keywords mapped to their suggestions.
      // consider this as a cache. Using this to prevent maintaining loading state and debounce requests
    },
    showSuggestions: false,
    activeSuggestionIndex: -1
  };

  hideSuggestions = () => {
    this.setState({
      showSuggestions: false,
      activeSuggestionIndex: -1
    });
  };

  showSuggestions = () => {
    this.setState({
      showSuggestions: true
    });
  };

  setActiveSuggestionIndex = (index) => {
    this.setState({
      activeSuggestionIndex: index
    });
  };

  setSearch = (input) => {
    this.setState({
      input: input || "",
      activeSuggestionIndex: -1
    });
  };

  setSuggestions = (key, suggestions) => {
    this.setState({
      suggestions: {
        ...this.state.suggestions,
        [key]: suggestions
      }
    });
  };

  getCurrentSuggestions = () => {
    if (this.state.suggestions[this.state.input]) {
      return this.state.suggestions[this.state.input];
    }
    return [];
  };

  fetchSuggestions = (key) => {
    // a function to fetch the data and update the state
    getSearchData(key)
      .then((suggestions) => {
        this.setSuggestions(key, suggestions);
      })
      .catch(() => {
        // catch api errors
        window.alert("woops! an error occured");
      });
  };

  handleSearch = (e) => {
    const search = e.target.value;
    this.setSearch(search);
    this.fetchSuggestions(search);
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      this.setSearch(
        this.getCurrentSuggestions()[this.state.activeSuggestionIndex]
      );
    } else if (e.keyCode === 38) {
      // up arrow
      e.preventDefault(); // prevents the cursor from going to the first position
      if (this.state.activeSuggestionIndex > 0) {
        this.setActiveSuggestionIndex(this.state.activeSuggestionIndex - 1);
      } else {
        // active suggestion is 0 or -1 - hence go to last sugggestion
        const i = this.getCurrentSuggestions().length - 1;
        this.setActiveSuggestionIndex(i);
      }
    } else if (e.keyCode === 40) {
      // down arrow
      e.preventDefault(); // prevents the cursor from going to the last position
      if (
        this.state.activeSuggestionIndex <
        this.getCurrentSuggestions().length - 1
      ) {
        // select next suggestion
        this.setActiveSuggestionIndex(this.state.activeSuggestionIndex + 1);
      } else {
        // goto first suggestion
        this.setActiveSuggestionIndex(0);
      }
    }
  };

  render() {
    return (
      <Fragment>
        <div>
          <input
            value={this.state.input}
            onKeyDown={this.onKeyDown}
            onChange={this.handleSearch}
            onBlur={this.hideSuggestions}
            onFocus={this.showSuggestions}
            type="text"
            placeholder="Search for names"
          />
        </div>

        {this.state.showSuggestions &&
        this.state.suggestions[this.state.input] ? (
          <Suggestions
            suggestions={this.getCurrentSuggestions()}
            active={this.state.activeSuggestionIndex}
            onMouseOver={this.setActiveSuggestionIndex}
            onSelect={this.setSearch}
          />
        ) : (
          ""
        )}

        <style jsx>{`
          input {
            padding: 0.5rem 1rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 0.5rem;
            width: 100%;
          }
        `}</style>
      </Fragment>
    );
  }
}
