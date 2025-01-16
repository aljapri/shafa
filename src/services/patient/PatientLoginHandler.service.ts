import { MedicalFacility } from '../../models/medicalFacility.model';
import HttpResponse from '../../utils/HttpResponse';
import { Subscription } from '../../models/subscription.model';
import { Auth } from '../../models/Auth.model';
import IPasswordService from '../password/IPassword';
import IJWT from '../jwt/IJW';
import PasswordService from '../password/password.service';
import JWTService from '../jwt/jwt.service';
import AccountLoginBase from '../auth/AccountLoaginBase.service';
import IAccountLogin from '../../types/IAccountLogin';
import { Patient } from '../../models/Patient.model';

interface LoginInput {
  email: string;
  password: string;
  accountId: string;
}


export default class PatientLoginHandler extends AccountLoginBase implements IAccountLogin {

  constructor() {
    super();
  }

  public async handle(req: any): Promise<any> {
    const body = req.body;
    const auth:any = await this.login(body);
    if(auth.role != "patient"){
      throw HttpResponse.NotFound('Invalid email or password.');
    }
    const account = await Patient.findOne({auth:auth._id}).populate("auth","email ").select("-createdAt -updatedAt ");
    // Generate JWT token
    const token = await this.tokenGeneration(auth._id);
    return { token,data:account };
  }
}
