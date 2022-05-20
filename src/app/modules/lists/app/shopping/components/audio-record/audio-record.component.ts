import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-record',
  templateUrl: './audio-record.component.html',
  styleUrls: ['./audio-record.component.css']
})
export class AudioRecordComponent implements OnInit {

    constructor() { }


    ngOnInit() {
    }


    public startVoice(){
        navigator.mediaDevices.getUserMedia( {audio : true })
            .then( stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorder.ondataavailable = (data) => {

                };
            });
    }

}

