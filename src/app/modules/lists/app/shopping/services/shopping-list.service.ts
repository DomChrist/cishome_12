import { Injectable } from '@angular/core';
import {CisHttpService} from "../../../../../system/cis-connector/services/cis-http.service";
import {Observable, Subject} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {ListResponse} from "../../web/list-response";
import {Item, ListAggregate} from "../../domain/list-model";
import {ShoppingModel} from "../shoppinglist/domain/shopping-model";
import {MessageService} from "primeng/api";
import {Settlement} from "../settlement/domain/model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private shoppingModel: ShoppingModel;
  private shoppingSubject = new Subject<ShoppingModel>();
  public shoppingStream = this.shoppingSubject.asObservable();

  constructor( private http: CisHttpService, private message: MessageService) { }

    public open( id: string ): ShoppingModel{
        return this.shoppingList(id);
    }

    public clearCache(): ShoppingListService{
      this.shoppingModel = undefined;
      return this;
    }

    public list( id: string , success:( model: ShoppingModel )=>void ){
        if( this.shoppingModel && this.shoppingModel.id === id ){
            success(this.shoppingModel);
        } else {
            this.http.cisGet<ShoppingModel>( 'list/shoppinglist/query/v1/' + id ).subscribe( (resp)=>{
                console.log(resp.body);
                this.shoppingModel = resp.body;
                this.shoppingSubject.next(this.shoppingModel);
                success(this.shoppingModel);
            });
        }
    }

    public shoppingList( id: string ): ShoppingModel{
        this.http.cisGet<ShoppingModel>( 'list/shoppinglist/query/v1/' + id ).subscribe( (resp)=>{
            console.log(resp.body);
            this.shoppingModel = resp.body;
            this.shoppingSubject.next(this.shoppingModel);
        });
        return this.shoppingModel;
    }

    public addItem( name: string , store: string , onSuccess:(resp: HttpResponse<any>) => void ): Observable<HttpResponse<any>>{
        console.log( 'addItem' );
        console.log(this.shoppingModel);
        const uri = 'list/shopping/cmd/v1/list/'+ this.shoppingModel.id + '/add/item';
        if ( store && store === 'default' ) store = null;
        const request = {
            itemName : name,
            counter : 1,
            store
        };
        console.log('request');
        console.log(request);
        let obs = this.http.cisPut<ListResponse<any>>( uri , request);
        obs.subscribe( (data) => {
            onSuccess(data);
        });
        return obs;
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

        const uri = 'list/shopping/cmd/v1/list/'+reference+'/bought';
        this.http.cisPut( uri , request )
            .subscribe( (result)=>{
                if( result.status === 200 ){
                    this.message.add({severity:'success' , summary: 'Item bought'});
                    //this.load( reference );
                }
            } , error => {
                this.message.add( {severity:'error' , summary:'Something went wrong'} );
            } );
    }

    remove(list: string, itemId: string , success:(agg: ShoppingModel) => void) {
        const uri = 'list/shopping/cmd/v1/list/' + list + '/remove/item/' + itemId;
        this.http.cisDelete<ShoppingModel>( uri ).subscribe( (resp) => {
            this.message.add( {severity: 'success' , summary: 'Item deleted'} );
            this.shoppingModel = resp.body;
            success( this.shoppingModel );
        } , error => {
            this.message.add( {severity: 'error' , summary: 'Something went wrong'} );
        });
    }

    public openSettlement( s: Settlement, success: () => void ){

        const list = s.items.map(i => {
            return {
                name : i.item.name,
                count : i.counter
            };
        });

        const request = {
            storeId : s.store.id,
            amount : s.sum,
            products : list
        };
        console.log( request );
        this.http.cisPost( 'list/shopping/settlement/v1/cmd', request )
            .subscribe( (resp) => {
                this.message.add( {severity: 'success' , summary: 'Settlement submitted'} );
                window.setTimeout( () => success() , 1000 );
            });
    }

}
