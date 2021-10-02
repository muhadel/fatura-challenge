export interface JwtPayload {
  id: string;
  name: string;
  username: string;
  iat: number;
  exp: number;
}
