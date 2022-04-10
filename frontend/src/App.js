import "./App.css";
import { SnackbarProvider } from "notistack";
import Grow from "@material-ui/core/Grow";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import { Stack } from "@mui/material";
import CircularProgress from "@material-ui/core/CircularProgress";

import Contact from "./components/Contact/Contact";
import Login from "./components/Login/Login";
import Timeline from "./components/Admin/Timeline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser, loadUser } from "./actions/user";
import AdminPanel from "./components/Admin/AdminPanel";
import Project from "./components/Admin/Project";

function App() {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.user);
  console.log(user);
  const { isAuthenticated } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      TransitionComponent={Grow}
    >
      <Router>
        {loading ? (
          <div
            style={{
              backgroundColor: "#121212",
              width: "100vw",
              height: "100vh",
              display: "flex",
            }}
          >
            <Stack
              sx={{
                color: "#FF6700",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                top: "50%",
                bottom: "50%",
                left: "45%",
              }}
              spacing={1}
              direction="row"
            >
              <CircularProgress size="8.6rem" color="inherit" />
            </Stack>
          </div>
        ) : (
          <>
            <Header />
            <Routes>
              <Route
                path="/"
                element={
                  <Home timelines={user.timeline} skills={user.skills} />
                }
              />
              <Route path="/about" element={<About about={user.about} />} />
              <Route
                path="/projects"
                element={<Projects projects={user.projects} />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/account"
                element={isAuthenticated ? <AdminPanel /> : <Login />}
              />
              <Route
                path="/admin/timeline"
                element={isAuthenticated ? <Timeline /> : <Login />}
              />
              <Route
                path="/admin/project"
                element={isAuthenticated ? <Project /> : <Login />}
              />
            </Routes>
            <Footer />
          </>
        )}
      </Router>
    </SnackbarProvider>
  );
}

export default App;
