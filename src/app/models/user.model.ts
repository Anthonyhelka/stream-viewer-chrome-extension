export class UserModel {
  userId: string;
  firstName: string;
  tag: string;
  email: string;
  type: string;

  constructor(data: any = null) {
    if (data) {
      this.userId = data.auth0Id;
      this.firstName = data.firstName;
      this.tag = data.streamViewerTag;
      this.email = data.email;
      this.type = data.userType;
    }
  }
}
