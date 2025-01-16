import { IAuthCommand } from "../types/IAuthCommand";

export class AuthCommandInvoker {
    public static async executeCommand(command: IAuthCommand): Promise<any> {
      return await command.execute();
    }
  }
  