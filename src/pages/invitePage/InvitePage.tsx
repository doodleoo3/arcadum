import React, {useEffect, useState} from 'react';
import Button from "../../shared/ui/button/Button";

const InvitePage = () => {
    const [name, setName] = useState(''); // ИМЯ БУДЕТ БРАТЬСЯ ИЗ TELEGRAM'A
    const [gameID, setGameID] = useState('');

    useEffect(() => {
        const id = Math.random().toString().replace('0.', '');
        setGameID(id);
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div>
            <h2>Play Chess with your friends online</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    placeholder="Display Name"
                />
                <div className="gameId">Game ID: {gameID}</div>
                <hr />
                <p className="invite">Invite your friend over</p>
                {/*<ShareButtons*/}
                {/*    shareText={`https://onchess.xyz?id=${gameID}`}*/}
                {/*    subject="Join me for a game of Chess on Stack Chess"*/}
                {/*/>*/}
                <Button>Create</Button>
            </form>
        </div>
    );
};

export default InvitePage;