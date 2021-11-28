import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageSize} from "../../../../../../../system/page-size";
import {HttpClient} from "@angular/common/http";
import {ListService} from "../../../../application/list.service";
import {ActivatedRoute} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {ShoppingListService} from "../../../services/shopping-list.service";

@Component({
  selector: 'app-shopping-add-item-view',
  templateUrl: './shopping-add-item-view.component.html',
  styleUrls: ['./shopping-add-item-view.component.scss']
})
export class ShoppingAddItemViewComponent implements OnInit {

    @Input()
    public reference: string;
    @Input()
    public type = 'sidebar';

    @Output()
    public created = new EventEmitter();

    public name = '';

    public store = '';

    public successMessage = '';

    public suggestList: Array<any>;

    private timer;

    public showInput = false;

    public page: PageSize;

    public items: MenuItem[];

    constructor(private http: HttpClient ,
                private service: ListService,
                private shoppingService: ShoppingListService,
                private router: ActivatedRoute,
                private msg: MessageService) { }

  ngOnInit(): void {
      this.page = new PageSize();
      this.page.currentWidth(window.innerWidth);
      this.router.parent.paramMap.subscribe( map => {
          this.reference = map.get('id');
      });
      window.setTimeout( () => {this.focusText();} , 1000 );
      window.addEventListener('resize' , (event) => {
          this.page.currentWidth( event.target['innerWidth'] );
      });
      this.items = [
          {
              icon: 'pi pi-pencil',
              command: () => {
                  //this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
              }
          },
          {
              icon: 'pi pi-refresh',
              command: () => {
                  //this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
              }
          },
          {
              icon: 'pi pi-trash',
              command: () => {
                  //this.messageService.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
              }
          },
          {
              icon: 'pi pi-upload',
          },
          {
              icon: 'pi pi-external-link',
              url: 'http://angular.io'

          }
      ];
  }

  private focusText(){
        const elementById = document.getElementById('input-name');
        if ( elementById ) { elementById.focus(); }
  }

  public setShopName( name:string ){
        this.store = name;
  }

  public send(){
      if( !this.name || this.name === '' ){
          this.msg.add( {severity: 'warn', summary: 'Itemname is empty'} );
          window.setTimeout( () => { this.msg.clear(); } , 1500 );
          return;
      }
      this.shoppingService.addItem( this.name , this.store , (data) => {
          if ( data.status >= 200 && data.status < 300 ){
              this.onSuccess( this.name );
              this.created.emit();
              this.name = '';
              this.focusText();
          }
          this.suggestList = new Array<any>();
      });
  }

  public suggest(){
      clearTimeout(this.timer);
      if ( this.name && this.name.length > 2 ){
          this.timer = window.setTimeout( () => {
              this.service.suggestItem( this.name ).subscribe( (resp) => {
                  this.suggestList = resp.body;
              });
          } , 1000 );
      } else {
          this.suggestList = [];
      }
  }

    public take( value: string) {
        this.name = value;
        this.send();
        this.focusText();
    }



    public onSuccess( name: string ){
        this.successMessage = name + ' erfolgreich angelegt';
        this.msg.add( {severity: 'success', summary: this.successMessage} );
        window.setTimeout( () => { this.successMessage = null; this.msg.clear(); } , 1500 );
    }

    public toggleInput( event ){
        this.showInput = !this.showInput;
        event.preventDefault();
    }

    get suggestListEmpty(){
        if ( this.suggestList && this.suggestList.length > 0 ){ return false; }
        return true;
    }

}
