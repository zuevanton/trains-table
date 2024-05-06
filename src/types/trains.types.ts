export interface TrainInfo {
  name: string
  description: string
  characteristics: Characteristic[]
}

export interface Characteristic {
  speed: number
  force: number
  engineAmperage: number
}
