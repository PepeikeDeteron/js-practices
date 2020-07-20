{
  const Counter = props => {
    return (
      // props.countUp には CounterList を通して App の countUp がセットされている
      <li style={{backgroundColor:props.counter.color}} onClick={() =>
      props.countUp(props.counter)}>
        {props.counter.id}:{props.counter.count}
      </li>
    );
  };

  // プロパティが渡ってくるので props という引数でとる
  const CounterList = props => {
    const counters = props.counters.map(counter => {
      // counter で受け取った個々の要素を map 関数でループ & 新しい配列を作りながら Counter Component で返す
      return (
        <Counter
          counter={counter} // counter 属性でデータを渡す
          key={counter.id} // ループで処理するには key というユニークな値を付ける必要がある
          countUp={props.countUp}
        />
      );
    });

    return (
      // 描画するのはリストなので ul 要素を作成
      // 中に入れる li 要素は上で定義した counters
      <ul>
        {counters}
      </ul>
    );
  };

  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        counters: [
          {id: 'A', count: 0, color: 'tomato'},
          {id: 'B', count: 0, color: 'skyblue'},
          {id: 'C', count: 0, color: 'limegreen'},
        ],
        total: 0
      };
      this.countUp = this.countUp.bind(this);
    }

    // state の中の count を変更するための countUp 関数は このクラスの中でしか定義できない
    // なので Counter Component からどんどん親要素に処理を渡す
    countUp(counter) {
      this.setState(prevState => {
        // オブジェクト形式なので map で counters のコピーを作りそのまま返す
        const counters = prevState.counters.map(counter => {
          return {id: counter.id, count: counter.count, color: counter.color};
        });
        // 何番目の counter.id なのかを調べる
        const pos = counters.map(counter => {
          return counter.id;
        }).indexOf(counter.id);
        counters[pos].count++;

        return {
          counters: counters,
          total: prevState.total + 1
        }
      });

    }
    render() {
      return (
        <div className="container">
          <CounterList
            counters={this.state.counters}
            countUp={this.countUp}
          />
          <div>TOTAL INVENTORY: {this.state.total}</div>
        </div>
      );
    }
  }

  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
}