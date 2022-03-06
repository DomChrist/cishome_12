import { Pipe, PipeTransform } from '@angular/core';
import {Module} from "./cis-dashboard.component";

@Pipe({
  name: 'activeModule'
})
export class ActiveModulePipe implements PipeTransform {

  transform(value: Module[], ...args: boolean[]): Module[] {
      console.log(value);
      console.log(args);
      let modules = value.filter( (m)=>{
        if( !m.accessible ) return false;
        if( args[0] ){
            if( !m.offlineSupport ) return false;
        }
        return true;
      });
      console.log(modules.length);
      return modules;
  }


}
