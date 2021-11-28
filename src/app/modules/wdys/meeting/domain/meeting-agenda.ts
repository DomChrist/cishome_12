import {MeetingSessionId} from "../../todo/domain/meeting-todo-model";

export interface MeetingAgenda {
    meetingSessionId: MeetingSessionId;
    meetingPoints: MeetingPoint[];
}

export interface MeetingPoint {
    id: string;
    name: string;
    status: Status;
}

export interface Status {
    status: number;
    open: boolean;
}
