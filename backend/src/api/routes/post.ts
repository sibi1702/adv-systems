import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import PostService from '../../services/post';
import { IPostInputDTO } from '../../interfaces/IPost';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

// function toTimestamp(year,month,day,hour,minute,second){
//   var datum = new Date(Date.UTC(year,month-1,day,hour,minute,second));
//   return datum.getTime()/1000;
//  }

export default (app: Router) => {
  app.use('/post', route);

  route.post(
    '/add',
    celebrate({
      body: Joi.object({
        postDescription: Joi.string().required(),
        scheduledDateTime:Joi.date().timestamp().raw().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body );
      try {
        const postServiceInstance = Container.get(PostService);
        const  scheduledDateTime  = new Date(1627199100) ;
        console.log("()={}",scheduledDateTime,"()={}");
        const { post } = await postServiceInstance.Add(req.body as IPostInputDTO);
        return res.status(201).json({ post });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
}

 