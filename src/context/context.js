import React, { useState, useEffect, useContext, useCallback } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("wesbos");
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requestCount, setRequestCount] = useState({ limit: 60, remaining: 0 }); // requests left
  const [error, setError] = useState({ flag: false, msg: "" });

  const getRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then((res) => {
        const {
          data: {
            rate: { limit, remaining },
          },
        } = res;
        if (remaining === 0) {
          setError({
            flag: true,
            msg: "API Rate limit Exceeded. Please check after 60min.",
          });
        } else {
          setRequestCount({ remaining, limit });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGithubUser = useCallback(async () => {
    setError({ flag: false, msg: "" });
    setLoading(true);

    await axios(`${rootUrl}/users/${searchText}`)
      .then((res) => {
        // Response when error no user exist for the given searchTerm
        if (res) {
          setGithubUser(res.data);
          const { login, followers_url, repos_url } = res.data;
          axios(`${repos_url}?per_page=100`).then(res=>{
            console.log(res);
            setRepos(res.data)
          })

          axios(followers_url).then(res=>{
            console.log(res);
            setFollowers(res.data)
          })
        } else {
          setError({
            flag: true,
            msg: `None user exists with username [${searchText}]`,
          });
        }
      })
      .catch((err) => {
        setError({
          flag: true,
          msg: `No user exists with username [${searchText}]`,
        });
        console.log(err);
      });

    getRequests();
    setLoading(false);
  }, [searchText]);

  useEffect(() => {
    getRequests();
  }, []);

  useEffect(() => {
    getGithubUser();
  }, [searchText, getGithubUser]);

  return (
    <AppContext.Provider
      value={{
        loading,
        githubUser,
        repos,
        followers,
        searchText,
        setSearchText,
        error,
        requestCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook for using context
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
