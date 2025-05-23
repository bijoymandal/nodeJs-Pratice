import { UserEvents } from "./userEvent.mjs";

const userEvents = new UserEvents();





function saveToDatabase(){
    console.log('post is saved to database');
}

function sendNotification(){
    console.log('notification is sent');
}

function updateTimeLine(){
    console.log('timeline is updated');
}

userEvents.addListener('postCreated',saveToDatabase);
userEvents.addListener('postCreated',sendNotification);
userEvents.addListener('postCreated',updateTimeLine);

userEvents.createPost('This is my first post');
