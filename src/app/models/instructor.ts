export class Instructor {
  // constructor(public firstName: string, public lastName?: string) {}
  constructor(
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string | null
  ) {}
}
