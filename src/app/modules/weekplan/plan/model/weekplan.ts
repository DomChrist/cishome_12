import {SafeUrl} from "@angular/platform-browser";

export interface Weekplan {
  reference: Reference;
  list: DayOfWeek[];
}

export interface DayOfWeek {
  tasks: ToDo[];
  day: number;
  date : Date;
  today: boolean;
}

export interface Reference {
  uuid: string;
  group: string;
  reference: string;
}

export class ToDo {
    id: string;
    task: WeekplanTask;
    assignee: Assignee;
    day: DayOfWeek;
}

export class WeekplanTask {
  id: string;
  taskId: string;
  description: string;
  image: SafeUrl;
}

export class Assignee {
    firstName: string;
    initial: string;
    id: string;
    image: string;
}
