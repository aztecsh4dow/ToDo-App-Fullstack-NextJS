"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brightness4,
  Brightness7,
  Delete,
  AddCircle,
} from "@mui/icons-material";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./page.css";

interface Todo {
  id: number;
  task: string;
  category: string;
  completed: boolean;
  userId: number;
}

const darkGreenTheme = createTheme({
  palette: {
    primary: {
      main: "#006400", // Dark green
    },
    secondary: {
      main: "#ffffff", // White
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("General");
  const [error, setError] = useState("");
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null,
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAftenoon, setIsAfternoon] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("currentUser") || "null",
    );
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser || currentUser === "null") {
      router.push("/landing");
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  useEffect(() => {
    const storedDarkMode = JSON.parse(
      localStorage.getItem("darkMode") || "true",
    );
    setIsDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    setIsAfternoon(hours >= 12 && hours < 18);
  }, []);

  const fetchTodos = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const userTodos = storedTodos.filter(
      (todo: Todo) => todo.userId === user?.id,
    );
    setTodos(userTodos);
  };

  const addTodo = () => {
    if (!task.trim()) {
      setError("Task cannot be empty");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      task,
      category,
      completed: false,
      userId: user!.id,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);

    const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    allTodos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(allTodos));

    setTask("");
    setError("");
  };

  const toggleCompletion = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);

    const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const updatedAllTodos = allTodos.map((todo: Todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    localStorage.setItem("todos", JSON.stringify(updatedAllTodos));
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    const allTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const updatedAllTodos = allTodos.filter((todo: Todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedAllTodos));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <ThemeProvider theme={darkGreenTheme}>
      <CssBaseline />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: isDarkMode ? "#000000" : "#ffffff",
          color: isDarkMode ? "#ffffff" : "#000000",
        }}
      >
        <AppBar position="sticky" sx={{ backgroundColor: "#006400" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
                The NextJS ToDo App
              </Link>
            </Typography>

            {/* Navbar Links with Active and Hover Underline Effect */}
            <Link href="/" passHref>
              <Button
                sx={{
                  color: isActive("/") ? "#f5f5f5" : "#ffffff",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: isActive("/") ? "100%" : "0",
                    backgroundColor: "#ffffff",
                    borderRadius: isActive("/") ? "10px" : "0", // Rounded border for active link
                    transition: "width 0.3s",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                Home
              </Button>
            </Link>

            {/* Conditional Login/Logout Button */}
            {user ? (
              <Button
                onClick={logout}
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  position: "relative",
                  "&:hover": {
                    color: "#ff4d4d",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: "0",
                    backgroundColor: "#fff",
                    transition: "width 0.3s",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Link href="/auth/login" passHref>
                <Button
                  sx={{
                    color: isActive("/auth/login") ? "#f5f5f5" : "#ffffff",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "2px",
                      width: isActive("/auth/login") ? "100%" : "0",
                      backgroundColor: "#ffffff",
                      borderRadius: isActive("/auth/login") ? "10px" : "0",
                      transition: "width 0.3s",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            )}

            <Link href="/auth/register" passHref>
              <Button
                sx={{
                  color: isActive("/auth/register") ? "#f5f5f5" : "#ffffff",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: isActive("/auth/register") ? "100%" : "0",
                    backgroundColor: "#ffffff",
                    borderRadius: isActive("/auth/register") ? "10px" : "0",
                    transition: "width 0.3s",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                Register
              </Button>
            </Link>

            {/* Dark Mode Toggle */}
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Container sx={{ mt: 4, flexGrow: 1 }}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
              transition: "all 0.3s ease",
              backgroundColor: isDarkMode ? "#333" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              {isAftenoon ? "Good Afternoon" : "Good Morning"}, {user?.username}
              !
            </Typography>
            {user && (
              <Box textAlign="center" mb={2}>
                <Typography variant="body1" style={{ marginBottom: "10px" }}>
                  Here are your tasks:
                </Typography>
                <Button
                  variant="contained"
                  onClick={logout}
                  sx={{
                    mt: 1,
                    backgroundColor: darkGreenTheme.palette.primary.main,
                    color: "#fff",
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mb={3}
            >
              <TextField
                label="New Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{
                  mr: 2,
                  "& .MuiInputBase-input": {
                    color: isDarkMode ? "#fff" : "#000",
                  },
                  "& .MuiInputLabel-root": {
                    color: isDarkMode ? "#fff" : "#000",
                  },
                }}
                InputLabelProps={{
                  style: { color: isDarkMode ? "#fff" : "#000" },
                }}
                InputProps={{
                  style: { color: isDarkMode ? "#fff" : "#000" },
                }}
              />
              <FormControl variant="outlined" sx={{ mr: 2, minWidth: 150 }}>
                <InputLabel style={{ color: isDarkMode ? "#fff" : "#000" }}>
                  Category
                </InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Category"
                  sx={{
                    color: isDarkMode ? "#fff" : "#000",
                    backgroundColor: isDarkMode ? "#444" : "#fff",
                    "& .MuiSvgIcon-root": {
                      color: isDarkMode ? "#fff" : "#000",
                    },
                  }}
                >
                  <MenuItem value="General">General</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Shopping">Shopping</MenuItem>
                </Select>
              </FormControl>
              <IconButton color="primary" onClick={addTodo}>
                <AddCircle fontSize="large" />
              </IconButton>
            </Box>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <TransitionGroup>
              {todos.map((todo) => (
                <CSSTransition key={todo.id} timeout={500} classNames="todo">
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: 3,
                      backgroundColor: isDarkMode ? "#444" : "#f9f9f9",
                      color: isDarkMode ? "#fff" : "#000",
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => toggleCompletion(todo.id)}
                      />
                      <Typography
                        variant="body1"
                        style={{
                          textDecoration: todo.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        [{todo.category}] {todo.task}
                      </Typography>
                    </Box>
                    <IconButton
                      color="error"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Paper>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          sx={{
            mt: "auto",
            textAlign: "center",
            py: 2,
            backgroundColor: darkGreenTheme.palette.primary.main,
            color: "#ffffff",
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} ToDo App. All Rights Reserved.
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
}
