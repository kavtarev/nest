import { ErrorsEnum } from './errors';
import { ClientMessage } from './ws.interface';
import Ajv from 'ajv';

const validator = new Ajv()

const schema = {
  type: 'object',
  properties: {
    msg: {
      type: 'string',
      enum: ['subscribe', 'unsubscribe']
    },
    routes: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['home', 'count']
      }
    }
  }
}

const validate = validator.compile(schema);

type RawData = Buffer | ArrayBuffer | Buffer[];

export class MessageHandler {
  private validator = validate;

  private message: ClientMessage;

  constructor(private msg: RawData) {}

  getMessage() {
    this.parse(this.msg);

    const isValid = this.validator(this.message);
    console.log(this.validator.errors);

    return { message: this.message, isValid};
  }

  parse(msg: RawData) {
    try {

      console.log(7787, msg.toString());
      
      this.message = JSON.parse(msg.toString())
      console.log(typeof this.message);
      
    } catch (error) {
      console.log(error);
      
      throw new Error(ErrorsEnum.INVALID_MESSAGE_TYPE)
    }
  }
}