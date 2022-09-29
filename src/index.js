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

// 注意事项：

//组件不论是函数组件还是class组件，都不能修改自身的props
//所有React组件都必须像纯函数一样保护它们的props不被更改。


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
