import { useState } from "react"

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial)
    const [history, setHistory] = useState([initial]);
    function transition(transition, replace = false) {
        if (replace) {
            if (history.length >= 2) history.pop()
        }
        setMode(transition)
        setHistory([...history, transition])
    }
    function back() {
        if (history.length > 1) {
            setMode([...history].slice(-2, -1)[0])
            setHistory([...history].slice(0, -1))
        }
    }

    return { mode, transition, back }
}