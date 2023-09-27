import { Suspense } from 'react'
import { DogImage } from './dog-image'
import { fetchData } from '../../services/fetchData'
import { DogResponse } from '../../shared/models.d'

const api = fetchData<DogResponse>(new URL('https://dog.ceo/api/breed/labrador/images/random'))

// MARK: COMPONENTE SMART <- SE CENTRA EN CÓMO FUNCIONA Y EN LA LOGICA
export const DogImageContainer = () => {
  const data = api.read()

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <DogImage img={new URL(data.message)} status={data.status} />
    </Suspense>
  )
}

/**
 * PROPS
 * ANIMA A LA SEPARACION DE RESPOSABILIDADES
 * 
 * CONTRAS
 * Los HOOKS permiten lograr el mismo resultado sin tener que usar el patrón Contenedor / Presentacional
 **/