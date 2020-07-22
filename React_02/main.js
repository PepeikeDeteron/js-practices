'use strict';

{
  const todos = [];

  const TodoHeader = props => {
    const remaining = props.todos.filter(todo => {
      return !todo.isDone; // 未完了の ToDo
    });
    return (
      <h1>
        <button onClick={props.purge}>Purge</button>
        My Todos
        <span>({remaining.length}/{props.todos.length}</span>
      </h1>
    );
  }

  const TodoItem = props => {
    return (
      <li>
        <label>
          <input type="checkbox"
            checked={props.todo.isDone}
            onChange={() => props.checkTodo(props.todo)}
          />
          <span className={props.todo.isDone ? 'done' : ''}>
          {props.todo.title}
          </span>
        </label>
        <span className="cmd" onClick={() =>
        props.deleteTodo(props.todo)}>[x]</span>
      </li>
    );
  };

  const TodoList = props => {
    const todos = props.todos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          checkTodo={props.checkTodo}
          deleteTodo={props.deleteTodo}
        />
      );
    })

    return (
      <ul>
        {props.todos.length ? todos : <li>Nothing to do!</li>}
      </ul>
    );
  };

  const TodoForm = props => {
    return (
      <form onSubmit={props.addTodo}>
        <input type="text" value={props.item} onChange={props.updateItem}/>
        <input type="submit" value="Add"/>
      </form>
    );
  };

  const getUniqueId = ()  => {
    // 被らないであろう文字列を生成するために、適当に時刻と乱数を36進数で連結する
    return new Date().getTime().toString(36) + '-' + Math.random.toString(36);
  }

  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        todos: todos, // 更新
        item: '',
      };
      this.checkTodo = this.checkTodo.bind(this);
      this.deleteTodo = this.deleteTodo.bind(this);
      this.updateItem = this.updateItem.bind(this);
      this.addTodo = this.addTodo.bind(this);
      this.purge = this.purge.bind(this);
    }

  purge() {
      if (!confirm('are you sure?')) {
        return;
      }
      const todos = this.state.todos.filter(todo => {
        return !todo.isDone;
      });
      this.setState({
        todos: todos
      });
    }

    addTodo(e) {
      e.preventDefault();

      if (this.state.item.trim() === '') {
        return;
      }

      const item = {
        // id にはユニークな値を付ける必要があるため、簡易的に被らないであろう文字列を生成する
        id: getUniqueId(),
        title: this.state.item,
        isDone: false,
      };

      const todos = this.state.todos.slice();
      todos.push(item);
      this.setState({
        todos: todos,
        item: '',
      });
    }

    deleteTodo(todo) {
      // 削除前に confirm で聞く
      if (!confirm('are you sure?')) {
        return;
      }

      const todos = this.state.todos.slice();
      const pos = this.state.todos.indexOf(todo);

      todos.splice(pos, 1);
      this.setState({
        todos: todos
      });
    }

    checkTodo(todo) {
      const todos = this.state.todos.map(todo => {
        return {id: todo.id, title: todo.title, isDone: todo.isDone};
      });

      const pos = this.state.todos.map(todo => {
        return todo.id;
      }).indexOf(todo.id);

      todos[pos].isDone = !todos[pos].isDone;
      this.setState({
        todos: todos
      });
    }

    updateItem(e) {
      this.setState({
        item: e.target.value
      });
    }

    // リロードした際もデータを永続化させる
    componentDidUpdate() {
      // データの保持
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    componentDidMount() {
      // データの読み込み
      this.setState({
        // 上手くいかなかった場合は空配列にする
        todos: JSON.parse(localStorage.getItem('todos')) || []
      });
    }

    render() {
      return (
        <div className="container">
          <TodoHeader
            todos={this.state.todos}
            purge={this.purge}
          />
          <TodoList
            todos={this.state.todos}
            checkTodo={this.checkTodo}
            deleteTodo={this.deleteTodo}
          />
          <TodoForm
            item={this.state.item}
            updateItem={this.updateItem}
            addTodo={this.addTodo}
          />
        </div>
      );
    }
  }

  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
}