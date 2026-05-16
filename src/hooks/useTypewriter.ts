import { useEffect, useState } from 'react'

export function useTypewriter(text: string, speed = 50, delay = 0) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplay('')
    setDone(false)
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplay(text.slice(0, i + 1))
          i++
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return { display, done }
}
