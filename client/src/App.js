import "./App.scss";
import "./myComponents.scss";
// import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// REDUX

// Context
import { AuthProvider } from "./context/auth";
import { TasksProvider } from "./context/tasks";
import SocketContext from "./context/socketContext";
// Components
import NavBar from "./components/NavBar/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";
import { RoleProvider } from "./context/role";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import PageNotFound from "./pages/PageNotFound";
import Users from "./pages/Users/Users";
import User from "./pages/User/User";
import Chat from "./pages/Chat/Chat";
import Orders from "./pages/Orders/Orders";
import CreateOrder from "./pages/Orders/CreateOrder/CreateOrder";

function App() {
  const socket = io(
    process.env.REACT_APP_API,
    {
      path: "/socket.io",
    },
    {
      reconnection: true,
    },
    {
      reconnectionDelay: 2000,
    }
  );
  // useEffect(() => {
  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("pong");
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={socket}>
      <AuthProvider>
        <RoleProvider>
          <TasksProvider>
            <BrowserRouter>
              <div className="App">
                <NavBar />
                <Toaster />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/Register" element={<Register />} />

                  {/* ADMIN */}
                  <Route path="/dashboard" element={<PrivateRoute />}>
                    <Route path="" element={<Dashboard />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="users" element={<Users />} />
                  </Route>

                  {/* USER */}
                  <Route path="/user/:name" element={<PrivateRoute />}>
                    <Route path="" element={<User />} />
                  </Route>

                  {/* CHAT */}
                  <Route path="/messages" element={<PrivateRoute />}>
                    <Route path="" element={<Chat />} />
                  </Route>

                  {/* ORDERS */}
                  <Route path="/orders" element={<PrivateRoute />}>
                    <Route path="" element={<Orders />} />
                  </Route>

                  {/* Create Order */}
                  <Route path="/create" element={<PrivateRoute />}>
                    <Route path="" element={<CreateOrder />} />
                  </Route>

                  {/* 404  */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TasksProvider>
        </RoleProvider>
      </AuthProvider>
    </SocketContext.Provider>
  );
}

export default App;
