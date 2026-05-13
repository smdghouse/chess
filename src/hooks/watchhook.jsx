const baseUrl = import.meta.env.VITE_SPECTATE_URL;

const wsUrl = baseUrl.startsWith("https")
  ? baseUrl.replace("https", "wss")
  : baseUrl.replace("http", "ws");
import {useRef , useEffect} from "react"
const useWatchSocket = (onMessage)=>{
    const wsRef = useRef(null)
    useEffect (()=>{
        const ws = new WebSocket(wsUrl)
        wsRef.current = ws
        ws.onopen = ()=>{
            console.log("watch socket is connected")
        }
        ws.onmessage =(event) =>{
            try{
            const message = JSON.parse(event.data)
            onMessage && onMessage(message)
            }
            catch(error){
                console.error("Error parsing WebSocket message:", error)
            }
        }
        ws.onerror = (error)=>{
            console.log("watch socket error ",error)
        }
        ws.onclose = ()=>{
            console.log("watch socket is closed")
        }
        return ()=>{
            ws.close()
        }
    }, [])
    return wsRef
}
export default useWatchSocket