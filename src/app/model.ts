export interface LoginResponse {
  jwt: string;
  id: number;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  permissions: UserPermissions;
}

export interface UserPermissions {
  id: number;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canSearchMachines: boolean;
  canStartMachines: boolean;
  canStopMachines: boolean;
  canRestartMachines: boolean;
  canCreateMachines: boolean;
  canDestroyMachines: boolean;
}

export interface Machines {
  id: number;
  active: boolean;
  name: string;
  status: string;
  dateFrom: Date;
  busy: boolean;
}

export interface ErrorMessage {
  id: number;
  message: string;
  operation: string;
  date: Date;
  machine_id: Machines;
}

