import { useContext, useReducer, useState } from "react";
import { Context } from "./GithubProvider";
import SearchFilter from "../../components/SearchFilter";
import { data } from "./api/test";
import { searchIssues } from "./api";
import "./index.scss";

import { STATE_TYPES, SORT_TYPES, DIRECTION_TYPES } from "./const/githubTypes";

function GithubIssues() {
  const { state, isLoading } = useContext(Context);
  const [searchResult, setSearchResult] = useState([]);

  const getUniqueArr = (data, key) => {
    return [...new Map(data.map((item) => [item[key], item])).values()];
  };

  const getUsers = () => {
    let optionsData = state.map((item) => {
      return {
        label: item.user.login,
        value: item.user.login,
      };
    });
    return getUniqueArr(optionsData, "value");
  };

  const getMileStones = () => {
    let optionsData = state.map((item) => {
      return {
        label: item.milestone,
        value: item.milestone,
      };
    });
    const options = getUniqueArr(optionsData, "value");
    const valueIsNull = options.length < 2 && !options[0]?.value;
    return valueIsNull
      ? [
          {
            label: "No options",
            value: "No options",
          },
        ]
      : options;
  };

  const getLabels = () => {
    let optionsData = state.map((item) => {
      return [...item.labels];
    });
    const labels = [].concat(...optionsData);
    return getUniqueArr(labels, "name").map((label) => {
      return {
        label: label.name,
        value: label.name,
      };
    });
  };

  const handleSubmit = (searchQuery) => {
    searchIssues(searchQuery).then((result) => setSearchResult(result));
  };

  const renderResultCard = (result, key) => {
    return (
      <a
        href={result.html_url}
        target="_blank"
        rel="noopener noreferrer"
        key={key}
      >
        <div className="result__card">
          <h3>{result.title}</h3>
        </div>
      </a>
    );
  };

  const config = {
    type: "issue",
    fields: [
      {
        name: "Author",
        type: "dropdown",
        isMulti: false,
        loadOptions: getUsers(),
        isLoading: isLoading,
      },
      {
        name: "State",
        type: "dropdown",
        isMulti: false,
        loadOptions: STATE_TYPES,
      },
      {
        name: "Labels",
        type: "dropdown",
        isMulti: true,
        loadOptions: getLabels(),
        isLoading: isLoading,
      },
      {
        name: "Mentioned",
        type: "dropdown",
        isMulti: true,
        loadOptions: getUsers(),
        isLoading: isLoading,
      },
      {
        name: "Assignee",
        type: "dropdown",
        isMulti: true,
        loadOptions: getUsers(),
        isLoading: isLoading,
      },
      {
        name: "Milestone",
        type: "dropdown",
        isMulti: false,
        loadOptions: getMileStones(),
        isLoading: isLoading,
      },
      {
        name: "Sort",
        type: "dropdown",
        isMulti: false,
        loadOptions: SORT_TYPES,
      },
      {
        name: "Direction",
        type: "dropdown",
        isMulti: false,
        loadOptions: DIRECTION_TYPES,
      },
    ],
  };

  return (
    <div className="GithubIssues">
      <h1>Github Issues</h1>
      <SearchFilter config={config} handleSubmit={handleSubmit} />
      {searchResult.length > 0 ? (
        searchResult.map((result, key) => renderResultCard(result, key))
      ) : (
        <h3>No matches are found.</h3>
      )}
    </div>
  );
}

export default GithubIssues;
