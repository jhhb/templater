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
  @observable ticketId?: string;

  @action("<TicketsPageStore#toggleEditing>")
  toggleEditing = (): void => {
    this.isEditing = !this.isEditing;
  }

  @computed
  get isNew(): boolean {
    return !this.ticketId;
  }

  @action("<TicketsPageStore#incrementType>")
  handleIncrement = (type: IncrementableType): void => {
    this[type] +=1;
  }

  @action("<TicketsPageStore#decrementType>")
  handleDecrement = (type: IncrementableType): void => {
    if (this[type] === 1) {
      return
    }
    this[type] -=1;
  }

  @action('<TicketsPageStore#setTicketId>')
  setTicketId = (ticketId?: string) => this.ticketId = ticketId;

  @action('<TicketsPageStore#handleSave>')
  handleSave = () => {
    this.isEditing = false;
  };

  @action('<TicketsPageStore#handleEdit>')
  handleEdit = () => {
    this.isEditing = true;
  };

}
