import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { IUser, IUserInputDTO } from '../interfaces/IUser';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import events from '../subscribers/events';

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async Add(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create({
        ...userInputDTO,
      });
      this.logger.silly('Generating JWT');

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      this.eventDispatcher.dispatch(events.user.add, { user: userRecord });
      const user = userRecord.toObject();

      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(userInputDTO: IUserInputDTO, userId: string): Promise<{ user: IUser }> {
    try {
      this.logger.silly('Updating user db record');
      const userRecord = await this.userModel.findOneAndUpdate({
        ...userInputDTO,
        userId,
      });

      if (!userRecord) {
        throw new Error('User cannot be updated');
      }

      console.log("------>>>>>>",userRecord)
      this.eventDispatcher.dispatch(events.user.update, { user: userRecord });
      const user = userRecord.toObject();

      return { user };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
