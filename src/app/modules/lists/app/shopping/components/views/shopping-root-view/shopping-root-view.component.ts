import { Component, OnInit } from '@angular/core';
import {ListService} from "../../../../application/list.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {ListAggregate} from "../../../../domain/list-model";

@Component({
  selector: 'app-shopping-root-view',
  templateUrl: './shopping-root-view.component.html',
  styleUrls: ['./shopping-root-view.component.scss']
})
export class ShoppingRootViewComponent implements OnInit {

    public reference = '';
    public list: ListAggregate;
    public showNewItem = false;
    public showNewItemInline = false;

    constructor(private service: ListService ,
                private router: ActivatedRoute,
                private msg: MessageService) { }

  ngOnInit(): void {
      this.service.listStream.subscribe( d=>this.list = d );
      this.router.paramMap.subscribe( map=>{
          this.reference = map.get("id");
          this.service.load(this.reference);
      });
  }

}
