import * as React from 'react';
import './App.css';

export default class App extends React.Component {

  public constructor(props: any) {
    super(props);
    this.state = {} as any;
  }

  public async componentDidMount() {
    const res = await this.fetch();
    const data = await res.json();
    this.setState({data});
  }

  public async fetch() {
    return await fetch('https://jsonplaceholder.typicode.com/todos/1');
  }

  public render() {
    const {state} = this;
    const data = state && (state as any).data;
    return (
      <div className="App">
        {data? <div>{JSON.stringify(data)}</div> : <div>No data</div>}
        {/*<header className="App-header">*/}
          {/*<img src={logo} className="App-logo" alt="logo"/>*/}
          {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
          {/*To get started, edit <code>src/App.tsx</code> and save to reload.*/}
        {/*</p>*/}
      </div>
    );
  }
}
