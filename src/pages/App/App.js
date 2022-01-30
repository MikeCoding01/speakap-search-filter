import GithubIssues from "../GithubIssues";
import GithubProvider from "../GithubIssues/GithubProvider";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <GithubProvider>
        <GithubIssues />
      </GithubProvider>
    </div>
  );
}

export default App;
