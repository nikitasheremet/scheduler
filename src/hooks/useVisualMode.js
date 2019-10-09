import { useState } from "react"

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
  function transition(transition, replace = false) {
    setMode(() => transition)
    if (replace) {
      setHistory(prev => [...prev].slice(0, -1).concat([transition]))
    } else {
      setHistory(prev => [...prev, transition])
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(() => history.slice(-2, -1)[0])
      setHistory(prev => [...prev].slice(0, -1))
    }
  }
  return { mode, transition, back }
}
