import Attribute from './Attribute'
import RaceModifier from './RaceModifier'

class Race {
  id: string;
  name: string;
  description?: string;
  raceModifiers: RaceModifier[];

  constructor(params: {
    id: string,
    name: string,
    description?: string,
    modifiers: {
      value: number,
      attribute?: Attribute
    }[]
  }) {
    this.id = params.id
    this.name = params.name
    this.description = params.description
    this.raceModifiers = params.modifiers.map((modifier) => 
      new RaceModifier(modifier)
    )
  }
}

export default Race

