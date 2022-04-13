import {Route, Switch} from "react-router-dom"
import {Layout} from "./layout/Layout"
import {Welcome} from "./pages/Welcome"
import {CreateTodo} from "./pages/CreateTodo"
import {Login} from "./pages/Login"
import {SignUp} from "./pages/SignUp"
import {Todos} from "./pages/Todos"
import {PrivateRoute} from "./components/PrivateRoute"
import {ToastContainer} from "react-toastify"
import {Slide} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import {useDispatch} from "react-redux"
import {initApp} from "./store/slices/appSlice"



function App() {
  const dispatch = useDispatch()
  dispatch(initApp())

  return (
    <>
      <Layout>
        <Switch>
          <Route exact path={"/"}>
            <Welcome />
          </Route>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path={"/signup"}>
            <SignUp />
          </Route>
          <PrivateRoute exact path={"/create"}>
            <CreateTodo />
          </PrivateRoute>
          <PrivateRoute exact path={"/todos"}>
            <Todos />
          </PrivateRoute>
        </Switch>
      </Layout>

      <ToastContainer
        position="top-right"
        transition={Slide}
        autoClose={2000}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </>
  )
}

export default App
