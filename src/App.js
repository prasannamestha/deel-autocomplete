import React from "react";
import { AutocompleteInput } from "./AutocompleteInput/AutocompleteInput";

class App extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <div className="app">
          <h1>Sample autocomplete</h1>
          <AutocompleteInput />
        </div>

        <style jsx>{`
          .app {
            width: 45rem;
            max-width: 100%;
            margin: 0px auto;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default App;
