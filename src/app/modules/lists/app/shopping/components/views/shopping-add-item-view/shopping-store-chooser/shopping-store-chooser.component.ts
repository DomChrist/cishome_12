import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-shopping-store-chooser',
  templateUrl: './shopping-store-chooser.component.html',
  styleUrls: ['./shopping-store-chooser.component.scss']
})
export class ShoppingStoreChooserComponent implements OnInit {

  constructor() { }

  public dialogVisible = false;

  @Input()
  public shopName = '';

  @Output()
  shopNameChanged = new EventEmitter<string>();

    public shopNameInput = '';


    ngOnInit(): void {
  }

  showDialog(){
      this.shopNameInput = '';
      this.dialogVisible = true;
  }

  save(){
        this.shopName = this.shopNameInput;
        this.dialogVisible = false;
        this.shopNameChanged.next(this.shopName);
  }

}
