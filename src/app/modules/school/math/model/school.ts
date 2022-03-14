export class School {



}

export class AufgabenAggregate{

    aufgaben: Array<Aufgabe>;
    type: string;


    constructor(aufgaben: Array<Aufgabe>, type: string) {
        this.aufgaben = aufgaben;
        this.type = type;
    }

    public store(){
        localStorage.setItem( this.type , JSON.stringify(this.aufgaben) );
    }

    public clear(){
        localStorage.removeItem( this.type );
    }

    public static with( type:string ): AufgabenAggregate{
        let item:string = localStorage.getItem( type );
        let aufgaben:Array<Aufgabe> = JSON.parse( item );
        return new AufgabenAggregate( aufgaben , type );
    }

    get isEmpty(){
        if( this.aufgaben && this.aufgaben.length > 0 ) return false;
        return true;
    }

}

export interface Aufgabe{
    operation1: number,
    operation2: number,
    symbol: string,
    result: number;
    input: number;
    check: number;
    help: boolean;
    helpCounter: number;
    split: TeilAufgabe[];
}

export interface TeilAufgabe{
    operator1: number,
    operator2: number,
    symbol: string,
    result: number;
    input: number;
}

export abstract class Checker{
    public checked = false;
    public abstract check();

}
