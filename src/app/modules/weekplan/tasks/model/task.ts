export interface TaskImage {
  imageBytes: string;
  contentType: string;
  baseImage: string;
}

export interface Task {
  id: string;
  description: string;
  taskImage: TaskImage;
  userGroup: string;

  weekOfMonth: number;

}
