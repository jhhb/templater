import {Button, ButtonGroup, FormGroup, InputGroup, TextArea} from '@blueprintjs/core';
import {inject, observer} from 'mobx-react';
import * as React from 'react';

import './TicketsPage.scss';
import {IncrementableType, TicketsPageState} from './states/TicketsPageState';

interface IInputListProps {
  number: number;
  handleIncrement: (type: IncrementableType) => void;
  handleDecrement: (type: IncrementableType) => void;
  type: IncrementableType;
  key: string;
}

@inject('state') @observer
export class TicketsPage extends React.Component<{state: TicketsPageState}> {
  constructor(props) {
    super(props);
  }

  buttonsForStatus() {
    const {state} = this.props;
    return (
      <ButtonGroup>
        {!state.isNew && <Button text={`${state.isEditing ? 'Cancel' : 'Edit'}`}/>}
        {state.isNew && <Button text="Save"/>}
      </ButtonGroup>
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
            <FormGroup label="Description">
              <InputGroup/>
            </FormGroup>
            <FormGroup label="URL">
              <InputGroup/>
            </FormGroup>
            <FormGroup label="Pluses">
              <InputList
                number={state.numPluses}
                handleIncrement={state.handleIncrement}
                handleDecrement={state.handleDecrement}
                type={IncrementableType.PLUSES}
              />
            </FormGroup>
            <FormGroup label="Minuses">
              <InputList
                number={state.numMinuses}
                handleIncrement={state.handleIncrement}
                handleDecrement={state.handleDecrement}
                type={IncrementableType.MINUSES}
              />
            </FormGroup>
            <FormGroup label="TODOs">
              <InputList
                number={state.numTodos}
                handleIncrement={state.handleIncrement}
                handleDecrement={state.handleDecrement}
                type={IncrementableType.TODOS}
              />
            </FormGroup>
            <FormGroup label="Improvements">
              <InputList
                number={state.numImprovements}
                handleIncrement={state.handleIncrement}
                handleDecrement={state.handleDecrement}
                type={IncrementableType.IMPROVEMENTS}
              />
            </FormGroup>
            <FormGroup label="General comments">
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
      <Button icon="plus" onClick={() => props.handleIncrement(type)} key={keyPrefix + '-plus'}/>
    </div>
  );
}

