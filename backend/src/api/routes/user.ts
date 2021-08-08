import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { Container } from 'typedi';
import UserService from '../../services/user';
import { IUserInputDTO } from '../../interfaces/IUser';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.post(
    '/update-user-profile',
    celebrate({
      body: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string(),
        bioDescription: Joi.string(),
        companyName: Joi.string(),
        jobTitle: Joi.string(),
        urlFacebook: Joi.string(),
        urlInstagram: Joi.string(),
        urlTwitter: Joi.string(),
        urlLinkedin: Joi.string(),
        role: Joi.string(),
        _id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const userServiceInstance = Container.get(UserService);
        const user = await userServiceInstance.Update(req.body as IUserInputDTO, req.body._id as string);
        Reflect.deleteProperty(user.user, '__v');
        Reflect.deleteProperty(user.user, 'createdAt');
        Reflect.deleteProperty(user.user, 'updatedAt');
        Reflect.deleteProperty(user.user, 'password');
        Reflect.deleteProperty(user.user, 'salt');

        return res.status(200).json(user.user);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    console.log('dsfsdfsdf');
    return res.json(req.currentUser).status(200);
  });
};
