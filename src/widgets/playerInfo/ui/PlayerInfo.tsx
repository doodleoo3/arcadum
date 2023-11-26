import React, {FC} from 'react';
import Timer from "../../../entities/timer/ui/Timer";
import styles from "./PlayerInfo.module.scss"
interface PlayerInfoProps {
    isOpponent?: boolean
    playerName?: string
    lastMatches?: string[]
}

const PlayerInfo:FC<PlayerInfoProps> = ({isOpponent, playerName, lastMatches}) => {
    return (
        <div className={`${styles.player__info} ${isOpponent ? styles.opponent : ""}`}>
            <div className={styles.top__side__wrapper}>
                <div className={styles.player__info__wrapper}>
                    <img className={styles.avatar} src="" alt=""/>
                    <h3>@TGUSERNAME</h3>
                </div>
                {isOpponent
                    ? <Timer isOpponent={isOpponent}/>
                    : <Timer/>
                }
            </div>
            <div className={styles.last__matches__wrapper}>
                <h3>L</h3>
                <h3>L</h3>
                <h3>L</h3>
                <h3>L</h3>
                <h3>L</h3>
            </div>


            {/*<h1>{playerName}</h1>*/}

            {/*<p>*/}
            {/*    {lastMatches.map(match =>*/}
            {/*        match === "lose"*/}
            {/*        ? <span>L</span> : <span>W</span>*/}
            {/*    )}*/}
            {/*</p>*/}
        </div>
    );
};

export default PlayerInfo;