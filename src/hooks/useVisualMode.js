import { useState } from "react"

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial)
    const [history, setHistory] = useState([initial]);
    function transition(transition, replace = false) {
        console.log("IN TRANSITION________", "MODE", mode, "HISTORY", history, "TRANSITION", transition)
        if (replace) {
            if (history.length >= 2) history.pop()
        }
        setMode(transition)
        setHistory([...history, transition])
    }
    function back() {
        console.log("IN BACK________", "MODE", mode, "HISTORY", history)
        if (history.length > 1) {
            setMode([...history].slice(-2, -1)[0])
            setHistory([...history].slice(0, -1))
        }
    }

    return { mode, transition, back }
}