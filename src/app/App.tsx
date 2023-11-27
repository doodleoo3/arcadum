import React, {useEffect} from 'react';
import GamePage from "../pages/gamePage/GamePage";
import "./styles/index.scss"
import {GameProvider} from "../widgets/game/board/lib/context/GameContext";
import Header from "../widgets/header/ui/header/Header";
import GamePageFooter from "../widgets/footer/ui/gamePageFooter/GamePageFooter";
import {useTelegram} from "../shared/lib/hooks/useTelegram";
import CreateGamePage from "../pages/createGamePage/CreateGamePage";

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
                <CreateGamePage/>
                {/*<GamePage/>*/}
                {/*<GamePageFooter/>*/}
            </div>
        </GameProvider>
      );
}

export default App;
