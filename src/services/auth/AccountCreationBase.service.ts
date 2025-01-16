import mongoose, { ClientSession } from "mongoose";
import { Auth } from "../../models/Auth.model";
import IPasswordService from "../password/IPassword";
import PasswordService from "../password/password.service";
import HttpResponse from "../../utils/HttpResponse";

export default abstract class AccountCreationBase {
  protected readonly passwordService: IPasswordService;

  constructor() {
    this.passwordService = new PasswordService();
  }

  protected async createAuth(email: string, password: string,role:string ,session: ClientSession) {
    const existingAuth = await Auth.findOne({ email }).session(session);
    if (existingAuth) {
      throw HttpResponse.NotFound("Email is already taken.");
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const auth = await Auth.create([{ email, password: hashedPassword,role:role }], { session });
    return auth[0]; // Assuming create returns an array with the created record
  }

  protected async withTransaction<T>(action: (session: ClientSession) => Promise<T>): Promise<T> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result = await action(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
