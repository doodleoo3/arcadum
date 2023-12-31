import React, { useContext, useEffect, useState } from 'react';
import PageContainer from '../../shared/ui/pageContainer/PageContainer';
import { useTelegram } from '../../shared/lib/hooks/useTelegram';
import styles from './CreateGamePage.module.scss';
import PageContainerItem from '../../entities/pageContainerItem/PageContainerItem';
import ParamsBtn from '../../shared/ui/paramsBtn/ParamsBtn';
import axios from 'axios';
import Lobby from '../../entities/lobby/Lobby';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { types } from '../../widgets/game/board/lib/context/GameTypes';
import { GameContext } from '../../widgets/game/board/lib/context/GameContext';

interface ISolPriceRequest {
    solana: {
        usd: number;
    };
}

const CreateGamePage = () => {
    // const {tg} = useTelegram();

    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);

    const [selectedTime, setSelectedTime] = useState<number>(600);
    const [selectedCost, setSelectedCost] = useState<number>(5);

    const [isEnoughSol, setIsEnoughSol] = useState<boolean>(true);
    const [isLobbyCreated, setIsLobbyCreated] = useState<boolean>(false);
    const [isLobbyDeleted, setIsLobbyDeleted] = useState<boolean>(false);

    const [solPrice, setSolPrice] = useState<number | null>(null);

    const { dispatch } = useContext(GameContext);

    useEffect(() => {
        setInterval(() => {
            const gameResponse = axios.post(
                'https://www.malccement.ru/game',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            try {
                gameResponse.then((res) => setShouldRedirect(res.data.status === 'in_progress'));
            } catch (e) {}
        }, 300);
    }, []);

    useEffect(() => {
        if (shouldRedirect) {
            navigate('/game');
        }
    }, [shouldRedirect, navigate]);

    const handleTimeSelect = (time: number) => {
        setSelectedTime(time);
    };

    const handleCostSelect = (cost: number) => {
        setSelectedCost(cost);
    };

    const handleIsLobbyDeleted = (isDeleted: boolean) => {
        setIsLobbyDeleted(isDeleted);
    };

    const { tg, user } = useTelegram();

    const handleCreateLobby = () => {
        axios
            .post(
                'https://www.malccement.ru/create',
                {
                    // bet: solPrice && (selectedCost / solPrice).toFixed(2),
                    bet: selectedCost,
                    time: selectedTime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => {
                dispatch({ type: types.SET_GAME_UUID, uuid: res.data.uuid });

                setIsEnoughSol(true);
                setIsLobbyCreated(true);
            })
            .catch((error) => setIsEnoughSol(false));
    };

    useEffect(() => {
        const solPriceRequest = axios.get<ISolPriceRequest>(
            'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
        );
        try {
            solPriceRequest.then((res) => {
                setSolPrice(res.data.solana.usd);
            });
        } catch (e) {
            setSolPrice(null);
        }
    }, []);

    useEffect(() => {
        const gameIsExistRequest = axios.post(
            'https://www.malccement.ru/game',
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        );
        gameIsExistRequest
            .then((res) => {
                res.headers['content-length'] !== '0' ? setIsLobbyCreated(true) : setIsLobbyCreated(false);
            })
            .catch((error) => setIsLobbyCreated(false));
    }, []);

    return (
        <PageContainer>
            <PageContainerItem>
                <div className={styles.title__wrapper}>
                    <h1>CREATE A NEW GAME</h1>
                </div>

                <div className={styles.params}>
                    <p>SELECT GAME TIME:</p>
                    <div className={styles.btn__container}>
                        {[300, 600, 900].map((time) => (
                            <ParamsBtn
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                isActive={selectedTime === time}
                            >
                                {(time / 60) + ':00'}
                            </ParamsBtn>
                        ))}
                    </div>
                </div>

                <div className={styles.params}>
                    <p>SELECT GAME COST:</p>
                    <div className={styles.btn__container}>
                        {[0, 0.5, 1].map((cost) => (
                            cost === 0
                                ? <ParamsBtn
                                    key={cost}
                                    onClick={() => handleCostSelect(cost)}
                                    isActive={selectedCost === cost}
                                >
                                  {`0 SOL`}
                                </ParamsBtn>

                                : <ParamsBtn
                                    key={cost}
                                    onClick={() => handleCostSelect(cost)}
                                    isActive={selectedCost === cost}
                                >
                                  {`${solPrice ? (cost / solPrice).toFixed(3) + ' SOL' : 'LOADING...'}`}
                                </ParamsBtn>

                        ))}
                    </div>
                </div>
            </PageContainerItem>

            <PageContainerItem>
                <div className={styles.create__lobby__wrapper}>
                    {isLobbyCreated && !isLobbyDeleted ? (
                        <Lobby
                            lobbyName={`${user.username}`}
                            bet={solPrice ? (selectedCost / solPrice).toFixed(2) : 0}
                            time={selectedTime / 60}
                            handleIsLobbyDeleted={handleIsLobbyDeleted}
                            status="delete"
                        />
                    ) : (
                        <>
                            <button onClick={handleCreateLobby} className={styles.create__lobby}>
                                CREATE LOBBY
                            </button>
                            {!isEnoughSol && <p>YOU DONT HAVE ENOUGH $SOL ON YOUR WALLET</p>}
                        </>
                    )}
                </div>
            </PageContainerItem>

            {isLobbyCreated ? (
                <PageContainerItem>
                    <h1>WAITING FOR SECOND PLAYER...</h1>
                </PageContainerItem>
            ) : (
                <div className={styles.__blank}></div>
            )}
        </PageContainer>
    );
};

export default CreateGamePage;
