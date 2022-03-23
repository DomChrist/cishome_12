import { Injectable } from '@angular/core';
import {CisHttpService} from "../../../../../../system/cis-connector/services/cis-http.service";
import {StoreAggregate} from "../domain/store-model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingStoreService {

  private $stores: Array<StoreAggregate>;

  constructor( private http:CisHttpService) { }


   public stores( response:( aggregates:Array<StoreAggregate>)=>void , error?:()=>void ) {
        if( this.$stores ){
            response( this.$stores );
        } else {
            this.http.cisGet<StoreAggregate[]>('list/shopping/store/v1/query/all').subscribe( (resp=>{
                this.$stores = resp.body;
                response(this.$stores);
            }) , (e => {
                if(error) error();
            }));
        }
   }



}
