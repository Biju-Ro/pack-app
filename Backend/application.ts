// Job for tmrw Ken add a method for populating the data when the app starts.
// ^ "I don't think I need to do this actually lol" -tmrw Ken

// Data is planned to include: 12 users, any amount of tags, and 2 events.
// import {Tag, Event, User, Application} from 'types.ts';

import { Tag, User, Event, Application } from "./types";

// ALL OF THE TAGS IN THE SYSTEM (MUTABLE)
// Feel free to add any tags here as you see fit!
// Adding a tag here is if you want said tag to exist before runtime.
var TAGDATA: Tag[] = [
    {
        tid: 1,
        tagname: 'Basketball'
    },
    {
        tid: 2,
        tagname: 'Reels'
    },
    {
        tid: 3,
        tagname: 'Free Food'
    },
    {
        tid: 4,
        tagname: 'Dinner'
    },
];

// ALL OF THE USERS IN THE SYSTEM (MUTABLE)
// Feel free to add any users here as you see fit!
// Adding a user here is if you want said user to exist before runtime.
var USERDATA: User[] = [
    {
        uid: 1,
        nuid: '123456789',
        name: 'John Doe',
        nickname: 'John',
        major: 'Computer Science',
        minor: 'Data Science',
        gradelevel: 'Freshman',
        picture: 'i/dont/actually/have/a/picture.png',
        tags: [TAGDATA[0], TAGDATA[1]],
    },
    {
        uid: 2,
        nuid: '987654321',
        name: 'Alex LeGoat',
        nickname: 'RA Alex',
        major: 'Architecture',
        minor: 'N/A',
        gradelevel: 'Senior',
        picture: 'i/dont/actually/have/a/picture.png',
        tags: [TAGDATA[0], TAGDATA[1]],
    },
]

// ALL OF THE EVENTS IN THE SYSTEM (Mutable)
// Feel free to add any events here as you see fit!
// Adding an event here is if you want said event to exist before runtime.
var EVENTDATA: Event[] = [
    {
        eid: 1,
        title: 'Food Court',
        hostname: USERDATA[1].nickname,
        hostuid: USERDATA[1].uid,
        month: 12,
        day: 9,
        year: 2024,
        hour: 6,
        minute: 30,
        meridiem: 'PM',
        tags: [TAGDATA[2], TAGDATA[3]],
        yesVotes: [USERDATA[0].uid],
        maybeVotes: [],
        noVotes: [],
    }
]

// THE COLLECTION OF ALL THE DATA IN THE SYSTEM (Mutable)
// "Lowkey considering removing this tbh. I don't think it has much (or any) use." -Ken
var APPLICATION: Application = {
    events: EVENTDATA,
    tags: TAGDATA,
    users: USERDATA,
}

/**
 * Provided a name, searches through the current TAGDATA and returns the first matching result that shares the same name.
 * 
 * @param name - The name of the Tag that the caller is searching for.
 * @returns the Tag if it exists.
 * @throws an error if there is no such Tag.
 */
export function getTagByName(name: string) {
    try {
        return TAGDATA.filter(tag => tag.tagname === name)[0];
    } catch (error) {
        throw new Error('No Matching Tag of Name: ' + name);
    }   
}

/**
 * Provided a new completed Tag, adds the provided Tag to the TAGDATA.
 * 
 * @param tagdata - The completed Tag to be added to the list of tags in TAGDATA.
 * @throws an error if the provided Tag is invalid.
 */
export function addTag(tagdata: Tag) {
    if (!tagdata) {
        throw new Error('Invalid Tag');
    } else if (!(getTagByName(tagdata.tagname))) {
        throw new Error('Tag with this name already exists!')
    }
    TAGDATA.push(tagdata);
}

/**
 * Creating a new User during runtime, adds the new User to the USERDATA.
 * (Only realized this after writing it, but we'll probably never need this method. Oops.)
 * Maybe can be used during signup?
 * 
 * @param userdata - The completed User to be added to the list of users in USERDATA.
 * @param tagnames - The list of tagnames to attribute to this new user.
 * @throws an error if the provided Tag is invalid.
 */
export function addUser(userdata: User, tagnames: string[]) {
    tagnames.forEach(tagname => userdata.tags.push(getTagByName(tagname)));
}

/**
 * Provided a nickname, searches through the current USERDATA and returns the first matching result that shares the same name.
 * 
 * @param nickname - The nickname of the User that the caller is searching for.
 * @returns the User if they exist.
 * @throws an error if there is no such User.
 */
export function getUserByNickname(nickname: string) {
    try {
        return USERDATA.filter(user => user.nickname === nickname)[0];
    } catch (error) {
        throw new Error('No Matching User with Nickname: ' + name);
    }   
}

/**
 * Provided a user id, searches through the current USERDATA and returns the first matching result that shares the same uid.
 * 
 * @param uid - The user id of the User that the caller is searching for.
 * @returns the User if they exist.
 * @throws an error if there is no such User.
 */
export function getUserByUid(uid: number) {
    try {
        return USERDATA.filter(user => user.uid === uid)[0];
    } catch (error) {
        throw new Error('No Matching User with uid: ' + uid);
    }   
}

/**
 * Creating a new Event during runtime, adds the new Event to the EVENTDATA.
 * 
 * @param eventdata - The (mostly) completed Event to be added to the list of event in EVENTDATA.
 * @param tagnames - The list of tagnames to attribute to this new event.
 * @throws an error if the provided Tag is invalid.
 */
export function addEvent(eventdata: Event, tagnames: string[]) {
    tagnames.forEach(tagname => eventdata.tags.push(getTagByName(tagname)));
}
