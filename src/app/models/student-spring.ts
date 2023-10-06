export class StudentSpring {
  constructor(
    public firstName: string,
    public lastName: string | null,
    // public lastName?: string | null,
    // A required parameter cannot follow an optional parameter.ts(1016)
    public username: string,
    public password: string
  ) {}
}
