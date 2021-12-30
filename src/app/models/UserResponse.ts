export interface User {
  id: number,
  email: string,
  name: string,
  lastName: string,
  pass: string,
  permissions: Array<Permission>
}

export interface Permission {
  id: number,
  name: string
}
