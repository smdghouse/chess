const url = "ws://localhost:8000"
import { useRef } from "react"
import { useState,useEffect } from "react"
const useSocket = (onMessage) => {
    const [socket , setSocket] = useState(null)
    const [reconnecting, setReconnecting] = useState(false)
    const [reconnectingFailed, setReconnectingFailed] = useState(false)
    const retrycount = useRef(0)
    const shouldReconnect = useRef(true)
    const wsRef = useRef(null)
    const connect =()=>{
       
         console.log("trying to connect websocket")
        setReconnecting(true)

        const ws = new WebSocket(url)
        wsRef.current = ws
        ws.onopen = ()=>{
            console.log("websocket is connected")
            retrycount.current = 0
            setReconnecting(false)
            setReconnectingFailed(false)
           ws.send(JSON.stringify({type:"identify",token:localStorage.getItem("token")}))
           setSocket(ws)
        }
       
        ws.onmessage = (event)=>{
            const message = JSON.parse(event.data)
            console.log("message is recieved from server",message)
            if(onMessage)
            onMessage(message)
        }
        ws.onclose = ()=>{
            console.log("websocket is closed")
            setSocket(null)
            if(!shouldReconnect.current)
            {
                console.log("intentional close ")
                return
            }
            if(retrycount.current < 5)
            {
                retrycount.current += 1 
                setReconnecting(true)
                setTimeout(() => {
                    connect()
                }, 2000);
            }
            else{
                setReconnecting(false)
                setReconnectingFailed(true)
            }
        }
    }
    // this is the manual functiion that is passed into the button to reconnect the websocket
    const manualReconnect = ()=>{
        console.log("trying the manual reconnect ")
        retrycount.current = 0
        setReconnectingFailed(false)
         connect()
    }
    useEffect(()=>{
        connect()
        return ()=>{
            shouldReconnect.current = false
            wsRef.current?.close()
        }
    },[])
    return {socket,reconnecting,reconnectingFailed,manualReconnect}
}

export default useSocket