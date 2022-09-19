# Front End Part 2

1. What is the difference between Component and PureComponent? give an
example where it might break my app.

React.PureComponent: It is one of the most significant ways to optimize React applications. By using the pure component, there is no need for shouldComponentUpdate() Lifecycle Method as ReactJS Pure Component Class compares current state and props with new props and states to decide whether the component should re-render or Not.
    import React from 'react';

    class PercentageStat extends React.PureComponent {

    render() {
        const { label, score = 0, total = Math.max(1, score) } = this.props;

        return (
        <div>
            <h6>{ label }</h6>
            <span>{ Math.round(score / total * 100) }%</span>
        </div>
        )
    }

    }

    export default PercentageStat;

React.Component: But on the other hand, React.Component re-renders itself every time the props passed to it changes, parent component re-renders or if the shouldComponentUpdate() method is called. It doesn’t optimize the React application. They are easy and fast to implement and also are good for very small UI views where a re-render wouldn’t matter that much. They provide cleaner code and fewer files to deal with.

    class Welcome extends React.Component {
        render() {
            return <h1>Hello, {this.props.name}</h1>;
        }
    }
    const element = <div />;
    const element = <Welcome name="Sara" />;

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is
that?

The shouldComponentUpdate method allows us to exit the complex react update life cycle to avoid calling it again and again on every re-render. It only updates the component if the props passed to it changes.

3. Describe 3 ways to pass information from a component to its PARENT.

Pass a function as a prop to the Child component.
Call the function in the Child component and pass the data as arguments.
Access the data in the function in the Parent.
In the parent component, create a callback function. This callback function will retrieve the data from the child component.
Pass the callback function to the child as a props from the parent component.
The child component calls the parent callback function using props and passes the data to the parent component.

As a rule of thumb and especially for single page applications which are rendered on the client side: Data from and (with)in clients can't and shouldn't be trusted as a security measurement.

So consider the context as "not secure" and always rely on proper permission management on the server side - so the worst thing which can happen is that your client may see the "premium" menus, but can't get anything out of it since the server denies any action.

4. Give 2 ways to prevent components from re-rendering.

Replacing useState()with useRef()hook.
Memoization using useMemo() and useCallback() Hooks.

5. What is a fragment and why do we need it? Give an example where it might
break my app.

A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM.
    render() {
        return (
            <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
            </React.Fragment>
        );
    }

6. Give 3 examples of the HOC pattern.

This pattern allows us to reuse component logic throughout our application.
1.
    function withStyles(Component) {
        return props => {
            const style = { padding: '0.2rem', margin: '1rem' }
            return <Component style={style} {...props} />
        }
    }

    const Button = () = <button>Click me!</button>
    const Text = () => <p>Hello World!</p>

    const StyledButton = withStyles(Button)
    const StyledText = withStyles(Text)

2.
    const withConditionalFeedback = (Component) => (props) => {
    if (props.isLoading) return <div>Loading data.</div>;
    if (!props.data) return <div>No data loaded yet.</div>;
    if (!props.data.length) return <div>Data is empty.</div>;

    return <Component {...props} />;
    };

    const App = () => {
    const { data, isLoading } = fetchData();

    return <TodoList data={data} isLoading={isLoading} />;
    };

    const BaseTodoList = ({ data }) => {
        return (
            <ul>
            {data.map((item) => (
                <TodoItem key={item.id} item={item} />
            ))}
            </ul>
        );
    };

    const TodoList = withConditionalFeedback(BaseTodoList);

3.

    import React, { useState } from "react";

    import "./styles.css";

    function Component(props) {
        console.log(props);
        return (
            <div>
            <h2> Component Count {props.count}</h2>
            <button onClick={props.handleClick}>Click</button>
            </div>
        );
    }

    function Component1(props) {
        console.log(props);
        return (
            <div>
            <h2> Component1 Count {props.count}</h2>
            <button onClick={props.handleClick}>Click</button>
            </div>
        );
    }

    function HOC(WrapperFunction) {
        function wrapper(props) {
            const handleClick = () => {
            setCount(count + 1);
            };

            const [count, setCount] = useState(0);
            return (
            <WrapperFunction handleClick={handleClick} count={count} {...props} />
            );
        }

        // class wrapper extends React.Component {
        //   constructor(props) {
        //     super(props);
        //     this.state = {
        //       count: 0
        //     };
        //   }
        //   handleCount = () => {
        //     this.setState({count:this.state.count+1});
        //   };

        //   render() {
        //     return <WrapperComponent />;
        //   }
        // }

        return wrapper;
    }

    const Comp1 = HOC((props) => {
        return <Component {...props} />;
    });
    const Comp2 = HOC((props) => {
        return <Component1 {...props} />;
    });

    export default function App() {
        return (
            <div className="App">
            <Comp1 name="hel" />
            <Comp2 />
            </div>
        );
    }

7. what's the difference in handling exceptions in promises, callbacks and
async...await.

With Pomises
You handle with promise.catch(e => {})	
throw new Error(): Yes, unless resolve() was called earlier or the error happened in an asynchronous callback function, for example, a function passed to setTimeout().	
reject(): Yes, unless resolve() was called earlier.

With async...await, and callback
You handle with try {} catch {}
throw new Error(): 	Yes, but if the throw happens in a Promise it must have been awaited with the await syntax, and resolve must not have been called before the throw. Will not catch errors thrown in another call stack via a setTimeout() or setInterval() callback.
reject(): Yes, but only if the function was called with the await syntax, and only if resolve() has not been called for the promise already.

8. How many arguments does setState take and why is it async.

The setState method is the method to update the component’s internal state. It’s an asynchronous method that’s batched. This means that multiple setState calls are batched before a component is rerendered with the new state.
The setState method takes up to 2 arguments. We usually pass in only one. The first argument can be an object or a callback that’s used to update the state.

The second argument is a function that’s always run after setState is run. For instance, we can pass in a callback in the 2nd argument as follows:

9. List the steps needed to migrate a Class to Function Component.

Change

    class MyComponent extends React.Component {
        //...
    }

to

    function MyComponent(props) {
        //...
    }

Remove the render method, but keep everything after & including the return. Make this the last statement in your function.
From

    //...
        render() {
            
            return (<p>Hello, World</p>);
        
        }
    //...

To

    function MyComponent(props) {
        //...

        return (<p>Hello, World</p>);
    
    } // end of function

Class methods won't work inside a function, so lets convert them all to functions (closures).
From

    class MyComponent extends React.Component {
    
        onClickHandler(e) {
            // ...
        }
    
    }

to

    function MyComponent {
    
        const onClickHandler = (e) => {
            //...
        }
    
    }

The this variable in your function isn't going to be super useful any more. Remove the references to it throughout your render and functions.

    class MyComponent(props) extends React.Component {
    
        //...
        
        mySpecialFunction() {
            console.log('you clicked the button!')
        }
        
        onClickHandler(e) {
            this.mySpecialFunction();
        }
        
        
        render() {
            return (
            <div>
                <p>Hello, {this.props.name}</p>
                <button onClick={this.onClickHandler}>Click me!</button>
            </div>
            );
        }
    
    }

to

    function MyComponent(props) {
    
        //...
        
        const mySpecialFunction = () => {
            console.log('you clicked the button!')
        }
        
        const onClickHandler = (e) => {
            mySpecialFunction();
        }
        
        return (
            <div>
            <p>Hello, {props.name}</p>
            <button onClick={onClickHandler}>Click me!</button>
            </div>
        );
    
    }

Simply removing the constructor is a little tricky, so I'l break it down further.
From

    constructor(props) {
        super(props);
        //Set initial state
        this.state = {
            counter: 0,
            name: ""
        }
    }

to

    function MyComponent(props) {
    
        const [counter,setCounter] = useState(0);
        const [name,setName] = useState("");
    
    }

We don't need to bind event handlers any more with function components. So if you were doing this;
    constructor(props) {
        this.onClickHandler = this.onClickHandler.bind(this);
    }
simply remove these lines. (What a gross, overly verbose syntax anyway).
this.setState obviously doesn't exist any more in our function component. Instead we need to replace each of our setState calls with the relevant state variable setter.
Replace this;
From

    class MyComponent extends React.Component {
    
        onClickHandler(e) {
            this.setState({count: this.state.count+1})
        }
    
    }

to

    function MyComponent {
    
        const [count, setCount] = useState(0)
        
        const onClickHandler = e => {
            
            setCount(count+1);
            
        }
    
    }
    
Replace lifecycle methods with hooks
ComponentDidMount
Instead of using the componentDidMount method, use the useEffect hook with an empty dependency array.
ComponentWillUnmount
Instead of using the componentWillUnmount method to do cleanup before a component is removed from the React tree, return a function from the useEffect hook with an empty dependency array;
ComponentDidUpdate
If you pass nothing as the second argument to useEffect, it will trigger whenever a component is updated. So instead of using componentDidUpdate, use;

10. List a few ways styles can be used with components.

1. CSS Stylesheet
Simply import css file import './DottedBox.css' so you can have a separate css file for each component.
2. Inline styling
We can create a variable that stores style properties and then pass it to the element like style={nameOfvariable}
We can also pass the styling directly style={{color: 'pink'}}
3. CSS Modules
A CSS Module is a CSS file in which all class names and animation names are scoped locally by default. Great article about css modules here.
Similar to css we import css file import styles './DashedBox.css'
then we access to className as we access to object

11. How to render an HTML string coming from the server.

1: dangerouslySetInnerHTML
In most cases, dangerouslySetInnerHTML should be enough.

    <div dangerouslySetInnerHTML={{__html: '<strong>strong text</strong>'}} />

2: HTML to react parser
As an alternative to dangerouslySetInnerHTML you can use html-react-parser library.

    var parse = require('html-react-parser');
    parse('<div>text</div>');