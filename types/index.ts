export interface IHardwareData {
  id: string
  box_num: string
  name: string
  type: string
  col: string
  row: string
}

export interface IUserData {
  id: string
  name: string
  email: string
  emailVerified?: string
  image: string
  role: number
}

export interface ICommentData {
  id: string
  userId: string
  text: string
  user: IUserData
  like: number
  disLike: number
  finished: boolean
}
