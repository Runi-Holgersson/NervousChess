"use strict";
let settings = {
    rowsCount: 8,
    colsCount: 8,
    colsNames: [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`],
    rowsNames: [1, 2, 3, 4, 5, 6, 7, 8],
};
const figures = {
    queen: {
        color: [`b`, `w`],
        startPosition: [`D1`, `D8`],
        src: [`imgChess/qB.png`, `imgChess/qW.png`],
    },
    king: {
        color: [`b`, `w`],
        startPosition: [`E1`, `E8`],
        src: [`imgChess/kingB.png`, `imgChess/kingW.png`],
    },
    rook: {
        color: [`b`, `w`],
        startPosition: [`A1`, `A8`, `H1`, `H8`],
        src: [`imgChess/rookB.png`, `imgChess/rookW.png`],
    },
    knight: {
        color: [`b`, `w`],
        startPosition: [`B1`, `B8`, `G1`, `G8`],
        src: [`imgChess/knightB.png`, `imgChess/knightW.png`],
    },
    bishop: {
        color: [`b`, `w`],
        startPosition: [`C1`, `C8`, `F1`, `F8`],
        src: [`imgChess/bishopB.png`, `imgChess/bishopW.png`],
    }
};

let initChess = {
    settings,
    figures,
    containerElement: null,
    cellElements: [],
    renderBoard() {
        this.containerElement = document.getElementById(`board`);
        this.containerElement.innerHTML = ``;
        for (let row = 0; row < this.settings.rowsCount; row++) {
            const trElement = document.createElement(`tr`);
            trElement.setAttribute(`id`, `${this.settings.rowsNames[row]}`);
            this.containerElement.appendChild(trElement);
            for (let cell = 0; cell < this.settings.colsCount; cell++) {
                const tdElement = document.createElement(`td`);
                tdElement.setAttribute(`id`, `${this.settings.colsNames[cell]}${this.settings.rowsNames[row]}`);
                this.cellElements.push(tdElement);
                                trElement.appendChild(tdElement);
                if ((row + 1) % 2 !== 0 && (cell + 1) % 2 !== 0 || (row + 1) % 2 === 0 && (cell + 1) % 2 === 0) {
                    tdElement.classList.add(`white`);
                } else {
                    tdElement.classList.add(`black`);
                }
            }
        }
        console.dir(this.cellElements);
    },
    initFigures() {
        const pawnsRowBlack = document.getElementById(`2`).children;
        console.dir(pawnsRowBlack);
        for (let i = 0; i < pawnsRowBlack.length; i++) {
            const pawn = document.createElement(`img`);
            pawn.classList.add(`pawn-b`);
            pawn.setAttribute(`src`, `imgChess/pawnB.png`);
            pawnsRowBlack[i].appendChild(pawn);
        }
        const pawnsRowWhite = document.getElementById(`7`).children;
        console.dir(pawnsRowWhite);
        for (let i = 0; i < pawnsRowWhite.length; i++) {
            const pawn = document.createElement(`img`);
            pawn.classList.add(`pawn-w`);
            pawn.setAttribute(`src`, `imgChess/pawnW.png`);
            pawnsRowWhite[i].appendChild(pawn);
        }

        for (let key in this.figures) {
            let newFigure = this.figures[`${key}`];
            for (let i = 0; i < newFigure.color.length; i++) {
                const figure = document.createElement(`img`);
                figure.classList.add(`${key}-${newFigure.color[i]}`);
                figure.setAttribute(`src`, `${newFigure.src[i]}`);
                document.getElementById(`${newFigure.startPosition[i]}`).appendChild(figure);
                if (newFigure.startPosition.length > 2) {
                    const figure = document.createElement(`img`);
                    figure.classList.add(`${key}-${newFigure.color[i]}`);
                    figure.setAttribute(`src`, `${newFigure.src[i]}`);
                    document.getElementById(`${newFigure.startPosition[i + 2]}`).appendChild(figure);
                }
            }
        }
    },
    focus() {
        const imgCollection = document.querySelectorAll(`td>img`); //htmlCollection
        for (let i = 0; i < imgCollection.length; i++) {
            imgCollection[i].addEventListener(`click`,
                () => {
                    const movingFigure = event.target;
                    movingFigure.classList.toggle(`active`);

                   for (let j = 0; j < imgCollection.length; j++){
                       console.log(imgCollection[j].parentElement.id);
                        if (imgCollection[j].parentElement.id!==movingFigure.parentElement.id){
                            imgCollection[j].classList.remove(`active`);
                        }
                    }
                    console.dir(movingFigure.classList);
                });
        }
    },
};
document.onload = initChess.renderBoard();
document.onload = initChess.initFigures();
document.onload = initChess.focus();
