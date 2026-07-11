import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
console.log(axios.defaults.baseURL);

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // The existing token state is maintained for administrator authentication.
  const [token, setToken] = useState(null);

  // A separate token state is maintained for standard users.
  const [userToken, setUserToken] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");

      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchBlogs();

    const adminToken = localStorage.getItem("token");
    const savedUserToken = localStorage.getItem("userToken");

    // Administrator authentication is restored when an admin token exists.
    if (adminToken) {
      setToken(adminToken);
      axios.defaults.headers.common["Authorization"] =
        adminToken;
    }

    // User authentication is restored separately.
    if (savedUserToken) {
      setUserToken(savedUserToken);

      // The user token is used only when an admin session is not active.
      if (!adminToken) {
        axios.defaults.headers.common["Authorization"] =
          savedUserToken;
      }
    }
  }, []);

  const value = {
    axios,
    navigate,

    token,
    setToken,

    userToken,
    setUserToken,

    blogs,
    setBlogs,

    input,
    setInput,

    fetchBlogs
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};