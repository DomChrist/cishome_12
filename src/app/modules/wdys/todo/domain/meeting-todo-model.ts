export interface MeetingSessionId {
    meeting: string;
    session: string;
}

export interface Done {
}

export interface MeetingToDo {
    creator: string;
    created: Date;
    updated: Date;
    version: number;
    id: string;
    meetingSessionId: MeetingSessionId;
    label: string;
    done: Done;
    due?: any;


    checked: boolean;
}

export interface MeetingId{
    value: string;
}

export interface SessionId{
    value:string;
}

export interface MeetingTodoAggregate{

    meeting: MeetingId;
    todos: MeetingToDo[];

}

export interface SessionTodoAggregate{

    session: SessionId;
    todos: MeetingToDo[];

}
