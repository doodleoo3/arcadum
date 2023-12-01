import React, {useEffect} from 'react';
import "./styles/index.scss"
import {GameProvider} from "../widgets/game/board/lib/context/GameContext";
import Header from "../widgets/header/ui/header/Header";
import {useTelegram} from "../shared/lib/hooks/useTelegram";
import AppRouter from "./router/AppRouter";

function App() {
    const {tg} = useTelegram()

    useEffect(() => {
        tg.ready();
        tg.expand()
    }, []);

    return (
            <GameProvider>
                <div className="App">
                    <Header/>
                    <AppRouter/>
                </div>
            </GameProvider>
      );
}

export default App;
