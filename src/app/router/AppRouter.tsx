import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import GamePage from "../../pages/gamePage/GamePage";
import GameOverPage from "../../pages/gameOverPage/GameOverPage";
import JoinGamePage from "../../pages/joinGamePage/JoinGamePage";
import CreateGamePage from "../../pages/createGamePage/CreateGamePage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CreateGamePage/>}/>
                <Route path="/game_over" element={<GameOverPage/>} />
                <Route path="/join" element={<JoinGamePage/>} />
                <Route path="/create" element={<CreateGamePage/>} />
                <Route path="/game" element={<GamePage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;