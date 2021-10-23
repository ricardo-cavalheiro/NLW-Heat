import type { Request, Response } from 'express';
import { ProfileUserService } from '../services/ProfileUserService';

export class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = response.locals;

    const service = new ProfileUserService();
    const result = await service.execute(user_id);

    return response.json(result);
  }
}
