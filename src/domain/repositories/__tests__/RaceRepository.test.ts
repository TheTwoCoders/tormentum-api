import RaceRepository from '@domain/repositories/RaceRepository'
import {
  connectMemoryDb,
  disconnectMemoryDb,
  TestDbConnection
} from '@testHelpers/memoryDatabase'
import StrengthAttribute from '@domain/entities/StrengthAttribute'

describe('Repositories: Race Repository', () => {
  let connection: TestDbConnection | null = null

  beforeAll(async () => {
    connection = await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb(connection)
  })

  describe('when creating a race', () => {
    it('returns saved race with id', async () => {
      const params = {
        name: 'Human',
        description: 'A simple human',
        raceModifiers: [{
          value: 10,
          attributeId: 'STRENGTH'
        }]
      }

      const savedRace = await RaceRepository.save(params)

      expect(savedRace.id).not.toBeNull()
      expect(savedRace.raceModifiers[0].attribute)
        .toBeInstanceOf(StrengthAttribute)
    })
  })

  describe('when searching a race by id', () => {
    it('returns the race', async () => {
      const params = {
        name: 'Test Search Race',
        description: 'A simple human',
        raceModifiers: [{
          value: 10,
          attributeId: 'STRENGTH'
        }]
      }
      const savedRace = await RaceRepository.save(params)

      const foundRace = await RaceRepository.findById(savedRace.id)

      expect(foundRace).not.toBeNull()
      expect(foundRace?.id).toEqual(savedRace.id)
      expect(foundRace?.name).toEqual(params.name)
    })
  })
})

