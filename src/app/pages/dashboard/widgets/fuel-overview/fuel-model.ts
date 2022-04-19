
export class Fuel {

    public stamp: Date;

    public data: FuelResponse;
    public cheapestE10: Station;
    public cheapestE5: Station;
    public cheapestDiesel: Station;


    constructor() {
    }

    public static of( r: FuelResponse ){
        const fuel = new Fuel();
        fuel.stamp = new Date();
        fuel.data = r;
        fuel.findCheapest();
        return fuel;
    }

    public findCheapest(){
        this.data.stations
            .filter( s => {
                if( !this.cheapestE10 ){
                    this.cheapestE10 = s;
                    this.cheapestE5 = s;
                    this.cheapestDiesel = s;
                } else {
                    if( s.e10 < this.cheapestE10.e10 ) this.cheapestE10 = s;
                    if( s.e5 < this.cheapestE5.e5 ) this.cheapestE5 = s;
                    if( s.diesel < this.cheapestDiesel.diesel ) this.cheapestDiesel = s;
                }
            });
    }

}

export interface Station {
    id: string;
    name: string;
    brand: string;
    street: string;
    place: string;
    lat: number;
    lng: number;
    dist: number;
    diesel: number;
    e5: number;
    e10: number;
    isOpen: boolean;
    houseNumber: string;
    postCode: number;
}

export interface FuelResponse {
    ok: boolean;
    license: string;
    data: string;
    status: string;
    stations: Station[];
}

export class GasStationsAggregate{

    private f: Fuel;

    public cheapestE10: Station;
    public cheapestE5: Station;
    public cheapestDiesel: Station;

    constructor(  ) {
    }

    public init( f: Fuel ){
        this.f = f;
        this.findCheapest();
    }

    private findCheapest(){
        this.f.data.stations
            .filter( s => {
                if( !this.cheapestE10 ){
                    this.cheapestE10 = s;
                    this.cheapestE5 = s;
                    this.cheapestDiesel = s;
                } else {
                    if( s.e10 < this.cheapestE10.e10 ) this.cheapestE10 = s;
                    if( s.e5 < this.cheapestE5.e5 ) this.cheapestE5 = s;
                    if( s.diesel < this.cheapestDiesel.diesel ) this.cheapestDiesel = s;
                }
            });
    }

    get fuel(): Fuel {
        return this.f;
    }

}
