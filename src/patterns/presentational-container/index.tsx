import { Suspense } from "react"
import { DogImage } from "./dog-image"
import { fetchData } from "../../services/fetchRandomDog"

const api = fetchData(new URL('https://dog.ceo/api/breed/labrador/images/random'))

export const DogImageContainer = () => {
  const data = api.read()

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <DogImage img={new URL(data.message)} status={data.status} />
    </Suspense>
  )
}
