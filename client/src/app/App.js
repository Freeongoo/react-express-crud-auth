import About from "./pages/about/About"
import { Route, Switch } from "react-router-dom"
import React from 'react'
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import UserEdit from "./pages/userEdit/UserEdit"
import NotFound from "./pages/notFound/NotFound"
import UserCreate from "./pages/userCreate/UserCreate"

const App = () => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/create" exact component={UserCreate}/>
        <Route path="/user/:userId" exact component={UserEdit}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/about" exact component={About}/>
        <Route component={NotFound} />
    </Switch>
)

export default App