import React from "react";

class Suggestions extends React.Component {
  render() {
    if (this.props.suggestions.length === 0) {
      return <p>No suggestions found :(</p>;
    }
    return (
      <React.Fragment>
        <ul>
          {this.props.suggestions.map((s, i) => (
            <li
              onMouseOver={() => this.props.onMouseOver(i)}
              onMouseDown={() => this.props.onSelect(s)}
              className={i === this.props.active ? "active" : ""}
              key={s}
            >
              {s}
            </li>
          ))}
        </ul>

        <style jsx>{`
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            overflow: auto;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
          li {
            padding: 0.25rem 1rem;
            cursor: pointer;
          }
          .active {
            background-color: #e5e7eb;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Suggestions;
