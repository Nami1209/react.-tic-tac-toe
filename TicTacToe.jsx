// src/TickTacToe.jsx
import React, { useState } from 'react';
import './style.css';
import excitedGif from './excited.gif';
import tingMp3 from './ting.mp3';

function TickTacToe() {
    const [turn, setTurn] = useState("X");
    const [isGameOver, setIsGameOver] = useState(false);
    const [boxes, setBoxes] = useState(Array(9).fill(''));
    const [lineStyle, setLineStyle] = useState({ width: '0vw' });

    const audioTurn = new Audio(tingMp3);

    const changeTurn = () => {
        return turn === "X" ? "O" : "X";
    };

    const checkWin = () => {
        const Wins = [
            [0, 1, 2, -20, 5, 0],
            [3, 4, 5, -20, 15, 0],
            [6, 7, 8, -20, 25, 0],
            [0, 3, 6, -31, 15, 90],
            [1, 4, 7, -21, 15, 90],
            [2, 5, 8, -11, 15, 90],
            [0, 4, 8, -20, 15, 45],
            [2, 4, 6, -20, 15, 135],
        ];

        Wins.forEach(e => {
            if ((boxes[e[0]] === boxes[e[1]]) &&
                (boxes[e[2]] === boxes[e[1]]) &&
                (boxes[e[0]] !== "")) {

                setIsGameOver(true);
                document.querySelector('.info').innerText = `${boxes[e[0]]} Won`;
                document.querySelector('.imgbox img').style.width = "200px";
                setLineStyle({
                    width: '30vw',
                    transform: `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
                });
            }
        });
    };

    const handleBoxClick = (index) => {
        if (boxes[index] === '' && !isGameOver) {
            const newBoxes = [...boxes];
            newBoxes[index] = turn;
            setBoxes(newBoxes);
            setTurn(changeTurn());
            audioTurn.play();
            checkWin();
        }
    };

    const handleReset = () => {
        setBoxes(Array(9).fill(''));
        setTurn("X");
        setIsGameOver(false);
        document.querySelector('.info').innerText = `Turn for ${turn}`;
        document.querySelector('.imgbox img').style.width = "0px";
        setLineStyle({ width: '0vw' });
    };

    return (
        <div className="gameContainer">
            <div className="line" style={lineStyle}></div>
            <div className="container">
                {boxes.map((value, index) => (
                    <div
                        key={index}
                        className={`box ${index % 3 === 0 ? 'bl-0' : ''} ${index % 3 === 2 ? 'br-0' : ''} ${Math.floor(index / 3) === 0 ? 'bt-0' : ''} ${Math.floor(index / 3) === 2 ? 'bb-0' : ''}`}
                        onClick={() => handleBoxClick(index)}
                    >
                        <span className="boxtext">{value}</span>
                    </div>
                ))}
            </div>
            <div className="gameInfo">
                <h1>Welcome to Tic Tac Toe MyFunGames</h1>
                <div>
                    <span className="info">Turn for {turn}</span>
                    <button id="reset" onClick={handleReset}>Reset</button>
                </div>
                <div className="imgbox">
                    <img src={excitedGif} alt="" />
                </div>
            </div>
        </div>
    );
}

export default TickTacToe;
