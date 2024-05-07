export interface TrainInfo {
  name: string
  description: string
  characteristics: Characteristic[]
}

export interface Characteristic {
  speed: number | string
  force: number | string
  engineAmperage: number | string
}
