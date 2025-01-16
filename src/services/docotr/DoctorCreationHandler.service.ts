import mongoose, { ClientSession } from "mongoose";
import AccountCreationBase from "../auth/AccountCreationBase.service";
import WorkScheduleCreation from "../workSchedule/WorkSchedulCreation.service";
import DoctorCreationService from "./DoctorCreation.service";
import LocationCreationService from "../location/LocationCreation.service";
import SubscriptionCreationService from "../subscription/Subscription.service";

export default class DoctorCreationHandler extends AccountCreationBase {
  private readonly workScheduleService: WorkScheduleCreation;
  private readonly _locationService: LocationCreationService;
  private readonly _subscriptionService: SubscriptionCreationService;

  constructor() {
    super();
    this.workScheduleService = new WorkScheduleCreation();
    this._locationService = new LocationCreationService();
    this._subscriptionService = new SubscriptionCreationService();

  }

  /**
   * Handle doctor creation process
   */
  public async handle(req: any): Promise<any> {
    return this.withTransaction(async (session) => {
      const body = req.body;
      const medicalFacilityId = req.accountId;
      // Step 1: Create authentication record
      const auth = await this.createAuth(body.email ,body.password,"doctor" ,session);
      const location = await this._locationService.createLocation(body.location, session);

      // Step 2: Create work schedule
      const workSchedule = await this.workScheduleService.create(body.workSchedule, session);
      // Step 3: Create doctor record
      const doctor = await new DoctorCreationService().create(body, auth._id ,workSchedule._id,location._id, session);
      const subscription = await this._subscriptionService.createSubscription(body.subscriptionPlanId,auth._id, session);
      return doctor;
    });
  }
}
