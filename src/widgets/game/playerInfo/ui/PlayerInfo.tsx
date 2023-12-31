import React, { FC, useContext, useEffect, useState } from 'react';
import Timer from '../../../../entities/timer/ui/Timer';
import styles from './PlayerInfo.module.scss';
import { useTelegram } from '../../../../shared/lib/hooks/useTelegram';
import { GameContext } from '../../board/lib/context/GameContext';
interface PlayerInfoProps {
    isOpponent?: boolean;
    playerName?: string;
    lastMatches?: string[];
}

const PlayerInfo: FC<PlayerInfoProps> = ({ isOpponent, playerName, lastMatches }) => {
    const { tg, user } = useTelegram();
    const [avatar, setAvatar] = useState('');

    const { state } = useContext(GameContext);

    useEffect(() => {
        if (tg.colorScheme === 'light') {
            setAvatar('/assets/images/no-avatar-black.png');
        } else {
            setAvatar('/assets/images/no-avatar-white.png');
        }
    }, [tg]);

    return (
        <div className={`${styles.player__info} ${isOpponent ? styles.opponent : ''}`}>

            <div className={styles.top__side__wrapper}>
                <div className={styles.player__info__wrapper}>
                    <img className={styles.avatar} src={user.photo_url ? user.photo_url : avatar} alt=""/>
                    <h3>@{isOpponent ? state.opponentName : state.playerName}</h3>
                </div>
                {isOpponent ? <Timer isOpponent={isOpponent} /> : <Timer />}
            </div>
        </div>
    );
};

export default PlayerInfo;
