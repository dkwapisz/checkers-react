import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
            prevTime: null,
            player: 600000, // [ms] => 10 min
            timer: undefined,
            isCounting: true,
        }
    }

    render() {
        return ((this.state.player / 1000))
    }

    decreaseTime = () => {

        let current = Date.now()

        if (this.state.isCounting) {
            // eslint-disable-next-line
            this.state.player = Math.max(this.state.player - (current - this.state.prevTime), 0)
        }

        // eslint-disable-next-line
        this.state.prevTime = current

    }

    createTimer = () => {
        return setInterval(() => {
            this.decreaseTime()
        }, 1000)
    }

    play() {

        if (this.state.timer === undefined) {
            // eslint-disable-next-line
            this.state.prevTime = Date.now()
            // eslint-disable-next-line
            this.state.timer = this.createTimer()
        } else {
            // eslint-disable-next-line
            this.state.isCounting = true
        }

    }

    stop() {
        // eslint-disable-next-line
        this.state.isCounting = false
    }
}

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'null',
            xLoc: 'null',
            yLoc: 'null',
            color: "white"
        }
    }

    render() {

        let square

        if ((this.props.xLoc + this.props.yLoc) % 2 === 0) {
            square = "square1"
        } else {
            square = "square2"
        }

        return (
            <button className={square} onClick={() => this.props.onClick()}>
                <div className={this.props.value} style={{backgroundColor: this.props.color}}> </div>
            </button>
        )
    }
}

class Board extends React.Component {

    constructor(props) {
        super(props)
        const timerP1 = new Timer()
        const timerP2 = new Timer()
        this.state = {
            board: [
                [' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R'],
                ['R', ' ', 'R', ' ', 'R', ' ', 'R', ' '],
                [' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['B', ' ', 'B', ' ', 'B', ' ', 'B', ' '],
                [' ', 'B', ' ', 'B', ' ', 'B', ' ', 'B'],
                ['B', ' ', 'B', ' ', 'B', ' ', 'B', ' '],
            ],
            redTurn: true,
            clicked: false,
            clickedX: 0,
            clickedY: 0,
            clickedVal: ' ',
            beatingX: null,
            beatingY: null,
            history: [[
                [' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R'],
                ['R', ' ', 'R', ' ', 'R', ' ', 'R', ' '],
                [' ', 'R', ' ', 'R', ' ', 'R', ' ', 'R'],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
                ['B', ' ', 'B', ' ', 'B', ' ', 'B', ' '],
                [' ', 'B', ' ', 'B', ' ', 'B', ' ', 'B'],
                ['B', ' ', 'B', ' ', 'B', ' ', 'B', ' '],
            ]],
            whichTurnHistory: [true],
            timerRed: timerP1,
            timerBlack: timerP2,
        };

        // bez tego, timery (głównie czarny) mają delikatnego laga przy uruchamianiu strony
        this.state.timerRed.play()
        this.state.timerBlack.play()
        this.state.timerRed.stop()
        this.state.timerBlack.stop()

        setInterval(() => {
            document.getElementById("redTimer").innerHTML = "Red Player Timer: " + Math.round(this.state.timerRed.render())
            document.getElementById("blackTimer").innerHTML = "Black Player Timer: " + Math.round(this.state.timerBlack.render())

            if (this.state.timerRed.render() === 0) {
                alert("Game Over! Black wins!")
                window.location.reload()
            } else if (this.state.timerBlack.player === 0) {
                alert("Game Over! Red wins!")
                window.location.reload()
            }

        }, 1000)
    }

    checkMovement(xLoc, yLoc, possibleMovement) {
        let isPossible = false

        for (let i = 0; i < possibleMovement.length; i++) {
            for (let j = 0; j < 2; j++) {
                if ((xLoc - this.state.clickedX) === possibleMovement[i][0] && (yLoc - this.state.clickedY) === possibleMovement[i][1]) {
                    isPossible = true
                }
            }
        }

        return isPossible
    }

    isBeating() {
        const x = this.state.board.slice()
        let pawnColor
        let pawnEnemyColor
        let pawnQueen
        let pawnEnemyQueen
        let nothing = ' '
        let beating = []

        if (this.state.redTurn) {
            pawnColor = 'R'
            pawnEnemyColor = 'B'
            pawnQueen = 'QR'
            pawnEnemyQueen = 'QB'
        } else {
            pawnColor = 'B'
            pawnEnemyColor = 'R'
            pawnQueen = 'QB'
            pawnEnemyQueen = 'QR'
        }

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                if (i < 6 && j < 6) {
                    if ((x[i][j] === pawnColor || x[i][j] === pawnQueen) && (x[i + 1][j + 1] === pawnEnemyColor || x[i + 1][j + 1] === pawnEnemyQueen) && x[i + 2][j + 2] === nothing) {
                        beating.push(i)
                        beating.push(j)
                    }
                }

                if (i < 6 && j > 1) {
                    if ((x[i][j] === pawnColor || x[i][j] === pawnQueen) && (x[i + 1][j - 1] === pawnEnemyColor || x[i + 1][j - 1] === pawnEnemyQueen) && x[i + 2][j - 2] === nothing) {
                        beating.push(i)
                        beating.push(j)
                    }
                }

                if (i > 1 && j < 6) {
                    if ((x[i][j] === pawnColor || x[i][j] === pawnQueen) && (x[i - 1][j + 1] === pawnEnemyColor || x[i - 1][j + 1] === pawnEnemyQueen) && x[i - 2][j + 2] === nothing) {
                        beating.push(i)
                        beating.push(j)
                    }
                }

                if (i > 1 && j > 1) {
                    if ((x[i][j] === pawnColor || x[i][j] === pawnQueen) && (x[i - 1][j - 1] === pawnEnemyColor || x[i - 1][j - 1] === pawnEnemyQueen) && x[i - 2][j - 2] === nothing) {
                        beating.push(i)
                        beating.push(j)
                    }
                }
            }
        }

        return beating
    }

    isClickedBeating(xLoc, yLoc, beatingPawns) {
        for (let tab in beatingPawns) {
            if (tab[0] === this.state.clickedX && tab[1] === this.state.clickedY) {
                return true
            }
        }
        return false
    }

    isQueen() {
        const x = this.state.board.slice()

        for (let i = 0; i < 8; i++) {
            if (x[0][i] === 'B') {
                x[0][i] = 'QB'
            }
        }

        for (let i = 0; i < 8; i++) {
            if (x[7][i] === 'R') {
                x[7][i] = 'QR'
            }
        }
    }

    queenBeating(xLoc, yLoc) {
        const x = this.state.board.slice()

        let pawnLocation = []
        let ourPawn = this.state.redTurn ? 'R' : 'B'
        let ourQueenPawn= this.state.redTurn ? 'QR' : 'QB'
        let directionX = xLoc - this.state.clickedX > 0 ? 1 : -1
        let directionY = yLoc - this.state.clickedY > 0 ? 1 : -1
        let howManyIter = xLoc - this.state.clickedX > 0 ? xLoc - this.state.clickedX : -(xLoc - this.state.clickedX)
        let rowX = this.state.clickedX
        let rowY = this.state.clickedY

        for (let i = 0; i < howManyIter-1; i++) {
            rowX += directionX
            rowY += directionY

            if (x[rowX][rowY] !== ' ' && x[rowX][rowY] !== ourPawn && x[rowX][rowY] !== ourQueenPawn) {
                pawnLocation.push(rowX)
                pawnLocation.push(rowY)
            }

        }
        return pawnLocation
    }

    findBeatingPawn(xLoc, yLoc, possibleBeating) {
        let finded = false;

        for (let i=0; i<possibleBeating.length; i += 2) {
            if (possibleBeating[i] === xLoc && possibleBeating[i+1] === yLoc) {
                finded = true;
            }
        }

        return finded
    }

    handleClick(xLoc, yLoc, val) {
        const x = this.state.board.slice()
        let pawnColor
        let pawnQueen
        let possibleMovement
        let possibleBeating = [[2, 2], [-2, -2], [2, -2], [-2, 2]]

        if (this.state.redTurn) {
            pawnColor = 'R'
            pawnQueen = 'QR'
            possibleMovement = [[1, -1], [1, 1]]
        } else {
            pawnColor = 'B'
            pawnQueen = 'QB'
            possibleMovement = [[-1, 1], [-1, -1]]
        }

        if ((this.state.clickedVal === "QR" && this.state.redTurn) || (this.state.clickedVal === "QB" && !this.state.redTurn)) {
            possibleMovement = [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7], [-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7], [1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]]
            possibleBeating = possibleMovement;
        }
        // zaznaczanie pionka
        if (!this.state.clicked && (pawnColor === val || pawnQueen === val)) {
            this.setState({
                clicked: true,
                clickedX: xLoc,
                clickedY: yLoc,
                clickedVal: val,
            })
        // bicie przy użyciu królówki
        } else if (this.state.clicked && (((this.checkMovement(xLoc, yLoc, possibleBeating) && this.isBeating().length > 0) && val === ' ') || ((this.checkMovement(xLoc, yLoc, possibleBeating) && this.state.clickedVal === pawnQueen && this.queenBeating(xLoc, yLoc).length === 2)))) {
            if (this.state.clickedVal === pawnQueen && this.queenBeating(xLoc, yLoc).length === 2 && val === ' ') {
                x[this.state.clickedX][this.state.clickedY] = " "
                x[this.queenBeating(xLoc, yLoc)[0]][this.queenBeating(xLoc, yLoc)[1]] = " "
                x[xLoc][yLoc] = this.state.clickedVal;
                this.setState({board: x})
                // eslint-disable-next-line
                this.state.beatingX = xLoc
                // eslint-disable-next-line
                this.state.beatingY = yLoc
                if (!this.findBeatingPawn(this.state.beatingX, this.state.beatingY, this.isBeating())) {
                    this.setState({
                        clicked: false,
                        redTurn: !this.state.redTurn,
                    })
                    this.writeHistory(x)
                }

            // bicie przy użyciu zwykłego pionka
            } else if (val === ' ') {
                x[this.state.clickedX][this.state.clickedY] = " "
                x[xLoc - (xLoc - this.state.clickedX)/2][yLoc - (yLoc - this.state.clickedY)/2] = " "
                x[xLoc][yLoc] = this.state.clickedVal;
                this.setState({board: x})
                // eslint-disable-next-line
                this.state.beatingX = xLoc
                // eslint-disable-next-line
                this.state.beatingY = yLoc

                if (!this.findBeatingPawn(this.state.beatingX, this.state.beatingY, this.isBeating())) {
                    this.setState({
                        clicked: false,
                        redTurn: !this.state.redTurn,
                    })
                    this.writeHistory(x)
                }
            }
        // zwykłe poruszanie się
        } else if (this.state.clicked && this.checkMovement(xLoc, yLoc, possibleMovement) && this.isBeating().length === 0 && val === ' ') {
            if ((this.state.clickedVal === pawnQueen && this.queenBeating(xLoc, yLoc).length <= 2) || (this.state.clickedVal !== pawnQueen)) {
                this.setState({
                    clicked: false,
                    redTurn: !this.state.redTurn,
                })
                x[this.state.clickedX][this.state.clickedY] = " "
                x[xLoc][yLoc] = this.state.clickedVal;
                this.setState({board: x})
                this.writeHistory(x)
            }
        // ruch niemożliwy do wykonania
        } else {
            this.setState({clicked: false})
        }
        this.isQueen()
    }

    countPawns(player, playerQueen) {
        const x = this.state.board.slice()
        let countPawn = 0

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (x[i][j] === player || x[i][j] === playerQueen) {
                    countPawn++
                }
            }
        }
        return countPawn
    }

    renderSquare(xLoc, yLoc, cell, color) {
        return <Square
            value={cell}
            xLoc={xLoc}
            yLoc={yLoc}
            color={color}
            onClick={() => this.handleClick(xLoc, yLoc, cell, color)}
        />
    }

    writeHistory(x) {
        const copyAll = x.slice()
        const newArray = []

        for (let i=0; i<8; i++) {
            newArray.push(copyAll[i].slice())
        }

        const historyCopy = this.state.history.slice()
        historyCopy.push(newArray)
        this.setState({history: historyCopy})

        //this.state.history.push(newArray)
        this.state.whichTurnHistory.push(!this.state.redTurn)
    }

    backToState(index) {
        const copyAll = this.state.history[index].slice()
        const newArray = []
        const whichTurnCopy = this.state.whichTurnHistory[index]
        for (let i=0; i<8; i++) {
            newArray.push(copyAll[i].slice())
        }

        this.setState({board: newArray})
        this.setState({redTurn: whichTurnCopy})
    }

    changeTimer() {
        if (this.state.redTurn) {
            this.state.timerRed.play()
            this.state.timerBlack.stop()
        } else {
            this.state.timerBlack.play()
            this.state.timerRed.stop()
        }
    }

    render() {
        this.changeTimer()
        let whichTurn = this.state.redTurn ? "Red" : "Black"
        let redPawns = this.countPawns("R", "QR")
        let blackPawns = this.countPawns("B", "QB")

        if (redPawns === 0 || this.state.timerRed.render() === 0) {
            alert("Game Over! Black wins!")
            window.location.reload()
        } else if (blackPawns === 0 || this.state.timerBlack.player === 0) {
            alert("Game Over! Red wins!")
            window.location.reload()
        }
        return (

            <div>
                <div className="board">
                    {this.state.board.map((row, xLoc) => (<div className="board-row">{row.map((cell, yLoc) => (this.renderSquare(xLoc, yLoc, cell)))}</div>))}
                </div>
                <div className="info">
                    <div className="whichTurn">
                        Actual turn: {whichTurn}
                    </div>
                    <div className="redPawns">
                        Red Pawns: {redPawns}
                    </div>
                    <div className="blackPawns">
                        Black Pawns: {blackPawns}
                    </div>
                    <div id="redTimer">

                    </div>
                    <div id="blackTimer">

                    </div>
                    <div className="refreshButton">
                        <button onClick={() => window.location.reload()}> Reset </button>
                    </div>
                </div>
                <div id="history">
                    <div className="returnButton">
                        <p id="historyLabel"> History </p>
                        {this.state.history.map((value, index) => {return <button onClick={() => {this.backToState(index); this.forceUpdate();}}>{index}</button>})}
                    </div>
                </div>
            </div>
        )
    }
}

class Game extends React.Component {

    renderBoard() {
        return <Board />
    }

    render() {
       return this.renderBoard()
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('game')
);