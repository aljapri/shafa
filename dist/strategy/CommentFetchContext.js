"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFetchContext = void 0;
const HttpResponse_1 = __importDefault(require("../utils/HttpResponse"));
class CommentFetchContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const feedback = yield this.strategy.fetch(req);
                if (!feedback || feedback.length === 0) {
                    return next(HttpResponse_1.default.NotFound('There are no appointment.'));
                }
                const data = HttpResponse_1.default.Ok(feedback);
                res.status(data.statusCode).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CommentFetchContext = CommentFetchContext;
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
