import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import PostService from '../../services/post';
import { IPostInputDTO } from '../../interfaces/IPost';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
  app.use('/post', route);

  route.post(
    '/add',
    celebrate({
      body: Joi.object({
        postDescription: Joi.string().required(),
        scheduledDateTime: Joi.date().timestamp().raw().required(),
        postInFacebook: Joi.boolean(),
        postInInstagram: Joi.boolean(),
        postInTwitter: Joi.boolean(),
        postInLinkedin: Joi.boolean(),
        userId: Joi.string(),
        _id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const postServiceInstance = Container.get(PostService);
        const { post } = await postServiceInstance.Add(req.body as IPostInputDTO);
        return res.status(201).json({ post });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/update/:postId',
    celebrate({
      body: Joi.object({
        postDescription: Joi.string().required(),
        scheduledDateTime: Joi.date().timestamp().raw().required(),
        postInFacebook: Joi.boolean(),
        postInInstagram: Joi.boolean(),
        postInTwitter: Joi.boolean(),
        postInLinkedin: Joi.boolean(),
        userId: Joi.string(),
        _id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body);
      try {
        const postServiceInstance = Container.get(PostService);
        const post = await postServiceInstance.Update(req.body as IPostInputDTO, req.params.postId as string);
        return res.status(201).json(post);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/list', async (req: Request, res: Response) => {
    const postServiceInstance = Container.get(PostService);
    const post = await postServiceInstance.List();
    return res.json(post).status(200);
  });

  route.get('/post-by-id/:postId', async (req: Request, res: Response) => {
    const postServiceInstance = Container.get(PostService);
    const post = await postServiceInstance.getPostById(req.params.postId as string);
    return res.json(post).status(200);
  });

  route.delete(
    '/delete-post/:postId',
    celebrate({
      body: Joi.object({
        _id: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling delelte-post endpoint with body: %o', req.body);
      try {
        const postServiceInstance = Container.get(PostService);
        const post = await postServiceInstance.Delete(req.params.postId as string);
        return res.status(200).json({ status: true, message: 'deleted succesdfuly' });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
}

 