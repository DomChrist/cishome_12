import { Injectable } from '@angular/core';
import {Observable, PartialObserver, Subject} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ListResponse} from "../web/list-response";
import {CisHttpService} from "../../../../system/cis-connector/services/cis-http.service";
import {Item, ListAggregate} from "../domain/list-model";

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor( private http:CisHttpService) { }

  private listSubject = new Subject<ListAggregate>();
  public listStream = this.listSubject.asObservable();

  private list: ListAggregate;

    public addItem( reference:string, name:string , onSuccess:(resp:HttpResponse<any>) => void ) : Observable<HttpResponse<any>>{
        const uri = 'list/cmd/v2/'+reference+'/add/item';
        let request = {
            itemName : name
        }
        let obs = this.http.cisPost<ListResponse<any>>( uri , request);

        obs.subscribe( (data)=>{
            this.load(reference);
            onSuccess(data);
        });


        return obs;
    }

    public load( reference:string ){

        const uri = 'list/query/item/'+reference;
        this.http.cisGet<ListAggregate>( uri ).subscribe( (data)=>{
            this.list = data.body;
            this.listSubject.next( this.list );
        });
    }

    public finished( reference:string ): void{
        const uri = 'list/cmd/'+reference+'/finish';
        this.http.cisPost(uri,null).subscribe( data=>{
            this.load( reference );
        });
    }

    public remove( reference:string , aggregate:ListAggregate , item:Item){
        const uri = 'list/cmd/'+reference+'/remove/item/'+item.id;
        item.hidden = true;
        this.http.cisDelete( uri , )
            .subscribe( (result)=>{
                if( result.status === 200 ){
                    Object.assign( new ListAggregate() , aggregate ).removeItem( item );
                    this.listSubject.next(aggregate)
                }
            } );
    }

    public bought( reference:string,item:Item ){
        let geolocation = navigator.geolocation;
        let location = {}
        if( geolocation ){
            geolocation.getCurrentPosition( (p)=>{
                location = {
                    latitude : p.coords.latitude,
                    longitude : p.coords.longitude
                }
            });
        }

        let request = {
            "location" : location,
            "itemName" : item.name,
            "item" : item.id,
        }

        item.hidden = true;

        const uri = 'list/cmd/'+reference+'/buy';
        this.http.cisPost( uri , request )
            .subscribe( (result)=>{
                if( result.status === 200 ){
                    this.load( reference );
                }
            } );
    }

    public finish( reference: string ){
        const url = 'list/cmd/v2/' + reference + '/finish';
        this.http.cisPost(url , null).subscribe( (data) => {
           this.load(reference);
        });
    }

    public suggestItem( name:string ): Observable<any>{
        return this.http.cisGet<Array<Object>>( 'list/query/suggest/item?q=' + name );
    }

    get listAggregate(): ListAggregate {
        return this.list;
    }


}
