import type { Request, Response } from 'express';
import { CreateMessageService } from '../services/CreateMessageService';

export class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { message } = request.body;
    const { user_id } = response.locals;

    const service = new CreateMessageService();
    const result = await service.execute(message, user_id);

    return response.json(result);
  }
}
