import {Aufgabe} from "../../../model/school";

export class MathGenerator {

    public static random( min:number , max:number ){
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    private static aufgabe( number1:number, number2:number, symbol:string, result:number  ) :Aufgabe {
        const aufgabe: Aufgabe = {
            check: 0,
            help: false,
            helpCounter: 0,
            input: undefined,
            operation1: number1,
            operation2: number2,
            result: result,
            split: undefined,
            symbol: symbol
        };

        console.log(aufgabe);
        return aufgabe;
    }

    public static plus( min:number, max:number, counter:number ){
        let list = new Array<Aufgabe>();
        for( let i = 0; i < counter; i++ ){
            let number1 = this.random(min,max);
            let number2 = this.random(min,max);

            list.push( this.aufgabe(number1,number2,"+",number1 + number2) );
        }
        console.log(list);
        return list;
    }

    public static minus( min:number, max:number, counter:number ):Array<Aufgabe>{
        let list = new Array<Aufgabe>();
        for( let i = 0; i < counter; i++ ){
            let r1 = this.random(min,max);
            let r2 = this.random(min,max);

            let number1: number;
            let number2: number;
            if( r1 > r2 ){
                number1 = r1;
                number2 = r2;
            } else {
                number1 = r2;
                number2 = r1;
            }

            const aufgabe = this.aufgabe(number1,number2,"-",number1-number2);
            list.push(aufgabe);
        }
        return list;
    }

    public static mal( min:number, max:number, counter:number ): Array<Aufgabe>{
        let list = new Array<Aufgabe>();
        for( let i = 0; i < counter; i++ ){
            let r1 = this.random(min,max);
            let r2 = this.random(min,max);

            let number1: number;
            let number2: number;
            if( r1 > r2 ){
                number1 = r1;
                number2 = r2;
            } else {
                number1 = r2;
                number2 = r1;
            }

            const aufgabe = this.aufgabe(number1,number2,"*",number1*number2);
            list.push(aufgabe);
        }
        return list;
    }

    public static divide( min:number, max:number, counter:number ){
        let list = new Array<Aufgabe>();
        this.mal( min,max,counter ).map( m => {
            let a = this.aufgabe( m.result , m.operation2 , "/" , m.operation1 );
            list.push( a );
        });
        return list;
    }


}
