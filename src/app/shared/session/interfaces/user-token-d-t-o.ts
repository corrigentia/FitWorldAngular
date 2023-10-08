import { RoleType } from '../enums/role-type';
export interface UserTokenDTO {
  id: number;
  email: string;
  role: RoleType;
  token: string;
}
