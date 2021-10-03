import Race from '@domain/entities/Race'
import RaceRepository from '@domain/repositories/RaceRepository'

async function createRace(
  params: {
    name: string,
    description?: string,
    raceModifiers: {
      value: number,
      attributeId?: string
    }[]
  }
): Promise<Race> {
  const race = await RaceRepository.save(params)

  return race
}

export default createRace

