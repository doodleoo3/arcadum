import React, {useEffect, useState} from 'react';
import "./styles/index.scss"
import {GameProvider} from "../widgets/game/board/lib/context/GameContext";
import Header from "../widgets/header/ui/header/Header";
import {useTelegram} from "../shared/lib/hooks/useTelegram";
import AppRouter from "./router/AppRouter";

function App() {
    const {tg} = useTelegram()
    const [bgImage, setBgImage] = useState<string | null>(null);

    useEffect(() => {
        tg.ready();
        tg.expand()
    }, []);

    useEffect(() => {
        if (tg.colorScheme === "light") {
            setBgImage("/assets/images/arcadum-bg-light.png")
        } else {
            setBgImage("/assets/images/arcadum-bg-black.png")
        }
    }, [tg]);

    return (
            <GameProvider>
                <div className="App" style={tg.colorScheme === "light" && bgImage ? {backgroundImage: `url(${bgImage})`} : {backgroundImage: `url(${bgImage})`}}>
                    <Header/>
                    <AppRouter/>
                </div>
            </GameProvider>
      );
}

export default App;
