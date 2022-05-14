import { Component, OnInit } from '@angular/core';
import {MeetingSearchResponse} from "../../../domain/meeting-response";
import {MeetingService} from "../../../application/service/meeting.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-meetings-input',
  templateUrl: './search-meetings-input.component.html',
  styleUrls: ['./search-meetings-input.component.css']
})
export class SearchMeetingsInputComponent implements OnInit {

  public showSearchBar = false;
  public searchResponse: MeetingSearchResponse[];
  public searchLine: string;

  constructor(private meetingService: MeetingService, private router: Router) { }

  ngOnInit(): void {
      this.meetingService.searchResult$.subscribe( data => {
          this.searchResponse = data;
      } );
      this.meetingService.search(undefined);
  }

  public toggle(){
      this.showSearchBar = !this.showSearchBar;
  }

  public open( m: MeetingSearchResponse ){
        this.meetingService.load(m.id);
        this.router.navigate(['/app/wdys/meeting/view',m.id]);
  }

    focusInput() {
        document.getElementById('searchline').focus();
    }

    public search(){
        this.meetingService.search( this.searchLine );
    }
}
