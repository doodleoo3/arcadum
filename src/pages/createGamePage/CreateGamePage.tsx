import React, {useEffect, useState} from 'react';
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";
import styles from "./CreateGamePage.module.scss"
import {faCopy} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";
import ParamsBtn from "../../shared/ui/paramsBtn/ParamsBtn";
const CreateGamePage = () => {
    const {tg} = useTelegram();

    const [selectedTime, setSelectedTime] = useState<number | null>(null);
    const [selectedCost, setSelectedCost] = useState<number | null>(null);

    useEffect(() => {
        tg.MainButton.setParams({
            text: "INVITE FRIENDS",
            color: tg.themeParams.secondary_bg_color,
            text_color: tg.themeParams.text_color,
            is_active: true,
            is_visible: true
        })
    }, []);

    const handleTimeSelect = (time: number) => {
        setSelectedTime(time);
    };

    const handleCostSelect = (cost: number) => {
        setSelectedCost(cost);
    };

    // const handleSubmit = () => {
    //     // Логика отправки данных на сервер
    //     const gameData = {
    //         time: selectedTime,
    //         cost: selectedCost,
    //         // ... другие данные ...
    //     };
    //     // Отправка данных gameData на сервер
    // };

    return (
        <PageContainer>
            <PageContainerItem>
                <h1>CREATE A NEW GAME</h1>
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
                        {[1, 5, 10].map(cost => (
                            <ParamsBtn
                                key={cost}
                                onClick={() => handleCostSelect(cost)}
                                isActive={selectedCost === cost}
                            >
                                {cost + "$"}
                            </ParamsBtn>
                        ))}
                    </div>
                </div>
            </PageContainerItem>

            <PageContainerItem>
                <h1>YOUR INVITE CODE</h1>
                <p className={styles.invite__code}>INVITE CODE <FontAwesomeIcon icon={faCopy}/></p>
                <div></div>
            </PageContainerItem>

            <div className={styles.__blank}></div>
        </PageContainer>
    );
};

export default CreateGamePage;