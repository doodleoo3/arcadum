import React, { useEffect, useState } from 'react';
import PageContainer from '../../shared/ui/pageContainer/PageContainer';
import { useTelegram } from '../../shared/lib/hooks/useTelegram';
import styles from './CreateGamePage.module.scss';
import PageContainerItem from '../../entities/pageContainerItem/PageContainerItem';
import ParamsBtn from '../../shared/ui/paramsBtn/ParamsBtn';
import axios from 'axios';
import Lobby from '../../entities/lobby/Lobby';
import { useSearchParams } from 'react-router-dom';

interface ISolPriceRequest {
    solana: {
        usd: number;
    };
}

const CreateGamePage = () => {
    // const {tg} = useTelegram();

    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

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

    const handleTimeSelect = (time: number) => {
        setSelectedTime(time);
    };

    const handleCostSelect = (cost: number) => {
        setSelectedCost(cost);
    };

    const handleIsLobbyDeleted = (isDeleted: boolean) => {
        setIsLobbyDeleted(isDeleted);
    };

    const handleCreateLobby = () => {
        axios
            .post(
                'https://www.malccement.ru/create',
                {
                    // bet: solPrice && (selectedCost / solPrice).toFixed(2),
                    bet: 0.0001,
                    time: selectedTime,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            )
            .then((res) => {
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
        const gameIsExistRequest = axios.get('https://www.malccement.ru/game', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
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
                                {time / 60 + ':00'}
                            </ParamsBtn>
                        ))}
                    </div>
                </div>

                <div className={styles.params}>
                    <p>SELECT GAME COST:</p>
                    <div className={styles.btn__container}>
                        {[0, 0.5, 1].map((cost) => (
                            <ParamsBtn
                                key={cost}
                                onClick={() => handleCostSelect(cost)}
                                isActive={selectedCost === cost}
                            >
                                {`${solPrice ? (1 / solPrice).toFixed(3) + ' SOL' : 'LOADING...'}`}
                            </ParamsBtn>
                        ))}
                    </div>
                </div>
            </PageContainerItem>

            <PageContainerItem>
                <div className={styles.create__lobby__wrapper}>
                    {isLobbyCreated && !isLobbyDeleted ? (
                        <Lobby
                            lobbyName={''}
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
