import { Component, OnInit } from '@angular/core';
import {KeySafeService} from "../../../application/key-safe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SecretItem, SecretNote} from "../../../domain/model";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-note-overview',
  templateUrl: './note-overview.component.html',
  styleUrls: ['./note-overview.component.scss']
})
export class NoteOverviewComponent implements OnInit {

  private $id: string;

  public note: SecretNote;

  public description: string;
  public secret: string;

  public password: string;
  public passwordValid = false;
  public passwordFailCounter = 0;

  items: MenuItem[];
  showAddDialog = false;


  constructor( private service: KeySafeService,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.initItems();
        this.route.paramMap.subscribe( p=>{
            this.$id = p.get('id');
            this.service.loadById( this.$id , note => this.note = note);
        });
  }

  initItems(){
      this.items = [
          {
              icon: 'pi pi-lock',
              command: () => {
                  this.lockAll();
              }
          },
          {
              icon: 'pi pi-unlock',
              command: () => {
                  this.unlockAll();
              }
          },
          {
              icon: 'pi pi-plus',
              command: () => {
                  this.showAddDialog = true;
              }
          }
      ];
  }

  public addItem(){
      this.service.addItem( this.note, this.description, this.secret , this.password );
      this.service.loadById( this.$id , note => this.note = note);
      this.showAddDialog = false;
  }

    addPassword(){
      if( this.password && this.password.length > 3 ){
          if( this.note.secrets.length == 0 ){
              this.passwordValid = true;
          } else {
              try{
                  const decrypt = this.service.decrypt(this.note.secrets[0],this.password);
                  this.passwordValid = true;
              }catch (e){
                  this.passwordValid = false;
                  this.passwordFailCounter++;
                  if( this.passwordFailCounter > 3 ) {
                    this.router.navigate(['/app/safe']);
                  }
              }
          }
      }
    }

    unlock(i: SecretItem) {
        const decrypt = this.service.decrypt(i,this.password);
        i.decrypted = decrypt;
    }

    unlockAll(){
      this.note.secrets.forEach( i=>{
            this.unlock(i);
      });
    }

    lock(i: SecretItem) {
        i.decrypted = undefined;
    }

    lockAll(){
      this.note.secrets.forEach( i => {
          this.lock(i);
      } );
    }
}
