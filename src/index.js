import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HelloWorld } from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <HelloWorld />
//   </React.StrictMode>
// );

/*

// Tick
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);

*/


/*

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素。

*/

// 函数组件与class组件
// 函数组件=> 函数组件是一个纯函数，接收props作为参数，返回一个React元素，是定义组件最简单的方式
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

/*
该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。
这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。
*/


// class组件=> class组件是ES6的语法，它继承了React.Component，通过render方法返回一个React元素


/*
class Welcome2 extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
*/


//上述两组件等效

// 渲染组件

// 1.将组件作为元素渲染

/*

const element = <Welcome name="Sara" />;

root.render(element);

*/

/*
在上面这个例子中，我们将 Welcome 组件作为一个元素直接传递给 ReactDOM.render()：
name="Sara"将值传递给了函数组件 Welcome，因此它会显示 Hello, Sara。
*/

// 组合组件

/*
组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。
按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。
*/

/*

function HelloEveryOne() {
  return (
    <div>
      <Welcome name="Kisara" />
      <Welcome name="Robot" />
      <Welcome name="Albet" />
    </div>
  );

}
root.render(<HelloEveryOne />);

*/

// 提取组件

/*
将组件拆分成更小的组件

例如下面的Comment组件可以拆分成Avatar，UserInfo，CommentText，CommentDate等组件
*/


/*
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}
*/

// 提取Avatar组件

/*

//将上面的代码拆分为以下两个片段

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}

// Avatar 不需要知道它是在 Comment 内部是如何被渲染的，它只需要知道它接收的数据是什么。
// 因此我们可以给它取一个更通用的名字：user

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
*/


//提取更多组件

/*

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}

function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

*/

// 注意事项：

//组件不论是函数组件还是class组件，都不能修改自身的props
//所有React组件都必须像纯函数一样保护它们的props不被更改。




// State和生命周期

/*

参考前一章时钟的例子，在元素渲染章节中，我们只了解了一种更新UI的方式，就是调用ReactDOM.render()。

const root = ReactDOM.createRoot(document.getElementById('root'));
  
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);

*/

// 在本章节中，我们将学习如何封装真正可复用的 Clock 组件。它将设置自己的计时器并每秒更新一次。

// 首先，从封装时钟外观开始

/*

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);

*/

// 上述代码忽略了一个关键的技术细节：Clock 组件需要设置一个计时器并每秒更新一次 UI。

// 如果我们想像下面这行一样，只编写一次代码，让 Clock 组件自己设置计时器并更新 UI，我们该怎么做呢？
// root.render(<Clock />);



// 我们需要把state添加到Clock组件中

// Tip:State与props类似，但是state是私有的，并且完全受控于当前组件。

// 将函数组件转换为class组件

// 1.创建一个同名的ES6 class，并且继承React.Component

// 2.添加一个空的render()方法

// 3.将函数体移动到render()方法中

// 4.在render()方法中使用this.props替换props

// 5.删除剩余的空函数声明

/*
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
*/

//Now the clock is defined as a class rather than a function.

/*
每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染 <Clock /> 
就仅有一个 Clock 组件的 class 实例被创建使用。
这就使得我们可以使用如 state 或生命周期方法等很多其他特性。
*/

// 使用以下三步将date从props转换为state：

// 1.把 render() 方法中的 this.props.date 替换成 this.state.date ：

/*
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
*/

// 2.添加一个 class 构造函数，它在给定 props 的情况下初始化 this.state：

/*
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// Class组件应该总是使用props调用基础构造函数。

// 3.删除 <Clock /> 元素中的 date 属性：

root.render(<Clock />);

*/

// 经过一番操作后，我们不需要指定date属性了，因为构造函数中已经制定过了
// 但是这个组件现在仍然不能自动更新时间。。。

// 那么接下来我们就要添加生命周期方法，让Clock动起来

// 添加生命周期方法到Class中


/*
在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。
当 Clock 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为“挂载（mount）”。
同时，当 DOM 中 Clock 组件被删除的时候，应该清除计时器。这在 React 中被称为“卸载（unmount）”。
我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法。

因此它们被称为生命周期方法。
*/


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  //该方法会在组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    //为了让Clock动起来，我们在这里设置一个定时器
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  //该方法会在组件从 DOM 中被移除之前直接调用
  //在这里我们要清除定时器
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //我们自己定义的获取时间的方法，它在定时器中每秒被调用一次
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
root.render(<Clock />);


/*
现在时钟每秒都会刷新。
让我们来快速概括一下发生了什么和这些方法的调用顺序：

1. 当 <Clock /> 被传给 root.render()的时候，React 会调用 Clock 组件的构造函数。
因为 Clock 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 this.state。我们会在之后更新 state。

2. 之后 React 会调用组件的 render() 方法。这就是 React 确定该在页面上展示什么的方式。
然后 React 更新 DOM 来匹配 Clock 渲染的输出。

3. 当 Clock 的输出被插入到 DOM 中后，React 就会调用 ComponentDidMount() 生命周期方法。
在这个方法中，Clock 组件向浏览器请求设置一个计时器来每秒调用一次组件的 tick() 方法。

4. 浏览器每秒都会调用一次 tick() 方法。 在这方法之中，Clock 组件会通过调用 setState() 来计划进行一次 UI 更新。
得益于 setState() 的调用，React 能够知道 state 已经改变了，然后会重新调用 render() 方法来确定页面上该显示什么。
这一次，render() 方法中的 this.state.date 就不一样了，如此一来就会渲染输出更新过的时间。React 也会相应的更新 DOM。

5. 一旦 Clock 组件从 DOM 中被移除，React 就会调用 componentWillUnmount() 生命周期方法，这样计时器就停止了。
*/

// Tips: 正确地使用State

/*
1. 不要直接修改 State

修改State并不会重新渲染组件

应该使用setState()方法来修改State
如this.setState({comment: 'Hello'});

构造函数是唯一可以给 this.state 赋值的地方。

2. State 的更新可能是异步的

React 可能会把多个 setState() 调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

// 错误的
this.setState({
  counter: this.state.counter + this.props.increment,
});

// 正确的
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));

3. State 的更新会被合并
当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。
例如，你的 state 包含几个独立的变量：

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }


然后你可以分别调用setState()来单独地更新它们：
    componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }

这里的合并是浅合并，所以 this.setState({comments}) 完整保留了 this.state.posts
但是完全替换了 this.state.comments。

4. 数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。
这就是为什么称 state 为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。
组件可以选择把它的 state 作为 props 向下传递到它的子组件中：

<FormattedDate date={this.state.date} />

FormattedDate 组件会在其 props 中接收参数 date
但是组件本身无法知道它是来自于 Clock 的 state，或是 Clock 的 props，还是手动输入的：

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

*/


// 事件处理

function Form() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log('You clicked submit.');
  }


  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      {/* <form onSubmit={handleSubmit}> */}
      <button type="submit">Submit</button>
    </form>
  );
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // this.setState(prevState => ({
    //   isToggleOn: !prevState.isToggleOn
    // }));

    // OR

    let isTO = !this.state.isToggleOn
    this.setState({ isToggleOn: isTO })
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

// root.render(<Toggle />);

class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// 向事件处理程序传递参数
/*
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>

(前者用的更多
 */

//条件渲染


//在 React 中，你可以创建不同的组件来封装各种你需要的行为。
//然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。

/*
React 中的条件渲染和 JavaScript 中的一样，
使用 JavaScript 运算符 if 或者条件运算符去创建元素来表现当前的状态，
然后让 React 根据它们来更新 UI。

例如下面两个组件
*/

function UserGreeting(props) {
  return <h1>You have successfully logined,Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Hello Guest,Please sign up then login.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

root.render(<Greeting isLoggedIn={false} />);


//元素变量

//你可以使用变量来储存元素。 
//它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。

//例如下面两个组件，分别代表了登陆和登出按钮
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
/*
在下面的示例中，我们将创建一个名叫 LoginControl 的有状态的组件。
它将根据当前的状态来渲染 <LoginButton /> 或者 <LogoutButton />。
同时它还会渲染上一个示例中的 <Greeting />。
*/


class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);//绑定登陆按钮
    this.handleLogoutClick = this.handleLogoutClick.bind(this);//绑定登出按钮
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
// root.render(<LoginControl />);

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      //如果unreadMessages数组中有元素,就显示后面的内容
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
    /*
之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression,
而 false && expression 总是会返回 false。
因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
请注意，falsy 表达式 会使 && 后面的元素被跳过，但会返回 falsy 表达式的值。
在下面示例中，render 方法的返回值是 <div>0</div>。
    */
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];


// root.render(<Mailbox unreadMessages={messages} />);


// 三目运算符

//另一种内联条件渲染的方法是使用 JavaScript 中的三目运算符 condition ? true : false。

/*
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
*/


//阻止组件渲染

/*
在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。
下面的示例中，<WarningBanner /> 会根据 prop 中 warn 的值来进行条件渲染。如果 warn 的值是 false，那么组件则不会渲染:
*/

function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        {/* 如果warn为false，则该组件不会被渲染 */}
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

root.render(<Page />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
