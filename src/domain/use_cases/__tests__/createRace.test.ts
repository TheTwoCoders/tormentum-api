import {
  connectMemoryDb,
  disconnectMemoryDb,
  TestDbConnection
} from '@testHelpers/memoryDatabase'
import createRace from '../createRace'

describe('Use Case: Create Race', () => {
  let connection: TestDbConnection | null = null

  beforeAll(async () => {
    connection = await connectMemoryDb()
  })

  afterAll(async () => {
    await disconnectMemoryDb(connection)
  })

  describe('when passing the correct params', () => {
    it('creates a race', async () => {
      const params = {
        name: 'Human',
        description: 'A simple human',
        raceModifiers: [{
          value: 10,
          attributeId: 'STRENGTH'
        }]
      }

      const race = await createRace(params)

      expect(race.id).not.toBeNull()
    })
  })
})

