import { Request } from 'express';
import APIFeatures from './ApiFeatures';

export abstract class BaseFetchStrategy {
  protected applyAPIFeatures(query: any, reqQuery: any): any {
    return new APIFeatures(query, reqQuery).sort().limitFields().paginate();
  }
}
