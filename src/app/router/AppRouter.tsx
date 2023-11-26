import React from 'react';
import {Route, Routes} from "react-router-dom";
import GamePage from "../../pages/gamePage/GamePage";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<GamePage/>}></Route>
        </Routes>
    );
};

export default AppRouter;