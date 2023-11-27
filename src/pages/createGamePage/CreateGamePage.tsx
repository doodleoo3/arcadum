import React, {useEffect} from 'react';
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import {useTelegram} from "../../shared/lib/hooks/useTelegram";

const CreateGamePage = () => {
    const {tg} = useTelegram();

    useEffect(() => {
        tg.MainButton.text("INVITE FRIENDS")
        tg.MainButton.isVisible(true)
        tg.MainButton.isActive(true)
    }, []);

    return (
        <PageContainer>
            <div>
                <h1>CREATE NEW GAME</h1>
                <p>WITH YOUR FRIENDS</p>
            </div>

            <div>
                <h1>YOUR INVITE CODE</h1>
                <p>INVITE CODE</p>
            </div>
        </PageContainer>
    );
};

export default CreateGamePage;