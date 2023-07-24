import React, { useState, useEffect } from "react"

interface CountdownProps {
  targetDate: string | undefined;
  text: string;
  finishedText: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, text, finishedText }) => {
    const [timeRemaining, setTimeRemaining] = useState<string>("")

    useEffect(() => {
        if (targetDate) {
            const targetDateTime = new Date(targetDate).getTime()

            const updateCountdown = () => {
                const now = new Date().getTime()
                const timeDifference = targetDateTime - now

                if (timeDifference <= 0) {
                    setTimeRemaining(finishedText)
                } else {
                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

                    setTimeRemaining(text + `: ${days}d ${hours}h ${minutes}m ${seconds}s`)
                }
            }

            const timerId = setInterval(updateCountdown, 1000)
            return () => clearInterval(timerId)
        }
    }, [targetDate])

    return (
        <p>{timeRemaining}</p>
    )
}

export default Countdown
