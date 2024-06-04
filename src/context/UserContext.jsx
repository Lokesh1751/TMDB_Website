import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userdata");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const addUser = (data) => {
    setUser(data);
    setIsLoggedIn(true);
  };

  const deleteUser = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addToWatchlist = (item) => {
    setWatchlist([...watchlist, item]);
  };

  const removeFromWatchlist = (item) => {
    setWatchlist(watchlist.filter((i) => i.id !== item.id));
  };

  const addToBookmarks = (item) => {
    setBookmarks([...bookmarks, item]);
  };

  const removeFromBookmarks = (item) => {
    setBookmarks(bookmarks.filter((i) => i.id !== item.id));
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        bookmarks,
        addToBookmarks,
        removeFromBookmarks,
        isLoggedIn,
        login,
        logout,
        user,
        addUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
