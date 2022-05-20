import {MultiTodoResponse, Todo} from './todo-model';

export class TodoEvents {
}

export class TodoResponseChanged{

    response: MultiTodoResponse;

    todoAdded: Todo;

}
