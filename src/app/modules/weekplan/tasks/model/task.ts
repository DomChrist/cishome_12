import {SafeUrl} from '@angular/platform-browser';

export interface TaskImage {
  imageBytes: string;
  contentType: string;
  baseImage: string;
  safeUrl: SafeUrl;
}

export interface Task {
  id: string;
  description: string;
  taskImage: TaskImage;
  userGroup: string;

  weekOfMonth: number;

}
