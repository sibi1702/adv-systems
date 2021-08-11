import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { Container } from 'typedi';
import PostService from '../../services/post';
import { IPostInputDTO } from '../../interfaces/IPost';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/editpost', route);

  route.post(
    '/update-post',
    celebrate({
      body: Joi.object({
        postDescription: Joi.string().required(),
        scheduledDateTime:Joi.date().timestamp().raw().required(),
        postInFacebook:Joi.boolean(),
        postInInstagram:Joi.boolean(),
        postInTwitter:Joi.boolean(),
        postInLinkedin:Joi.boolean(),
        userId:Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const postServiceInstance = Container.get(PostService);
        const post = await postServiceInstance.Update(req.body as IPostInputDTO, req.body.userId as string);
        Reflect.deleteProperty(post.post, 'userId');
        Reflect.deleteProperty(post.post, 'createdAt');                          
        Reflect.deleteProperty(post.post, 'updatedAt');

        return res.status(200).json(post.post);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

//   route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
//     console.log('dsfsdfsdf');
//     return res.json(req.currentUser).status(200);
//   });
};
