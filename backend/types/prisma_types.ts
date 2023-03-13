import { type } from "os"
import { Planet } from "../domain/model/planet"



export type PlanetPrisma = {
  planet_id :   number
  planet_name: String
  account_id :number
  radius: number
  semimajor_axis: number
  mass :        number
  }