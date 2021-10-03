import Attribute from './Attribute'

class RaceModifier {
  value: number;
  attribute?: Attribute;

  constructor(params: {
    value: number,
    attribute?: Attribute
  }) {
    this.value = params.value
    this.attribute = params.attribute
  }

  hasAttribute(): Boolean {
    return this.attribute != null
  }
}

export default RaceModifier

