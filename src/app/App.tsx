import React, {useEffect} from 'react';
import GamePage from "../pages/gamePage/GamePage";
import "./styles/index.scss"
import {GameProvider} from "../widgets/game/board/lib/context/GameContext";
import Header from "../widgets/header/ui/header/Header";
import Footer from "../widgets/footer/ui/footer/Footer";
import {useTelegram} from "../shared/lib/hooks/useTelegram";

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
                <GamePage/>
                <Footer/>
            </div>
        </GameProvider>
      );
}

export default App;
