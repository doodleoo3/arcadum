import React, { useEffect, useState } from 'react';
import PageContainer from '../../shared/ui/pageContainer/PageContainer';
import axios from 'axios';
import Lobby from '../../entities/lobby/Lobby';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LobbyContainer from '../../entities/lobbyContainer/LobbyContainer';
import styles from './LobbyPage.module.scss';
interface IGame {
    uuid: string;
    name: string;
    status: string;
    bet: number;
    time: number;
    createdAt: string;
}

const LobbyPage = () => {
    const [searchParams] = useSearchParams();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    const [games, setGames] = useState<[IGame] | null>(null);

    useEffect(() => {
        const gameResponse = axios.post<IGame>('https://www.malccement.ru/game', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        try {
            gameResponse.then((res) => setShouldRedirect(res.data.status === 'in_progress'));
        } catch (e) {}
    }, []);

    useEffect(() => {
        if (shouldRedirect) {
            navigate('/game');
        }
    }, [shouldRedirect, navigate]);

    useEffect(() => {
        const gamesResponse = axios.get<[IGame]>('https://www.malccement.ru/games', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        try {
            gamesResponse.then((res) => setGames(res.data));
        } catch (e) {
            setGames(null);
        }
    }, []);

    return (
        <LobbyContainer>
            {games ? (
                games.length > 0 ? (
                    <>
                        {games.map((game) => (
                            <Lobby
                                key={game.uuid}
                                lobbyName={game.name}
                                bet={game.bet}
                                time={game.time}
                                gameUuid={game.uuid}
                                status="join"
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h1 className={styles.not__found}>LOBBIES NOT FOUND</h1>
                        <a href="">CREATE GAME</a>
                    </>
                )
            ) : (
                <>
                    <h1 className={styles.not__found}>LOBBIES NOT FOUND</h1>
                    <a href="">CREATE GAME</a>
                </>
            )}
        </LobbyContainer>
    );
};

export default LobbyPage;
