export class School {



}

export interface Aufgabe{
    operation1: number,
    operation2: number,
    symbol: string,
    result: number;
    input: number;
    check: number;
}

export abstract class Checker{
    public checked = false;
    public abstract check();

}
