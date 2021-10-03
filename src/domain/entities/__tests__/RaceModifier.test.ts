import RaceModifier from '../RaceModifier'
import StrengthAttribute from '../StrengthAttribute'

describe('Domain: Race Modifier', () => {
  describe('when having attribute', () => {
    it('returns hasAttribute as true', () => {
      const raceModifier = new RaceModifier({
        value: 10,
        attribute: new StrengthAttribute()
      })

      expect(raceModifier.hasAttribute()).toEqual(true)
    })
  })

  describe('when not having attribute', () => {
    it('returns hasAttribute as false', () => {
      const raceModifier = new RaceModifier({
        value: 10
      })

      expect(raceModifier.hasAttribute()).toEqual(false)
    })
  })
})

