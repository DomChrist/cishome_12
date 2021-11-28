import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {ListService} from "../../../application/list.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers : [MessageService]
})
export class AddItemComponent implements OnInit {

  @Input()
  public reference: string;
  @Input()
  public type = 'sidebar';

  @Output()
  public created = new EventEmitter();

  public name = "";

  public successMessage = '';

  public suggestList: Array<any>;

  private timer;

  public showInput = false;

  constructor(private http: HttpClient ,
              private service: ListService,
              private router: ActivatedRoute,
              private msg: MessageService) { }

  ngOnInit() {
      window.setTimeout( ()=>{this.focusText()} , 1000 );
  }

  private focusText(){
          let elementById = document.getElementById('input-name');
          if( elementById ) elementById.focus();
  }

  public send(){
    this.service.addItem( this.reference ,  this.name , (data)=>{
        if( data.status >= 200 && data.status < 300 ){
            this.onSuccess( this.name );
            this.created.emit();
            this.name = '';
        }
        this.suggestList = new Array<any>();
    });

  }

  public suggest(){
      clearTimeout(this.timer);
      if( this.name && this.name.length > 2 ){
          this.timer = window.setTimeout( ()=>{
              this.service.suggestItem( this.name ).subscribe( (resp)=>{
                  this.suggestList = resp.body;
              });
          } , 1000 );
      } else {
          this.suggestList = [];
      }
  }

  public take( value:string) {
      this.name = value;
      this.send();
      this.focusText();
  }



  public onSuccess( name:string ){
      this.successMessage = name + ' erfolgreich angelegt';
      this.msg.add( {severity:'success',summary: this.successMessage} );
      window.setTimeout( ()=>{ this.successMessage = null; this.msg.clear() } , 1500 );
  }

  public toggleInput( event ){
      this.showInput = !this.showInput;
      event.preventDefault();
  }

  get suggestListEmpty(){
      if( this.suggestList && this.suggestList.length > 0 ) return false;
      return true;
  }

}
