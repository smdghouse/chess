import wr from "../assets/pieces/wr.png"
import wp from "../assets/pieces/wp.png"
import wk from "../assets/pieces/wk.png"
import wq from "../assets/pieces/wq.png"
import wn from "../assets/pieces/wn.png"
import wb from "../assets/pieces/wb.png"
import br from "../assets/pieces/br.png"
import bp from "../assets/pieces/bp.png"
import bk from "../assets/pieces/bk.png"
import bq from "../assets/pieces/bq.png"
import bn from "../assets/pieces/bn.png"
import bb from "../assets/pieces/bb.png"

import { useState, useEffect } from "react";

function Chessboard({ premove, turn, board, socket, colour, chess, kingcolour }) {

    const piece = {
        wr, wp, wk, wq, wn, wb,
        br, bp, bk, bq, bn, bb
    }

    const [from, setFrom] = useState(null)
    const [normalMoves, setNormalMoves] = useState([])
    const [captureMoves, setCaptureMoves] = useState([])

    const files = ["a","b","c","d","e","f","g","h"];

    useEffect(() => {
        setFrom(null)
        setNormalMoves([])
        setCaptureMoves([])
    }, [chess])

    function getSquareName(i, j) {
        const file = "abcdefgh"
        const rank = 8 - i
        return file[j] + rank;
    }

    function handlesquareonclick(i, j) {
        const square = getSquareName(i, j)
        const pieceatsquare = board[i][j]

        if (!from && !pieceatsquare) return

        if (turn !== (colour === "black" ? 'b' : 'w')) return

        if (!from && pieceatsquare && pieceatsquare.color != (colour === "black" ? 'b' : 'w')) return

        if (!from) {
            setFrom(square)

            const moves = chess.moves({ square, verbose: true })
            const normalMoves = moves.filter(m => !m.flags.includes("c")).map(m => m.to)
            const captureMoves = moves.filter(m => m.flags.includes("c")).map(m => m.to)

            setNormalMoves(normalMoves)
            setCaptureMoves(captureMoves)
            return
        } else {
            socket.send(
                JSON.stringify({
                    event: "make_move",
                    move: {
                        from,
                        to: square,
                        promotion: "q"
                    }
                })
            )

            setFrom(null)
            setNormalMoves([])
            setCaptureMoves([])
        }
    }

    function squareimg(square) {
        if (!square) return
        const index = square.color + square.type
        return piece[index]
    }

    function kingcheck(piececolour, i, j) {
        if (!board[i][j]) return null;
        if (board[i][j].color === piececolour && board[i][j].type === 'k') {
            return getSquareName(i, j)
        }
    }

    return (
        <div className={`${colour === 'black' ? "rotate-180" : ''} relative`}>

            {/* BOARD */}
            {
                board.map((row, i) => {
                    return (
                        <div key={i} className="flex items-center">

                            {/* RANK NUMBERS */}
                            <div className={`w-5 text-xs text-white text-center ${colour === 'black' ? "rotate-180" : ""}`}>
                                {8 - i}
                            </div>

                            {row.map((square, j) => {

                                const squarename = getSquareName(i, j)
                                const isfrom = from === squarename
                                const isNormal = normalMoves.includes(squarename);
                                const isCapture = captureMoves.includes(squarename);
                                const isKingCheck = squarename === kingcheck(kingcolour, i, j);
                                const isprefrom = premove.prefrom === squarename
                                const ispreto = premove.preto === squarename

                                return (
                                    <div
                                        key={j}
                                        onClick={() => handlesquareonclick(i, j)}
                                        className={`md:w-20 md:h-20 w-[60px] h-[55px]
    ${isfrom ? "bg-green-400" :
                                                isCapture ? 'bg-red-500 bg-opacity-40' :
                                                    isKingCheck ? 'bg-red-500 bg-opacity-40' :
                                                        isprefrom ? "bg-pink-100" :
                                                            ispreto ? "bg-pink-300" :
                                                                (i + j) % 2 == 0 ? "bg-slate-400" : "bg-[#f0d9b5]"}
`}
                                    >
                                        <div className="cursor-pointer flex justify-center items-center w-full h-full">

                                            {isNormal && (
                                                <div className="w-6 h-6 bg-green-400 bg-opacity-40 rounded-full"></div>
                                            )}

                                            {
                                                square && (
                                                    <img
                                                        src={squareimg(square)}
                                                        alt={square.type}
                                                        className={`w-9 h-9 md:w-[60%] md:h-[65%] select-none pointer-events-none ${colour === 'black' ? "rotate-180" : ''}`}
                                                    />
                                                )
                                            }

                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })
            }

            {/* FILE LETTERS */}
            <div className="flex ml-5">
                {files.map((f, i) => (
                    <div
                        key={i}
                        className={`md:w-20 w-[60px] text-center text-xs text-white ${colour === 'black' ? "rotate-180" : ""}`}
                    >
                        {f}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Chessboard