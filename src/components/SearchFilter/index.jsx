import Select from "react-select";
import { useState } from "react";
import "./index.scss";

function SearchFilter(props) {
  const {
    config: { fields },
    handleSubmit,
  } = props;
  const [searchQuery, setSearchQuery] = useState([]);

  const renderSelect = (field) => {
    const handleChange = (selectedOption) => {
      const tempArr = [...searchQuery];

      //   Check if param exists
      tempArr.forEach((param, index) => {
        const key = Object.keys(param).toString();
        if (key === field.name) {
          tempArr.splice(index, 1);
        }
      });

      if (selectedOption || selectedOption.length > 0) {
        tempArr.push({ [field.name]: selectedOption });
        setSearchQuery(tempArr);
      }
    };

    return (
      <Select
        isLoading={field.isLoading}
        isMulti={field.isMulti}
        options={field.loadOptions}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="SearchFilter">
      {fields.map((field, key) => (
        <div key={key}>
          <p>{field.name}</p>
          {field.type === "dropdown" ? renderSelect(field) : null}
        </div>
      ))}
      <button onClick={() => handleSubmit(searchQuery)}>Search</button>
    </div>
  );
}

export default SearchFilter;
