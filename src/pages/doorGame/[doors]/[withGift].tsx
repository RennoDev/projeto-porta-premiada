import styles from '../../../styles/doorGame.module.css'
import { useEffect, useState } from "react"
import Door from "../../../components/Door"
import { createDoor, updateDoor } from "../../../functions/createDoor"
import Link from "next/link"
import { useRouter } from 'next/router'

export default function DoorGame() {
  const router = useRouter()
  const [doors, setDoors] = useState([])
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const doors = +router.query.doors
    const withGift = +router.query.withGift
    setDoors(createDoor(doors, withGift))
  }, [router?.query])

  useEffect(() => {
    const doors = +router.query.doors
    const withGift = +router.query.withGift
    const validDoorAmount = doors >= 3 && doors <= 10
    const validWithGift = withGift >= 1 && withGift <= doors
    setIsValid(validDoorAmount && validWithGift)
  }, [doors, router.query.doors, router.query.withGift])

  function doorRender() {
    return doors.map(door => {
      return <Door key={door.number} value={door}
        onChange={newDoor => setDoors(updateDoor(doors, newDoor))} />
    })
  }

  return (
    <div className={styles.doorGame}>
      <div className={styles.doors}>
        {isValid ? doorRender() : <div><h1>Combinação inválida ou fora dos limites!</h1></div>}
      </div>
      <Link href="/" passHref>
        <button className={styles.restartButton}>Voltar</button>
      </Link>
    </div>
  )
}