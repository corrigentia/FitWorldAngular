export class StudentSpring {
  constructor(
    // public firstName: string,
    // public lastName: string | null,
    // public lastName?: string | null,
    // A required parameter cannot follow an optional parameter.ts(1016)
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string | null
  ) {}
}
