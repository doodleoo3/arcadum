import React, { useEffect, useState } from "react";
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import axios from "axios";
import Lobby from "../../entities/lobby/Lobby";
import { useSearchParams } from "react-router-dom";
import LobbyContainer from "../../entities/lobbyContainer/LobbyContainer";

interface IGame {
  uuid: string;
  name: string;
  bet: number;
  time: number;
  createdAt: string;
}

const LobbyPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const [games, setGames] = useState<[IGame] | null>(null);

  useEffect(() => {
    const gamesResponse = axios.get<[IGame]>("https://www.malccement.ru/games", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    try {
      gamesResponse.then((res) => setGames(res.data));
    } catch (e) {
      setGames(null);
    }
  }, []);

  console.log(games?.length);

  return (
    <LobbyContainer>
      {games ? (
        <>
          {games.map((game) => (
            <Lobby key={game.uuid} lobbyName={game.name} bet={game.bet} time={game.time} gameUuid={game.uuid} status="join" />
          ))}
        </>
      ) : (
        <>LOBBIES NOT FOUND</>
      )}
    </LobbyContainer>
  );
};

export default LobbyPage;
