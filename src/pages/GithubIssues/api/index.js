import { fetchInitial } from "../reducer/GithubActions";
import { data } from "./test";

export async function fetchData(dispatch) {
  let allData = [];
  let morePagesAvailable = true;
  let currentPage = 0;
  try {
    while (morePagesAvailable) {
      currentPage++;
      const response = await fetch(
        `https://api.github.com/repos/tensorflow/tfjs/issues?per_page=100&page=${currentPage}`
      );
      const data = await response.json();
      data.forEach((i) => allData.push(i));
      // morePagesAvailable = data.length > 0;
      morePagesAvailable = currentPage < 2;
    }
    dispatch(fetchInitial(allData));
  } catch (error) {
    console.log(error);
  }
}

export async function searchIssues(searchQuery) {
  try {
    let queryString = "";
    searchQuery.forEach((param) => {
      let paramName = Object.keys(param).toString().toLocaleLowerCase();
      if (paramName === "author") {
        paramName = "creator";
      }
      const content = param[Object.keys(param)];
      if (Array.isArray(content)) {
        let optionsData = content.map((item) => {
          return item.value;
        });
        if (optionsData.length > 0) {
          queryString += `${paramName}=${optionsData.join()}&`;
        }
      } else {
        if (content.value) {
          queryString += `${paramName}=${content.value}&`;
        }
      }
    });
    const response = await fetch(
      `https://api.github.com/repos/tensorflow/tfjs/issues?${queryString}`
    );
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
