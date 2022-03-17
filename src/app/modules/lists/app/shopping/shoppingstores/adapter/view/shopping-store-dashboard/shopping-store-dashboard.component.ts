import { Component, OnInit } from '@angular/core';
import {CisHttpService} from "../../../../../../../../system/cis-connector/services/cis-http.service";
import {StoreAggregate} from "../../../domain/store-model";
import {ShoppingStoreService} from "../../../application/shopping-store.service";

@Component({
  selector: 'app-shopping-store-dashboard',
  templateUrl: './shopping-store-dashboard.component.html',
  styleUrls: ['./shopping-store-dashboard.component.scss']
})
export class ShoppingStoreDashboardComponent implements OnInit {

  constructor( private http:CisHttpService , private storeService:ShoppingStoreService) { }

  public list: StoreAggregate[];
  public selectedItem: StoreAggregate;
  public inputName: string;
  public searchLine: string;

  ngOnInit(): void {
      this.init();
  }

  private init(){
      this.storeService.stores( (list)=>{
          this.list = list;
          this.inputName = '';
      } , ()=>{} );
  }

  public newStore(){
      let request = {
          name : this.inputName
      }
      this.http.cisPost('list/shopping/store/v1/cmd/new' , request ).subscribe( (resp)=>{
        this.init();
      } );
  }

  public search(){
      let base = this.selectedItem.store.link.link;
      let search = this.selectedItem.store.link.searchPath;
      let url = base + search + this.searchLine
      window.open(url, '_blank').focus();
  }

  public select( a:StoreAggregate ){
      this.selectedItem = a;
  }

  public unselect(){
      this.selectedItem = null;
  }

    imagePath(s: StoreAggregate) {
        return "/assets/lists/shopping/stores/" + s.store.name.key + ".svg";
    }
}
