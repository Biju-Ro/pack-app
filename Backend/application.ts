// Job for tmrw Ken add a method for populating the data when the app starts.
// Data includes: 12 users, any amount of tags, and 2 events.
// import {Tag, Event, User, Application} from 'types.ts';

import { Tag, User, Event, Application } from "./types";

// ALL OF THE TAGS IN THE SYSTEM (MUTABLE)
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
var EVENTDATA: Event[] = [
    {
        eid: 1,
        title: 'Food Court',
        host: USERDATA[1],
        month: 12,
        day: 9,
        year: 2024,
        hour: 6,
        minute: 30,
        meridiem: 'PM',
        tags: [TAGDATA[2], TAGDATA[3]],
        yesVotes: [USERDATA[0]],
        maybeVotes: [],
        noVotes: [],
    }
]

// THE COLLECTION OF ALL THE DATA IN THE SYSTEM (Mutable)
var APPLICATION: Application = {
    events: EVENTDATA,
    tags: TAGDATA,
    users: USERDATA,
}


