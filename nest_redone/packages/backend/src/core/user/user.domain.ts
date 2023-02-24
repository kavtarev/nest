export class UserDomain {
  constructor(
    private props: {
      id?: string;
      password?: string;
      email?: string;
      name?: string;
    },
  ) {
    Object.assign(this, props);
  }
  setPass(pass: string) {
    this.props.password = '';
  }
}
