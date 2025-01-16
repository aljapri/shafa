import mongoose from "mongoose";
import AccountCreationBase from "../auth/AccountCreationBase.service";

import MedicalFacilityService from "./MedicalFacilityCreation.service";
import LocationCreationService from "../location/LocationCreation.service";
import SubscriptionCreationService from "../subscription/Subscription.service";
import IAccountCreation from "../../types/IAccountCreation";
import WorkScheduleCreation from "../workSchedule/WorkSchedulCreation.service";

export default class MedicalFacilityCreationHandler extends AccountCreationBase implements IAccountCreation {
  private readonly _locationService: LocationCreationService;
  private readonly _subscriptionService: SubscriptionCreationService;
  private readonly _medicalFacilityService: MedicalFacilityService;
  private readonly _workScheduleService: WorkScheduleCreation;
  public constructor(){
    super();
    this._workScheduleService = new WorkScheduleCreation();
    this._locationService = new LocationCreationService();
    this._subscriptionService = new SubscriptionCreationService();
    this._medicalFacilityService = new MedicalFacilityService();
  }

  public async handle(req: any): Promise<any> {
    return this.withTransaction(async (session) => {
      const body = req.body;
      
      // Step 1: Create authentication
      const auth = await this.createAuth(body.email,body.password,"medicalFacility" ,session);
      // Step 2: Create location
      const location = await this._locationService.createLocation(body.location, session);
      const workSchedule = await this._workScheduleService.create(body.workSchedule, session);

      const medicalFacility = await this._medicalFacilityService.createMedicalFacility(
        body,
        auth._id,
        location._id,
        workSchedule._id,
        session
      );
      // Step 3: Create subscription
      const subscription = await this._subscriptionService.createSubscription(body.subscriptionPlanId,auth._id, session);
      // Step 4: Create medical facility
      return medicalFacility
    });
  }
}