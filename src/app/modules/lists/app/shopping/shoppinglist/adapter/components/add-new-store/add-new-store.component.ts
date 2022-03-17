import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ShoppingStoreService} from "../../../../shoppingstores/application/shopping-store.service";
import {Store} from "../../../../shoppingstores/domain/store-model";

@Component({
  selector: 'shopping-list-add-new-store',
  templateUrl: './add-new-store.component.html',
  styleUrls: ['./add-new-store.component.scss']
})
export class AddNewStoreComponent implements OnInit {

  public showInsertView;
  public store: Store[];

  @Output("storeAdded")
  public storeAdded = new EventEmitter<Store>();

  constructor( private stores: ShoppingStoreService) { }

  ngOnInit(): void {
      this.showInsertView = false;
      this.stores.stores( (a)=>{
          this.store = a.map(a=>a.store);
      });
  }

  public choose( s:Store){
      this.storeAdded.emit(s);
      this.showInsertView = false;
  }

}
