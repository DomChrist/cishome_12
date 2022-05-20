import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-week-line',
  templateUrl: './todo-week-line.component.html',
  styleUrls: ['./todo-week-line.component.css']
})
export class TodoWeekLineComponent implements OnInit {

  constructor() { }

  public line: TodoWeekLine;

  ngOnInit(): void {
        this.line = new TodoWeekLine().current();
  }

}

export class TodoWeekLine{

    public currentDate: Date;
    public todoWeekLineDates: TodoWeekLineDate[] = new Array<TodoWeekLineDate>(7);


    constructor() {
        this.currentDate = new Date();
    }

    public current(): TodoWeekLine{

        this.todoWeekLineDates[3] = TodoWeekLineDate.current();
        this.todoWeekLineDates[2] = this.todoWeekLineDates[3].minus(1);
        this.todoWeekLineDates[1] = this.todoWeekLineDates[2].minus(1);
        this.todoWeekLineDates[0] = this.todoWeekLineDates[1].minus(1);

        this.todoWeekLineDates[4] = this.todoWeekLineDates[3].plusDays(1);
        this.todoWeekLineDates[5] = this.todoWeekLineDates[4].plusDays(1);
        this.todoWeekLineDates[6] = this.todoWeekLineDates[5].plusDays(1);

        console.log( this.todoWeekLineDates );
        return this;
    }

    public day( n: number ){
        switch (n){
            case 0: return 'Sun';
            case 1: return 'Mon';
            case 2: return 'Tue';
            case 3: return 'Wed';
            case 4: return 'Thu';
            case 5: return 'Fri';
            case 6: return 'Sat';
        }
        return '';
    }

}

export class TodoWeekLineDate{

    public date: Date;
    public isToday: boolean = false;

    public static readonly A_DAY = 1000 * 60 * 60 * 24;

    public static current(): TodoWeekLineDate{
        const d = new TodoWeekLineDate();
        d.date = new Date();
        d.isToday = true;
        return d;
    }

    public static dateMinus( d: Date, minus: number ){
        const date = new TodoWeekLineDate();
        date.date = new Date( d.getTime() - ( minus * TodoWeekLineDate.A_DAY) );
        return date;
    }

    public static datePlus( d: Date, plus: number ){
        const date = new TodoWeekLineDate();
        date.date = new Date( d.getTime() + ( plus * TodoWeekLineDate.A_DAY) );
        return date;
    }


    public plusDays( d: number ): TodoWeekLineDate{
        const date = new TodoWeekLineDate();
        date.date = new Date( this.date.getTime() + ( d * TodoWeekLineDate.A_DAY ) );
        date.isToday = date.date === new Date();
        return date;
    }

    public minus( d: number ): TodoWeekLineDate{
        const date = new TodoWeekLineDate();
        date.date = new Date( this.date.getTime() - ( d * TodoWeekLineDate.A_DAY ) );
        date.isToday = date.date === new Date();
        return date;
    }

}
