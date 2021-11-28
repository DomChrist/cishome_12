import {Session} from "./meeting-model";
import {MeetingAgenda} from "./meeting-agenda";

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

}
