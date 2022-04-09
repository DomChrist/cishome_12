import {Task} from '../model/task';


export interface TaskUseCase{

    loadTasks( success: ( tasks: Array<Task>) => void );


}
