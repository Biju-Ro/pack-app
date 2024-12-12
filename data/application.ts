// Job for tmrw Ken add a method for populating the data when the app starts.
// ^ "I don't think I need to do this actually lol" -tmrw Ken

// Data is planned to include: 12 users, any amount of tags, and 2 events.
// import {Tag, Event, User, Application} from 'types.ts';

import { Tag, User, Event, Application, Message, RAChat, FloorChat, RotatingChat } from "../types";

// ALL OF THE TAGS IN THE SYSTEM (MUTABLE)
// Feel free to add any tags here as you see fit!
// Adding a tag here is if you want said tag to exist before runtime.
export var TAGDATA: Tag[] = [
    {
        tid: 0,
        tagname: 'League of Legends'
    },
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
    {
        tid: 5,
        tagname: 'Series'
    },
    {
        tid: 6,
        tagname: 'Gaming'
    },
    {
        tid: 7,
        tagname: 'Fantasy'
    },
    {
        tid: 8,
        tagname: 'Movie'
    },
    {
        tid: 9,
        tagname: 'Chill'
    },
    {
        tid: 10,
        tagname: 'Commnuity'
    },
    {
        tid: 11,
        tagname: 'Competition'
    },
    {
        tid: 12,
        tagname: 'Fun'
    },
    {
        tid: 13,
        tagname: 'Board Games'
    },
    {
        tid: 14,
        tagname: 'Social'
    },
    {
        tid: 15,
        tagname: 'Relaxation'
    },
    {
        tid: 16,
        tagname: 'Crafts'
    },
    {
        tid: 17,
        tagname: 'Holiday'
    },
    {
        tid: 18,
        tagname: 'Creative'
    },
    {
        tid: 19,
        tagname: 'Music'
    },
    {
        tid: 20,
        tagname: 'Singing'
    },
    {
        tid: 21,
        tagname: 'Tennis'
    },
    {
        tid: 22,
        tagname: 'Volleyball'
    },
    {
        tid: 23,
        tagname: 'Super Smash Bros.'
    },
    {
        tid: 24,
        tagname: 'Game Development'
    },
    {
        tid: 25,
        tagname: 'Dragon Ball'
    },
    {
        tid: 26,
        tagname: 'AMVs'
    },
    {
        tid: 27,
        tagname: 'Gym'
    },
    {
        tid: 28,
        tagname: 'Christmas'
    },
    {
        tid: 29,
        tagname: 'HCI'
    },
    {
        tid: 30,
        tagname: 'Christmas'
    },
    {
        tid: 31,
        tagname: 'Mario Kart'
    },
    {
        tid: 32,
        tagname: 'Rock Climbing'
    },


    
];

// ALL OF THE USERS IN THE SYSTEM (MUTABLE)
// Feel free to add any users here as you see fit!
// Adding a user here is if you want said user to exist before runtime.
export var USERDATA: User[] = [
    {
        uid: 0,
        nuid: '123456789',
        firstname: 'John',
        lastname: 'Doe',
        nickname: 'John',
        major: 'Computer Science',
        minor: 'Data Science',
        gradelevel: 'Freshman',
        picture: 'https://via.placeholder.com/50',
        tags: [TAGDATA[0], TAGDATA[1]],
    },
    {
        uid: 1,
        nuid: '987654321',
        firstname: 'Alex',
        lastname: 'LeGoat',
        nickname: 'RA Alex',
        major: 'Architecture',
        minor: 'N/A',
        gradelevel: 'Senior',
        picture: 'https://via.placeholder.com/50',
        tags: [TAGDATA[0], TAGDATA[1]],
    },
    {
        uid: 2,
        nuid: '222222222',
        firstname: 'Kenneth',
        lastname: 'Borrero',
        nickname: 'Ken',
        major: 'Computer Science',
        minor: 'Game Development',
        gradelevel: 'Senior',
        picture: 'https://via.placeholder.com/50',
        tags: [TAGDATA[21], TAGDATA[22], TAGDATA[23], TAGDATA[24], TAGDATA[0]],
    },
    {
        uid: 3,
        nuid: '333333333',
        firstname: 'Rohan',
        lastname: 'Biju',
        nickname: 'Rohan',
        major: 'Computer Science',
        minor: 'Web Dev',
        gradelevel: 'Sophomore',
        picture: 'https://via.placeholder.com/50',
        tags: [TAGDATA[0], TAGDATA[2], TAGDATA[1], TAGDATA[6]],
    },
    {
        uid: 4,
        nuid: '444444444',
        firstname: 'Kedaar',
        lastname: 'Chakankar',
        nickname: 'Kedaar',
        major: 'Computer Science',
        minor: 'Health Science',
        gradelevel: 'Junior',
        picture: 'https://via.placeholder.com/50',
        tags: [TAGDATA[25], TAGDATA[26], TAGDATA[27], TAGDATA[1]],
    },
    {
        uid: 5,
        nuid: '555555555',
        firstname: 'Leo',
        lastname: 'Climb',
        nickname: 'Leo',
        major: 'Zoology',
        minor: 'Biology',
        gradelevel: 'Senior',
        picture: 'https://via.placeholder.com/50',
        tags: [TAGDATA[10], TAGDATA[23], TAGDATA[31]],
    },

]

// ALL OF THE EVENTS IN THE SYSTEM (Mutable)
// Feel free to add any events here as you see fit!
// Adding an event here is if you want said event to exist before runtime.
export var EVENTDATA: Event[] = [
    {
        eid: 0,
        title: 'Food Court',
        hostname: USERDATA[1].nickname,
        hostuid: USERDATA[1].uid,
        date: new Date(2024, 11, 9, 18, 30),
        // month: 12,
        // day: 9,
        // year: 2024,
        // hour: 6,
        // minute: 30,
        // meridiem: 'PM',
        //time: "18:30",
        location: "Curry Ball Room",
        tags: [TAGDATA[4], TAGDATA[3]],
        yesVotes: [USERDATA[0].uid, USERDATA[1].uid, USERDATA[3].uid],
        maybeVotes: [USERDATA[2].uid],
        noVotes: [USERDATA[4].uid],
    },
    {
        eid: 1,
        title: 'Arcane Watch Party',
        hostname: USERDATA[3].nickname,
        hostuid: USERDATA[3].uid,
        date: new Date(2024, 10, 24, 19, 30),
        // month: 11,
        // day: 24,
        // year: 2024,
        // hour: 7,
        // minute: 30,
        // meridiem: 'PM',
        //time: "19:30",
        location: "Richards - Classroom TBD",
        tags: [TAGDATA[0], TAGDATA[5], TAGDATA[7]],
        yesVotes: [USERDATA[2].uid, USERDATA[3].uid],
        maybeVotes: [USERDATA[4].uid],
        noVotes: [USERDATA[1].uid],
    },
    {
        eid: 2,
        title: 'Husky Christmas Party',
        hostname: USERDATA[1].nickname,
        hostuid: USERDATA[1].uid,
        date: new Date(2024, 11, 24, 17, 0),
        location: "West Village B Lobby",
        tags: [TAGDATA[10], TAGDATA[14], TAGDATA[19], TAGDATA[28]],
        yesVotes: [USERDATA[0].uid, USERDATA[1].uid],
        maybeVotes: [USERDATA[3].uid, USERDATA[4].uid],
        noVotes: [USERDATA[2].uid],
    },
    {
        eid: 3,
        title: 'Post-Project Celebration Party',
        hostname: USERDATA[2].nickname,
        hostuid: USERDATA[2].uid,
        date: new Date(2024, 11, 12, 23, 30),
        location: "Friend's Apartment (Msg for details)",
        tags: [TAGDATA[9], TAGDATA[29]],
        yesVotes: [USERDATA[2].uid, USERDATA[3].uid, USERDATA[4].uid],
        maybeVotes: [],
        noVotes: [USERDATA[1].uid],
    },
    {
        eid: 4,
        title: 'Pre-Break Dinner',
        hostname: USERDATA[2].nickname,
        hostuid: USERDATA[2].uid,
        date: new Date(2024, 11, 13, 18, 0),
        location: "El Jefes",
        tags: [TAGDATA[4]],
        yesVotes: [USERDATA[2].uid, USERDATA[1].uid, USERDATA[4].uid],
        maybeVotes: [USERDATA[3].uid],
        noVotes: [],
    },
    {
        eid: 5,
        title: 'Rock Climbing Day!',
        hostname: USERDATA[2].nickname,
        hostuid: USERDATA[2].uid,
        date: new Date(2024, 11, 15, 15, 0),
        location: "CRG Climbing Gym, Fenway",
        tags: [TAGDATA[32], TAGDATA[27], TAGDATA[14]],
        yesVotes: [USERDATA[2].uid, USERDATA[1].uid, USERDATA[4].uid],
        maybeVotes: [USERDATA[3].uid],
        noVotes: [],
    },
]

export var MESSAGEDATA: Message[] = [
    {
        mid: 0,
        text: "Hello",
        senderUid: USERDATA[2].uid,
        avatar: USERDATA[2].picture,
        timestamp: new Date(2024, 11, 10, 10, 0),
    },
    {
        mid: 1,
        text: "Hey! I saw you signed up for the Christmas Party Event. Just need to know: do you have any food allergies?",
        senderUid: USERDATA[1].uid,
        avatar: USERDATA[1].picture,
        timestamp: new Date(2024, 11, 11, 18, 0),
    },
    {
        mid: 2,
        text: "Hold up I'm setting it up now",
        senderUid: USERDATA[2].uid,
        avatar: USERDATA[2].picture,
        timestamp: new Date(2024, 11, 10, 12, 15),
    },
    {
        mid: 3,
        text: "Ken Posted an Event",
        senderUid: -1,
        avatar: USERDATA[2].picture,
        timestamp: new Date(2024, 11, 10, 12, 17),
    },
    {
        mid: 4,
        text: "Sounds fun! Are we meeting up at the gym or here and walking over?",
        senderUid: USERDATA[5].uid,
        avatar: USERDATA[5].picture,
        timestamp: new Date(2024, 11, 10, 12, 30),
    },
    {
        mid: 5,
        text: "Oh good point... how about the common room and we walk over together?",
        senderUid: USERDATA[2].uid,
        avatar: USERDATA[2].picture,
        timestamp: new Date(2024, 11, 10, 12, 34),
    },
    {
        mid: 6,
        text: "Sounds good",
        senderUid: USERDATA[5].uid,
        avatar: USERDATA[5].picture,
        timestamp: new Date(2024, 11, 10, 12, 35),
    },
]

export var RACHATDATA: RAChat = {
    messages: [MESSAGEDATA[0]],
}

export var FLOORCHATDATA: FloorChat = {
    members: [0,1,2,3,4,5],
    messages: [MESSAGEDATA[2], MESSAGEDATA[3], MESSAGEDATA[4], MESSAGEDATA[5], MESSAGEDATA[6]],
}

export var ROTATINGCHATDATA: RotatingChat = {
    members: [USERDATA[0].uid, USERDATA[2].uid, USERDATA[3].uid, USERDATA[4].uid],
    theme: TAGDATA[1],
    secondsRemaining: 1209600,
    messages: [MESSAGEDATA[0]],
}

// THE COLLECTION OF ALL THE DATA IN THE SYSTEM (Mutable)
// "Lowkey considering removing this tbh. I don't think it has much (or any) use." -Ken
// var APPLICATION: Application = {
//     events: EVENTDATA,
//     tags: TAGDATA,
//     users: USERDATA,
// }






// --------------------------------------------------------------------------------
//
// LOWKEY YOU CAN ALSO IGNORE ALL THE METHODS BELOW, THEY'RE CURRENTLY NEVER USED
//
// --------------------------------------------------------------------------------






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
