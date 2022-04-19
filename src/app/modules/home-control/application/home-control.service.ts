import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {resolveNaptr} from "dns";

@Injectable({
  providedIn: 'root'
})
export class HomeControlService {

  public hue: HueControl;

  constructor( private http: HttpClient) {
      this.hue = new HueControl( http );
  }




}

export class HueControl{
    private readonly url = 'http://cis-home.selfhost.eu:25901/api/';
    private readonly key = 'X7VRIRos5dMrG9T8kwe91HISsNxBWT32yvrdwiPD';

    constructor(private http: HttpClient) {
    }

    get baseUrl(): string {
        return this.url + this.key + '/';
    }

    public groups(): Observable<any> {
        const url = this.baseUrl + 'groups';
        const observable: Observable<any> = this.http.get(url);
        return observable;
    }

    public lights(): Observable<Array<DeviceItem>> {
        const url = this.baseUrl + 'groups';
        const observable: Observable<HueResponse> = this.http.get<HueResponse>(url);
        return observable.pipe( map( val => {
            console.log('map');
            console.log(val);
            const data = new Array<DeviceItem>();
            for (const k in val) {
                const d: Device = val[k];
                const type = d.type;
                if (type === 'Room') {
                    const item: DeviceItem = {
                        key: k,
                        name: d.name,
                        lights: d.lights,
                        state: d.action.on
                    };
                    if (item.lights.length > 0) {
                        data.push(item);
                    }
                }
            }
            console.log('data');
            console.log(data);
            return data;
        }) );
    }

    public changeGroupStatus( d: DeviceItem , on: boolean, onSuccess?: (b: boolean) => void): void {
        const url = this.baseUrl + 'groups/' + d.key + '/action';
        const request = {
            'on' : !d.state
        };
        this.http.put(url, request).subscribe( (resp: Array<any>) => {
            const groupname = '/groups/' + d.key + '/action/on';
            console.log( resp[0]['success'][groupname] );
            const b: boolean = <boolean> resp[0]['success'][ groupname ];
            console.log('new state: ' + b + 'old: ' + on);
            d.state = b;
        } );
    }
}

export interface State {
    all_on: boolean;
    any_on: boolean;
}

export interface Action {
    on: boolean;
    bri: number;
    alert: string;
}

export interface Device {
    name: string;
    lights: string[];
    sensors: any[];
    type: string;
    state: State;
    recycle: boolean;
    class: string;
    action: Action;
}


export interface HueResponse {
    '1': Device;
    '2': Device;
    '3': Device;
    '5': Device;
    '6': Device;
    '7': Device;
    '8': Device;
    '9': Device;
}

export interface DeviceItem{
    key: string;
    name: string;
    lights: string[];
    state: boolean;
}
