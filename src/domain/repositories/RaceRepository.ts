import Race from '@domain/entities/Race'
import RaceModel, { raceModelToDomain } from '@infra/database/models/RaceModel'

class RaceRepository {
  static async save(params: {
    name: string,
    description?: string,
    raceModifiers: {
      value: number,
      attributeId?: string
    }[]
  }): Promise<Race> {
    const race = new RaceModel(params)
    const savedRace = await race.save()

    return raceModelToDomain(savedRace)
  }
}

export default RaceRepository

