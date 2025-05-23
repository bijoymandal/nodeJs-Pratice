//event module import 
// const EventsEmitter = require('events');
import * as Events from 'events';

export class UserEvents extends Events.EventEmitter {
    //event
    createPost(content)
    {
        console.log('post is created');
        //emit event
        this.emit('postCreated');
    }
}