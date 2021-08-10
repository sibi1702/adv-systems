import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IPost, IPostInputDTO } from '../interfaces/IPost';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class PostService {
  constructor(
    @Inject('postModel') private postModel: Models.PostModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async Add(postInputDTO: IPostInputDTO): Promise<{ post: IPost }> {
    try {
      this.logger.silly('Creating post db record');
      const postRecord = await this.postModel.create({
        ...postInputDTO,
      });
      this.logger.silly('Generating JWT');

      if (!postRecord) {
        throw new Error('Post cannot be created');
      }

      this.eventDispatcher.dispatch(events.post.add, { post: postRecord });
      const post = postRecord.toObject();

      return { post };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async List(): Promise<{ }> {
    try {
      this.logger.silly('Creating post db record');
      const postRecord = await this.postModel.find();
    if (!postRecord) {
      throw new Error('No records found');
    }
    this.eventDispatcher.dispatch(events.post.list, { postRecord });
      return postRecord;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getPostById(postId: string): Promise<IPost> {
    try {
      this.logger.silly('get post by id from db record');
      const postRecord = await this.postModel.findById(postId);

      if (!postRecord) {
        throw new Error('Post cannot be updated');
      }

      this.eventDispatcher.dispatch(events.post.list, postRecord);
      const post = postRecord.toObject();

      return post;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(postInputDTO: IPostInputDTO, postId: string): Promise<IPost> {
    console.log(".........",postId)
    try {
      this.logger.silly('Updating post db record');
      const postRecord = await this.postModel.findByIdAndUpdate(
        { _id: postId },
        {
          ...postInputDTO,
      });

      if (!postRecord) {
        throw new Error('Post cannot be updated');
      }

      this.eventDispatcher.dispatch(events.post.update, { post: postRecord });
      const post = postRecord.toObject();

      return post;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Delete(postId: string): Promise<{ post: IPost }> {
    try {
      this.logger.silly('Deleting post db record');
      const postRecord = await this.postModel.findByIdAndDelete(postId);
      if (!postRecord) {
        throw new Error('Post cannot be deleted');
      }

      this.eventDispatcher.dispatch(events.post.delete, { post: postRecord });
      const post = postRecord.toObject();

      return { post };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
