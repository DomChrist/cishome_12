import {Session} from "./meeting-model";
import {MeetingAgenda} from "./meeting-agenda";
import {MeetingNote} from "../../meetingnote/domain/meeting-note-model";

export interface MeetingSearchResponse {
    id: string;
    description: string;
    sessionCount: number;
    sessionFrom: string;
    sessionTill: string;
    todosTotal: number;
    todosDone: number;
    creator: string;
}

export class PresentationModeResponse{

    session: Session;
    agenda: MeetingAgenda;
    notes: MeetingNote[];

}
