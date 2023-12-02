import React, {useEffect, useState} from 'react';
import "./styles/index.scss"
import {GameProvider} from "../widgets/game/board/lib/context/GameContext";
import Header from "../widgets/header/ui/header/Header";
import {useTelegram} from "../shared/lib/hooks/useTelegram";
import AppRouter from "./router/AppRouter";
import {useSearchParams} from "react-router-dom";

function App() {
    const {tg} = useTelegram()

    useEffect(() => {
        tg.ready();
        tg.expand()
    }, []);




    return (
            <GameProvider>
                {/*<div className="App">*/}
                <div className="App" style={tg.colorScheme === "light" ? {backgroundImage: `url("/assets/images/arcadum-bg-light.png")`} : {backgroundImage: `url("/assets/images/arcadum-bg-dark.png")`}}>
                    <Header/>
                    <AppRouter/>
                </div>
            </GameProvider>
      );
}

export default App;
