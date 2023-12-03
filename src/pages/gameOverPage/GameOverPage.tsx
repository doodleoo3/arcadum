import React, { useContext, useEffect, useState } from 'react';
import styles from './GameOverPage.module.scss';
import { GameContext } from '../../widgets/game/board/lib/context/GameContext';
import PageContainerItem from '../../entities/pageContainerItem/PageContainerItem';
import PageContainer from '../../shared/ui/pageContainer/PageContainer';
import { useTelegram } from '../../shared/lib/hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const GameOverPage = () => {
    const { state } = useContext(GameContext);
    const [winner, setWinner] = useState<string | null>(null);
    const { tg, user } = useTelegram();

    const [bet, setBet] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('https://www.malccement.ru/game', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((result) => {
                const data = result.data;

                setBet(data.bet);

                if (data.winner.side === 'w') {
                    setWinner('white');
                    localStorage.setItem('winner', 'white');
                } else {
                    setWinner('black');
                    localStorage.setItem('winner', 'black');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

    useEffect(() => {
        if (state.status === 'checkmate') {
            if (state.turn === 'b') {
                setWinner('white');
                localStorage.setItem('winner', 'white');
            } else {
                setWinner('black');
                localStorage.setItem('winner', 'black');
            }
        }
    }, [state.status, state.turn]);

    return (
        <PageContainer>
            <PageContainerItem>
                <h1>GAME OVER</h1>
                {state.status === 'draw' || state.status === 'stalemate' ? (
                    <>{localStorage.getItem('status') ? localStorage.getItem('status') : state.status}</>
                ) : (
                    <>
                        <p>
                            @{user.username} WON PLAYING FOR{' '}
                            {winner ? winner?.toUpperCase() : localStorage.getItem('winner')}
                        </p>
                        <p>REASON: {localStorage.getItem('status') ? localStorage.getItem('status') : state.status}</p>
                    </>
                )}
            </PageContainerItem>

            <PageContainerItem>
                <h1>REWARD</h1>
                {state.status === 'draw' || state.status === 'stalemate' ? (
                    <p>{bet} SOL REMAINS IN YOUR WALLET</p>
                ) : (
                    <p>{bet} SOL HAVE ALREADY BEEN SENT TO THE WINNER</p>
                )}
                <div></div>
            </PageContainerItem>

            <PageContainerItem>
                <div className={styles.new__game__btn}>
                    <button onClick={() => navigate('/create')}>CREATE A NEW GAME</button>
                    <button onClick={() => navigate('/lobbies')}>JOIN A NEW GAME</button>
                </div>
            </PageContainerItem>
        </PageContainer>
    );
};

export default GameOverPage;
