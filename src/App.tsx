import * as React from 'react';
import * as $ from 'jquery';
import './App.scss';

export default class App extends React.Component {

  public constructor(props: any) {
    super(props);
    this.state = {} as any;
  }

  public async componentDidMount() {
    const data = await this.fetch();
    this.setState({data});
  }

  public async fetch() {
    return await new Promise((resolve, reject) => {
      $.getJSON('https://jsonplaceholder.typicode.com/todos/1')
        .fail((data) => reject(data))
        .then((data) => resolve(data));
    })
  }

  public render() {
    const {state} = this;
    const data = state && (state as any).data;
    return (
      <div className="foo">
        {data? <div>{JSON.stringify(data)}</div> : <div>No data</div>}
      </div>
    );
  }
}
