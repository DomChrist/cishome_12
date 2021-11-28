import {Participant} from "../../participant/domain/model/participant-model";

export class MeetingNoteModel {
}

export interface Meeting {
    meeting: string;
    session: string;
}

export interface MeetingNote {
    creator: string;
    created: Date;
    updated: Date;
    version: number;
    id: string;
    meeting: Meeting;
    participantId: string;
    participant: Participant;
    note: NoteDescription;
}

export interface NoteDescription {
    value: string;
    mediumValue: string;
    shortValue: string;
}
