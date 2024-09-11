import { Request, Response } from 'express';

export class AppController {
  static getDefaultRoute(req: Request, res: Response): Response {
    return res.send('Hello World');
  }
}
