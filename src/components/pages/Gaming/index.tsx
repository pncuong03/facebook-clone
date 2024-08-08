import React, { useState, useEffect, useRef } from 'react'

interface Position {
  x: number
  y: number
}

const SNAKE_SPEED = 200
const BOARD_SIZE = 20
const INITIAL_SNAKE: Position[] = [
  { x: 8, y: 8 },
  { x: 8, y: 7 },
  { x: 8, y: 6 }
]

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE)
})

const GroupPage: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>(getRandomPosition())
  const [direction, setDirection] = useState<Position>({ x: 0, y: 1 })
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const gameContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isGameOver) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: -1, y: 0 })
          break
        case 'ArrowDown':
          setDirection({ x: 1, y: 0 })
          break
        case 'ArrowLeft':
          setDirection({ x: 0, y: -1 })
          break
        case 'ArrowRight':
          setDirection({ x: 0, y: 1 })
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGameOver])

  useEffect(() => {
    if (isGameOver) return

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake]
        const head = { ...newSnake[0] }
        head.x += direction.x
        head.y += direction.y

        if (
          head.x < 0 ||
          head.x >= BOARD_SIZE ||
          head.y < 0 ||
          head.y >= BOARD_SIZE ||
          newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setIsGameOver(true)
          return prevSnake
        }

        newSnake.unshift(head)

        if (head.x === food.x && head.y === food.y) {
          setFood(getRandomPosition())
          setScore((prevScore) => prevScore + 1)
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    const timerId = setInterval(moveSnake, SNAKE_SPEED)
    return () => clearInterval(timerId)
  }, [direction, food, isGameOver])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(getRandomPosition())
    setDirection({ x: 0, y: 1 })
    setIsGameOver(false)
    setScore(0)
  }

  return (
    <div className='flex fixed flex-col items-center justify-center w-full h-screen bg-gray-900'>
      <h1 className='text-4xl font-bold text-white mb-4'>Snake Game</h1>
      <div
        className='relative bg-gray-800'
        ref={gameContainerRef}
        style={{
          width: `${BOARD_SIZE * 20}px`,
          height: `${BOARD_SIZE * 20}px`
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className='absolute bg-green-500'
            style={{
              width: '20px',
              height: '20px',
              top: `${segment.x * 20}px`,
              left: `${segment.y * 20}px`
            }}
          />
        ))}
        <div
          className='absolute bg-red-500'
          style={{
            width: '20px',
            height: '20px',
            top: `${food.x * 20}px`,
            left: `${food.y * 20}px`
          }}
        />
      </div>
      <div className='mt-4'>
        <h2 className='text-2xl text-white'>Score: {score}</h2>
      </div>
      {isGameOver && (
        <div className='mt-4'>
          <h2 className='text-2xl text-white'>Game Over!</h2>
          <button onClick={resetGame} className='mt-2 px-4 py-2 bg-blue-600 text-white rounded'>
            Restart Game
          </button>
        </div>
      )}
    </div>
  )
}

export default GroupPage
