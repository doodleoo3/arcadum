import React from 'react';
import PageContainer from "../../shared/ui/pageContainer/PageContainer";
import PageContainerItem from "../../entities/pageContainerItem/PageContainerItem";

const WaitingPage = () => {
    return (
        <PageContainer>
            <PageContainerItem>
                <h1>WAITING FOR SECOND PLAYER</h1>
                <p>please wait</p>
            </PageContainerItem>
        </PageContainer>
    );
};

export default WaitingPage;