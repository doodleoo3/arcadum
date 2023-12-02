import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes, useSearchParams} from "react-router-dom";
import GamePage from "../../pages/gamePage/GamePage";
import GameOverPage from "../../pages/gameOverPage/GameOverPage";
import JoinGamePage from "../../pages/joinGamePage/JoinGamePage";
import CreateGamePage from "../../pages/createGamePage/CreateGamePage";
import LobbyPage from "../../pages/lobbyPage/LobbyPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/app/game_over" element={<GameOverPage/>} />
                <Route path="/app/create" element={<CreateGamePage/>} />
                <Route path="/app/game" element={<GamePage/>} />
                <Route path="/app/lobbies" element={<LobbyPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;