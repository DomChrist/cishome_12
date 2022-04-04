import { Component, OnInit } from '@angular/core';
import {ListService} from "../../../../application/list.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {ListAggregate} from "../../../../domain/list-model";
import {CisHttpService} from "../../../../../../../system/cis-connector/services/cis-http.service";
import {ListManagementResponse} from "../../../shoppinglist/domain/shopping-model";

@Component({
  selector: 'app-shopping-root-view',
  templateUrl: './shopping-root-view.component.html',
  styleUrls: ['./shopping-root-view.component.scss']
})
export class ShoppingRootViewComponent implements OnInit {

    public reference = '';
    public showNewItem = false;
    public showNewItemInline = false;

    public newListName: string;
    public showNewListDialog = false;

    public list: ListManagementResponse;

    constructor(private service: ListService ,
                private http: CisHttpService,
                private router: ActivatedRoute,
                private msg: MessageService) { }

  ngOnInit(): void {
      /*
      this.service.listStream.subscribe( d=>this.list = d );
      this.router.paramMap.subscribe( map=>{
          this.reference = map.get("id");
          this.service.load(this.reference);
      });
       */
      this.load();
  }

  private load(){
        const url = 'list/shoppinglist/query/v1';
        this.http.cisGet<ListManagementResponse>( url ).subscribe( (resp)=>{
            this.list = resp.body;
            console.log(resp.body);
        });
  }

  public newList(){
        this.service.newList( this.newListName , (ref) => {
            this.load();
            this.newListName = '';
            this.showNewListDialog = true;
        });
  }


}
