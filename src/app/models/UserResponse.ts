export interface SingleUser {
  id: number,
  email: string,
  name: string,
  surname: string,
  password: string,
  roles: Array<SingleRole>
}

export interface SingleRole {
  id: number,
  name: string
}
