import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import UserprofileService from '../../services/userprofile';
import { IUserprofileInputDTO } from '../../interfaces/IUserprofile';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/userprofile', route);

  route.post(
    '/userprofile',
    celebrate({
      body: Joi.object({
        description: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      try {
        const userprofileServiceInstance = Container.get(UserprofileService);
        const { userprofile } = await userprofileServiceInstance.Add(req.body as IUserprofileInputDTO);
        return res.status(201).json({ userprofile });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
}

 