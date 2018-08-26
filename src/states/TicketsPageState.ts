import {action, computed, observable} from 'mobx';

export enum IncrementableType {
  PLUSES       = 'numPluses',
  MINUSES      = 'numMinuses',
  TODOS        = 'numTodos',
  IMPROVEMENTS = 'numImprovements'
}

export class TicketsPageState {
  @observable isEditing: boolean = false;
  @observable numPluses: number = 3;
  @observable numMinuses: number = 3;
  @observable numTodos: number = 1;
  @observable numImprovements: number = 3;
  @observable ticketId: null;

  @action("<TicketsPageStore#toggleEditing>")
  toggleEditing = () => {
    this.isEditing = !this.isEditing;
  }

  @computed
  get isNew() {
    return !this.ticketId;
  }

  @action("<TicketsPageStore#incrementType>")
  handleIncrement = (type: IncrementableType) => {
    this[type] +=1;
  }

  @action("<TicketsPageStore#decrementType>")
  handleDecrement = (type: IncrementableType) => {
    if (this[type] === 1) {
      return
    }
    this[type] -=1;
  }
}
