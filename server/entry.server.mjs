import * as jsxRuntime from "react/jsx-runtime";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { NavLink, useSearchParams, useLocation, useParams, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
const Fragment = jsxRuntime.Fragment;
const jsx = jsxRuntime.jsx;
const jsxs = jsxRuntime.jsxs;
const routes = {
  home: "/",
  albums: "albums/:userId",
  albumPhotos: "photos",
  posts: "posts/:userId",
  postComments: "comments",
  notFound: "*"
};
const MetaTags = ({ title, description }) => {
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: title }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description })
  ] });
};
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function fetchUsers() {
  return fetchData("users");
}
async function fetchUserAlbums(userId) {
  return fetchData(`users/${userId}/albums`);
}
async function fetchAlbumPhotos(userId) {
  return fetchData(`albums/${userId}/photos`);
}
async function fetchUserPosts(userId) {
  return fetchData(`users/${userId}/posts`);
}
async function fetchPostComments(postId) {
  return fetchData(`posts/${postId}/comments`);
}
const UserCard = ({ id, username }) => {
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 rounded p-4 shadow-md", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold mb-2", children: username }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
      /* @__PURE__ */ jsx(
        NavLink,
        {
          to: `albums/${id}`,
          className: "text-indigo-500 hover:underline mr-2",
          children: "Albums"
        }
      ),
      /* @__PURE__ */ jsx(NavLink, { to: `posts/${id}`, className: "text-indigo-500 hover:underline", children: "Posts" })
    ] })
  ] });
};
const SearchBar = ({ setInputValue, inputValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  useEffect(() => {
    if (query) {
      setInputValue(query);
    }
  }, []);
  const handleChange = (evt) => {
    const value = evt.target.value.toLowerCase().trim();
    setInputValue(value);
    setSearchParams({ query: value });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
    "input",
    {
      type: "text",
      value: inputValue,
      onChange: handleChange,
      placeholder: "Search by username...",
      className: "px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-800 text-white mb-4"
    }
  ) });
};
const Users = () => {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sortAsc, setSortAsc] = useState(false);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };
  const sortedUsers = users.slice().sort(
    (a, b) => sortAsc ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username)
  ).filter((el) => el.username.toLowerCase().trim().includes(inputValue));
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl text-center font-bold mb-4", children: "Users" }),
    /* @__PURE__ */ jsx(SearchBar, { setInputValue, inputValue }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between mb-4", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 bg-indigo-500 text-white rounded-md mr-2",
          onClick: () => setSortAsc(true),
          children: "Sort Asc"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "px-4 py-2 bg-indigo-500 text-white rounded-md",
          onClick: () => setSortAsc(false),
          children: "Sort Desc"
        }
      )
    ] }),
    sortedUsers.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: sortedUsers.map(({ id, username }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(UserCard, { id, username }) }, id)) }) : /* @__PURE__ */ jsx("h3", { className: "text-center", children: "Users not found" })
  ] });
};
const Home = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MetaTags,
      {
        title: "User List, Posts, and Albums ",
        description: "Discover a variety of users, posts, and albums. Search by username, sort content, and share links easily. "
      }
    ),
    /* @__PURE__ */ jsx(Users, {})
  ] });
};
const AlbumCard = ({ userId, id, title }) => {
  useLocation();
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 rounded p-4 shadow-md", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xl font-semibold mb-2", children: title }),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: `/albums/${userId}/photos`,
        className: "text-indigo-500 hover:underline mr-2",
        children: "View photos"
      }
    )
  ] });
};
const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    getUserAlbums(Number(userId));
  }, [userId]);
  const getUserAlbums = async (id) => {
    try {
      const response = await fetchUserAlbums(id);
      setAlbums(response);
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MetaTags,
      {
        title: "User Albums - Explore Albums | users-react-test",
        description: "Explore albums of this user on users-react-test. Find interesting photos and images in the albums."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Albums" }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", children: albums.map(({ id, title }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(AlbumCard, { id, title, userId }) }, id)) })
    ] })
  ] });
};
const PostCard = ({ title, body, userId }) => {
  return /* @__PURE__ */ jsxs("div", { className: "border border-gray-300 rounded p-4 shadow-md mb-4", children: [
    /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold mb-2", children: title }),
    /* @__PURE__ */ jsx("p", { className: "text-white-400 text-sm", children: body }),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: `/posts/${userId}/comments`,
        className: " block text-center text-indigo-500 hover:underline mr-2",
        children: "Comments"
      }
    )
  ] });
};
const Post = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    getUserPosts(userId);
  }, [userId]);
  const getUserPosts = async (id) => {
    try {
      const response = await fetchUserPosts(id);
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MetaTags,
      {
        title: "User Posts - Explore Posts | users-react-test",
        description: "Explore posts by this user on users-react-test. Read interesting stories, thoughts, and experiences shared by the user."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4", children: "Posts" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: posts.map(({ id, title, body, userId: userId2 }) => /* @__PURE__ */ jsx(
        PostCard,
        {
          id,
          title,
          body,
          userId: userId2
        },
        id
      )) })
    ] })
  ] });
};
const NotFound = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MetaTags,
      {
        title: "404 - Page Not Found | users-react-test",
        description: "Sorry, we couldn’t find the page you’re looking for. Go back home and explore other pages on users-react-test."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid min-h-full place-items-center bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-indigo-400", children: "404" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl", children: "Page not found" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-base leading-7 text-gray-400", children: "Sorry, we couldn’t find the page you’re looking for." }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 flex items-center justify-center gap-x-6", children: /* @__PURE__ */ jsx(
        NavLink,
        {
          to: routes.home,
          className: "rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
          children: "Go back home"
        }
      ) })
    ] }) })
  ] });
};
const AlbumPhotos = () => {
  const [album, setAlbum] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    getAlbumPhotos(Number(userId));
  }, [userId]);
  const getAlbumPhotos = async (id) => {
    try {
      const response = await fetchAlbumPhotos(id);
      setAlbum(response);
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MetaTags,
      {
        title: "Album Photos - Explore Photos | users-react-test",
        description: "Explore photos of this album on users-react-test. Discover beautiful images and snapshots in the album."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center font-bold mb-4", children: "Photos" }),
      /* @__PURE__ */ jsx("ul", { className: "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5", children: album.map(({ id, title, thumbnailUrl }) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "border border-gray-300 rounded p-4 shadow-md",
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: thumbnailUrl,
                alt: title,
                className: "w-full h-auto"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold mt-2", children: title })
          ]
        },
        id
      )) })
    ] })
  ] });
};
const PostComments = () => {
  const [comments, setComments] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    getPostComments(userId);
  }, [userId]);
  const getPostComments = async (id) => {
    try {
      const response = await fetchPostComments(id);
      setComments(response);
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      MetaTags,
      {
        title: "Post Comments - Read Comments | users-react-test",
        description: "Read comments on this post on users-react-test. Explore thoughts, opinions, and discussions shared by others. Join the conversation today!"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-center font-bold mb-4", children: "Comments" }),
      /* @__PURE__ */ jsx("ul", { className: "", children: comments.map(({ body, email, id, name }) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "border-b border-gray-300  p-4 mb-4 shadow-md",
          children: [
            /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2", children: name }),
            /* @__PURE__ */ jsx("p", { className: "text-white-700 text-sm mb-2", children: email.toLowerCase() }),
            /* @__PURE__ */ jsx("p", { className: "text-white-200 text-sm", children: body })
          ]
        },
        id
      )) })
    ] })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: routes.home, element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsxs(Route, { path: routes.albums, children: [
      /* @__PURE__ */ jsx(Route, { path: routes.albumPhotos, element: /* @__PURE__ */ jsx(AlbumPhotos, {}) }),
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Albums, {}) })
    ] }),
    /* @__PURE__ */ jsxs(Route, { path: routes.posts, children: [
      /* @__PURE__ */ jsx(Route, { path: routes.postComments, element: /* @__PURE__ */ jsx(PostComments, {}) }),
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Post, {}) })
    ] }),
    /* @__PURE__ */ jsx(Route, { path: routes.notFound, element: /* @__PURE__ */ jsx(NotFound, {}) })
  ] });
};
function render(url) {
  return ReactDOMServer.renderToString(
    /* @__PURE__ */ jsx(React.StrictMode, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, basename: "/", children: /* @__PURE__ */ jsx(App, {}) }) })
  );
}
export {
  render
};
