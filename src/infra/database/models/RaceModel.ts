import Race from '@domain/entities/Race'
import RaceModifier from '@domain/entities/RaceModifier'
import StrengthAttribute from '@domain/entities/StrengthAttribute'
import { model, ObjectId, Schema } from 'mongoose'

interface RaceDbInterface {
  _id: ObjectId;
  name: string;
  description?: string;
  raceModifiers: RaceModifierDbInterface[]
}

interface RaceModifierDbInterface {
  value: number;
  attributeId?: string;
}

const RaceModifierSchema = new Schema<RaceModifierDbInterface>({
  value: { type: Number, required: true },
  attributeId: { type: String }
})

const RaceSchema = new Schema<RaceDbInterface>({
  name: { type: String, required: true },
  description: { type: String, required: false },
  raceModifiers: { type: [RaceModifierSchema], required: true }
})

const RaceModel = model<RaceDbInterface>('Race', RaceSchema)

function raceModelToDomain(raceDb: RaceDbInterface): Race {
  return new Race({
    id: raceDb._id.toString(),
    name: raceDb.name,
    description: raceDb.description,
    modifiers: raceDb.raceModifiers.map((modifier) => new RaceModifier({
      value: modifier.value,
      attribute: new StrengthAttribute()
    }))
  })
}

export { raceModelToDomain }

export default RaceModel

