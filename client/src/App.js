import React from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={() => <Navigate to="/posts"/>}/>
                <Route path="/posts" exact Component={Home}/>
                <Route path="/posts/search" exact Component={Home}/>
                <Route path="/posts/:id" Component={PostDetails}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;