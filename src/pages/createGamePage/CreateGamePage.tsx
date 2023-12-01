import React, {useEffect, useState} from 'react';
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";
import styles from "./CreateGamePage.module.scss"
import {faCopy} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";
import ParamsBtn from "../../shared/ui/paramsBtn/ParamsBtn";
import {useSolPrice} from "../../shared/lib/hooks/useSolPrice";
const CreateGamePage = () => {
    const {tg} = useTelegram();

    const [selectedTime, setSelectedTime] = useState<number>(300);
    const [selectedCost, setSelectedCost] = useState<string>("5");
    const [gameCode, setGameCode] = useState(generateUniqueCode)
    const [solPrice, setSolPrice] = useState<number | null>(null)


    useSolPrice().then(res => setSolPrice(res))
    // useEffect(() => {
    //     // console.log(solPrice)
    // }, [solPrice]);
    function generateUniqueCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 16; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleTimeSelect = (time: number) => {
        setSelectedTime(time);
    };

    const handleCostSelect = (cost: string) => {
        setSelectedCost(cost);
    };

    useEffect(() => {
        setGameCode(generateUniqueCode)
        // handleSubmit()
    }, [selectedTime, selectedCost]);

    // const handleSubmit = () => {
    //     // Логика отправки данных на сервер
    //     const gameData = {
    //         time: selectedTime,
    //         cost: selectedCost,
    //         // ... другие данные ...
    //     };
    //     // Отправка данных gameData на сервер
    // };

    useEffect(() => {
        tg.MainButton.setParams({
            text: "INVITE FRIENDS",
            is_active: true,
            is_visible: true
        })
    }, []);

    return (
        <PageContainer>
            <PageContainerItem>
                <div className={styles.title__wrapper}><h1>CREATE A NEW GAME</h1></div>

                <div className={styles.params}>
                    <p>SELECT GAME TIME:</p>
                    <div className={styles.btn__container}>
                        {[60, 300, 600].map(time => (
                            <ParamsBtn
                                key={time}
                                onClick={() => handleTimeSelect(time)}
                                isActive={selectedTime === time}
                            >
                                {time / 60 + ":00"}
                            </ParamsBtn>
                        ))}
                    </div>
                </div>

                <div className={styles.params}>
                    <p>SELECT GAME COST:</p>
                    <div className={styles.btn__container}>
                        {[`1$ ≈ ${solPrice ? (1 / solPrice).toFixed(2) + "$SOL" : "LOADING..."}`, `5$ ≈ ${solPrice ? (5 / solPrice).toFixed(2) + "$SOL" : "LOADING..."}`, `10$ ≈ ${solPrice ? (10 / solPrice).toFixed(2) + "$SOL" : "LOADING..."}`].map(cost => (
                            <ParamsBtn
                                key={cost}
                                onClick={() => handleCostSelect(cost)}
                                isActive={selectedCost === cost}
                            >
                                {cost}
                            </ParamsBtn>
                        ))}
                    </div>
                </div>
            </PageContainerItem>

            <PageContainerItem>
                <div className={styles.title__wrapper}><h1>YOUR INVITE CODE</h1></div>
                <div className={styles.invite__wrapper}><p className={styles.invite__code}>{gameCode} <FontAwesomeIcon icon={faCopy}/></p></div>
                <div></div>
            </PageContainerItem>


            <PageContainerItem>
                <h1>WAITING FOR SECOND PLAYER...</h1>
            </PageContainerItem>
            {/*<div className={styles.__blank}></div>*/}
        </PageContainer>
    );
};

export default CreateGamePage;