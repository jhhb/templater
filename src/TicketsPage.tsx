import {Button, ButtonGroup, FormGroup, InputGroup, TextArea} from '@blueprintjs/core';
import {action} from 'mobx';
import {inject, observer} from 'mobx-react';
import * as React from 'react';
import {Link} from 'react-router-dom';

import './TicketsPage.scss';
import {IncrementableType, TicketsPageState} from './states/TicketsPageState';

interface IInputListProps {
  number: number;
  handleDecrement: (type: IncrementableType) => void;
  type: IncrementableType;
}

@inject('state') @observer
export class TicketsPage extends React.Component<{state: TicketsPageState}> {
  constructor(props) {
    super(props);
  }

  @action('<TicketsPage#componentDidMount>')
  componentDidMount(): void {
    this.props.state.setTicketId(this.props.match.params.ticketId);
  }

  buttonsForStatus(): JSX.Element {
    const {state} = this.props;
    const button = state.isEditing ?
      <Button text="Save" onClick={state.handleSave}/> :
      <Button text="Edit" onClick={state.handleEdit}/>;
    return (
      <div className="button-controls">
        <ButtonGroup>
          <Link to="/tickets">
            <Button text="New"/>
          </Link>
          {!state.isNew && button}
        </ButtonGroup>
      </div>
    )
  }

  render() {
    const {state} = this.props;
    return (
      <div id="tickets-page">
        <Sidebar>
          <span>No content</span>
        </Sidebar>
        <div className="content">
          <div className="ticket-form">
            {this.buttonsForStatus()}
            <FormGroup>
              <div className="top-row">
                <FormLabel label="Description"/>
              </div>
              <InputGroup/>
            </FormGroup>
            <FormGroup>
              <div className="top-row">
                <FormLabel label="URL"/>
              </div>
              <InputGroup/>
            </FormGroup>
            <FormGroup>
              <div className="top-row">
                <Button icon="plus" onClick={action(() => state.handleIncrement(IncrementableType.PLUSES))}/>
                <FormLabel label="Pluses"/>
              </div>
              <InputList number={state.numPluses} handleDecrement={state.handleDecrement} type={IncrementableType.PLUSES}/>
            </FormGroup>
            <FormGroup>
              <div className="top-row">
                <Button icon="plus" onClick={action(() => state.handleIncrement(IncrementableType.MINUSES))}/>
                <FormLabel label="Minuses"/>
              </div>
              <InputList number={state.numMinuses} handleDecrement={state.handleDecrement} type={IncrementableType.MINUSES}/>
            </FormGroup>
            <FormGroup>
              <div className="top-row">
                <Button icon="plus" onClick={action(() => state.handleIncrement(IncrementableType.TODOS))}/>
                <FormLabel label="TODOs"/>
              </div>
              <InputList number={state.numTodos} handleDecrement={state.handleDecrement} type={IncrementableType.TODOS}/>
            </FormGroup>
            <FormGroup>
              <div className="top-row">
                <Button icon="plus" onClick={action(() => state.handleIncrement(IncrementableType.IMPROVEMENTS))}/>
                <FormLabel label="Improvements"/>
              </div>
              <InputList number={state.numImprovements} handleDecrement={state.handleDecrement} type={IncrementableType.IMPROVEMENTS}/>
            </FormGroup>
            <FormGroup>
              <div className="top-row">
                <FormLabel label="General Comments"/>
              </div>
              <TextArea fill={true}/>
            </FormGroup>
          </div>
        </div>
      </div>
    )
  }
}

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      {props.children}
    </div>
  )
}

const InputList = (props: IInputListProps): JSX.Element => {
  const {number, type} = props;
  const arr = new Array(number).fill(0);
  const keyPrefix = Math.random();
  return (
    <div className="input-list" key={keyPrefix}>
      {
        arr.map((val, idx) => {
          return (
            <div className="removable-input" key={keyPrefix + idx + '-div'}>
              <Button disabled={number === 1} icon="minus" onClick={() => props.handleDecrement(type)} key={keyPrefix + idx + '-minus'}/>
              <InputGroup key={keyPrefix + idx + '-input'}/>
            </div>
          );
      })}
    </div>
  );
}

const FormLabel = (props: {label: string}) => {
  return (
    <label className="pt-label">
      {props.label}
    </label>
    );
}
