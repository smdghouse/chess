import { useEffect, useState } from "react"
import useSocket from "../hooks/useSocket"
import Chessboard from "../components/Chessboard.jsx"
import { Chess } from "chess.js"
import ConnectingPage from "./connecting.jsx"
import Navbar from "../components/navbar.jsx"
import bgImage from "../assets/board.png"

function Gameboard() {
  const [notstarted, setnotstarted] = useState(true)
  const [chess, setChess] = useState(new Chess())
  const [moveList, setMoveList] = useState([])
  const [board, setBoard] = useState(chess.board())
  const [colour, setColour] = useState(null)
  const [king_colour, setKing_colour] = useState('p')
  const [turn, setTurn] = useState("w")
  const [premove, setPremove] = useState({})
  const [gameover, setGameover] = useState(false)
  const [gamemsg, setGamemsg] = useState('')
  const [wait, setWait] = useState(false)

  const handlemessage = (message)=>{
    switch (message.type) {
      case "not_active_game":
        break

      case "reconnected":
        const restored = new Chess(message.fen)
        setChess(restored)
        setBoard(restored.board())

        setMoveList(message.moves || [])
        setPremove({
          prefrom: message?.lastmove?.from,
          preto: message?.lastmove?.to
        })

        setKing_colour(message.isCheck ? message.turn : 'p')
        setTurn(message.turn)
        setColour(message.color)

        setGameover(false)
        setGamemsg('')
        setWait(false)
        setnotstarted(false)
        break

      case "waiting":
        setWait(true)
        break

      case "game_over":
        setGameover(true)
        if (message.reason === "checkmate")
          setGamemsg(`${message.winner} won`)
        if (message.reason === "resign")
          setGamemsg(`${message.winner} resign`)
        setnotstarted(true)
        break

      case "move_made":
        const movemade = message.move
        setPremove({ prefrom: movemade.from, preto: movemade.to })

        setChess(prev => {
          const updated = new Chess(prev.fen())
          updated.move(movemade)
          setMoveList(message.movelist)
          setBoard(updated.board())
          setTurn(message.turn)
          return updated
        })

        setKing_colour(message.check ? message.turn : 'p')
        break

      case "start_game":
        const fresh = new Chess(message.fen)
        setChess(fresh)
        setBoard(fresh.board())

        setMoveList([])
        setPremove({})
        setKing_colour('p')
        setTurn('w')
        setColour(message.color)

        setGameover(false)
        setGamemsg('')
        setWait(false)
        setnotstarted(false)
        break

      default:
        break
    }
  }

  const { socket, reconnecting, reconnectingFailed, manualReconnect } = useSocket(handlemessage)

  if (!socket || reconnecting) return <ConnectingPage />

  return (
    <div
      className="h-screen w-full overflow-hidden relative text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Layout Wrapper */}
      <div className="relative z-10 flex flex-col h-full">

        {/* NAVBAR (fixed height) */}
        <div className="shrink-0">
          <Navbar theme="chess" />
        </div>

        {/* MAIN AREA (IMPORTANT FIX) */}
        <div className="flex flex-1 min-h-0 flex-col md:flex-row">

          {/* BOARD */}
          <div className="flex-[6] md:flex-[7] flex items-center justify-center p-2 min-h-0">
            <div className="w-[90%] md:flex md:items-center md:justify-center max-w-[420px] md:max-w-none md:w-full">
              <Chessboard
                turn={turn}
                kingcolour={king_colour}
                board={board}
                socket={socket}
                chess={chess}
                premove={premove}
                colour={colour}
              />
            </div>
          </div>

          {/* PANEL */}
          <div className="flex-[4] md:flex-[3] flex flex-col min-h-0 m-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl">

            {/* STATUS */}
            <div className="p-2 text-center border-b border-white/10 text-sm shrink-0">
              {wait && <p className="text-yellow-400">Waiting for opponent...</p>}
              {!notstarted && !wait && <p className="text-green-400">Game in progress</p>}
              {notstarted && !wait && <p className="text-gray-300">Ready to start</p>}
            </div>

            {/* MOVES (SCROLL FIXED) */}
            <div className="flex-1 min-h-0 p-3 flex flex-col">
              {!notstarted && (
                <h2 className="text-center mb-2 text-purple-400 font-semibold text-sm shrink-0">
                  Moves
                </h2>
              )}

              <div className="flex-1 overflow-y-auto text-xs">
                <div className="grid grid-cols-3 gap-y-1 text-center">
                  {moveList.map((move, index) => {
                    if (index % 2 !== 0) return null
                    return (
                      <div key={index} className="contents">
                        <span className="text-gray-400">
                          {Math.floor(index / 2) + 1}.
                        </span>
                        <span>{move}</span>
                        <span>{moveList[index + 1] || ""}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="p-3 border-t border-white/10 flex flex-col gap-2 shrink-0">
              {notstarted && (
                <button
                  className={`w-full py-2 rounded-lg text-sm ${
                    wait
                      ? "bg-gray-600 text-gray-300"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  onClick={() => {
                    socket.send(JSON.stringify({
                      type: "play_game",
                      token: localStorage.getItem("token"),
                    }))
                  }}
                >
                  {wait ? "Waiting..." : "Start Game"}
                </button>
              )}

              {!notstarted && !gameover && (
                <button
                  className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
                  onClick={() =>
                    socket.send(JSON.stringify({ type: "resign" }))
                  }
                >
                  Resign
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GAME OVER */}
        {gameover && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 w-72 p-5 rounded-xl text-center relative">

              <button
                className="absolute top-2 right-2 text-gray-300 hover:text-white"
                onClick={() => setGameover(false)}
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-3">
                {gamemsg}
              </h2>

              <button
                className="w-full py-2 bg-purple-600 rounded"
                onClick={() => {
                  setGameover(false)
                  setMoveList([])
                  socket.send(JSON.stringify({
                    type: "play_game",
                    token: localStorage.getItem("token")
                  }))
                }}
              >
                New Game →
              </button>
            </div>
          </div>
        )}

        {/* RECONNECT */}
        {reconnectingFailed && (
          <div className="absolute bottom-4 right-4">
            <button
              className="px-4 py-2 bg-yellow-500 rounded"
              onClick={manualReconnect}
            >
              Reconnect
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gameboard