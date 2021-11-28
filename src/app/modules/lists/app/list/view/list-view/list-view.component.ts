import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {ListService} from "../../../application/list.service";
import {Item, ListAggregate} from "../../../domain/list-model";

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  public reference = '';
  public list: ListAggregate;
  public showNewItem = false;
  public showNewItemInline = false;

  constructor(private service: ListService ,
              private router: ActivatedRoute,
              private msg: MessageService) { }


  ngOnInit() {
      this.service.listStream.subscribe( d=>this.list = d );
      this.router.paramMap.subscribe( map=>{
      this.reference = map.get("id");
      this.service.load(this.reference);
      });

  }

  public load(){
      this.service.load( this.reference );
  }

  public created( $event ){
    this.load();
    this.showNewItem = false;
  }

  public finished(): void{
      this.service.finished( this.reference );
  }

  public remove( item:Item){
    this.service.remove( this.reference , this.list , item );
  }

  public bought( item:Item){
        this.service.bought( this.reference , item );
  }

}


