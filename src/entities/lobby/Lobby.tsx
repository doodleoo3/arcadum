import React, { FC, useContext, useState } from 'react';
import styles from './Lobby.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../widgets/game/board/lib/context/GameContext';
import { types } from '../../widgets/game/board/lib/context/GameTypes';

interface LobbyProps {
    lobbyName: string;
    bet: number | string;
    time: number;
    status: 'join' | 'delete';
    gameUuid?: string;
    handleIsLobbyDeleted?: (isLobbyDeletedParams: boolean) => void;
}
const Lobby: FC<LobbyProps> = ({ lobbyName, bet, status, time, handleIsLobbyDeleted, gameUuid }) => {
    const { dispatch } = useContext(GameContext);

    const navigate = useNavigate();
    function deleteLobby() {
        axios
            .delete('https://www.malccement.ru/delete', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                handleIsLobbyDeleted && handleIsLobbyDeleted(true);
            })
            .catch((error) => handleIsLobbyDeleted && handleIsLobbyDeleted(false));
    }

    function joinLobby() {
        axios
            .post(
                'https://www.malccement.ru/join',
                {
                    gameUuid: gameUuid,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => {
                dispatch({ type: types.SET_GAME_UUID, uuid: gameUuid! });
                navigate(`/game?token=${gameUuid}`);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className={styles.lobby}>
            <p>@{lobbyName} LOBBY</p>
            <p>TIME: {time}:00</p>
            <p>BET: {bet}$SOL</p>
            <button onClick={status === 'join' ? joinLobby : deleteLobby}>{status}</button>
        </div>
    );
};

export default Lobby;
