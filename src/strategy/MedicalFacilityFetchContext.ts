import { Request, Response, NextFunction } from 'express';
import HttpResponse from '../utils/HttpResponse';
import { IMedicalFacilityFetchStrategy } from '../types/IMedicalFacilityFetchStrategy';

export class MedicalFacilityFetchContext {
  private strategy: IMedicalFacilityFetchStrategy;

  constructor(strategy: IMedicalFacilityFetchStrategy) {
    this.strategy = strategy;
  }

  public async handle(req: Request | any, res: Response): Promise<void> {
    
      const medicalFacility = await this.strategy.fetch(req);


      const data = HttpResponse.Ok(medicalFacility);
      res.status(data.statusCode).json(data);
   
  }

}


/*
i want to use this stategy a lot of times could iuse fucniton to add new startegy in startegy desing pattern or i must crate new object  import { Request, Response, NextFunction } from 'express';
import HttpResponse from '../utils/HttpResponse';
import { IDoctorFetchStrategy } from '../types/Service/IDoctorFetchStrategy';

export class DocotrFetchContext {
  private strategy: IDoctorFetchStrategy;

  constructor(strategy: IDoctorFetchStrategy) {
    this.strategy = strategy;
  }

  public async handle(req: Request | any, res: Response, next: NextFunction): Promise<void> {
    try {
      const doctors = await this.strategy.fetch(req);

      if (!doctors || doctors.length === 0) {
        return next(HttpResponse.NotFound('There are no doctors.'));
      }

      const data = HttpResponse.Ok(doctors);
      res.status(data.statusCode).json(data);
    } catch (error) {
      next(error);
    }
  }

  public addStrategy(strategy: IDoctorFetchStrategy){
    this.strategy = strategy;
  }
}
*/