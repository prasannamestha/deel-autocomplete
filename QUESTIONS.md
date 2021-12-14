# Q&A

### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

A PureComponent does a shallow re-render. That means if an object is passed as props or state, PureComponent only checks the object reference. So, if the inner content of an object changes; Purecomponent might not re-render causing a difference in actual data vs rendered data.

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Data in the context might have changed but `sholdComponentUpdate` might prevent the re-render

### 3. Describe 3 ways to pass information from a component to its PARENT.

1. using callback props
2. using a context
3. using action dispatchers - but this is similar to using a context state

Along with these 3 ways, using mutationobserver, localstorage and window object are additional ways we could share information between components

### 4. Give 2 ways to prevent components from re-rendering.

1. ShouldComponentUpdate
2. memoize the component/data

### 5. What is a fragment and why do we need it? Give an example where it might break my app.

<React.Fragment> or <> is a fragment - this is used to prevent creating extra DOM nodes.
One example where Fragments might not be necessary:

```
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <> {/* consider this as a component */}
            <p>box1</p>
            <p>box2</p>
          </>
          <> {/* consider this as another component */}
            <p>box3</p>
            <p>box4</p>
          </>
        </div>
```

In this example you can clearly see that the UI doesn't render as expected instead this treats every <p> tag as the child of the div.

### 6. Give three examples of the HOC pattern

1. as a component:

```
<HOC>
  <Component1 />
  <Component2 />
</HOC>
```

2. as a wrapper:

```
export default withHOC(Component)
```

3. passing children as props

```
<HOC children={Component} {...additionalProps} />
```

### 7. What's the difference in handling exceptions in promises, callbacks and async..await

Promises: .catch block
callbacks: error as function args
async...await: try...catch block

### 8. How many arguments does setState take

If I remember correctly, setState accepts a setter and a callback. But the callback is not available while setting value using the `useState` hook

### 9. List the steps needed to migrate a Class to Function component

1. render() -> return jsx
2. this.state -> useState()
3. componentDidMount -> useEffect()

### 10. List a few ways styles can be used with components

1. using a css file or modules
2. using css-in-js solutions like styled components
3. using styled-jsx

### 11. How to render HTML string coming from server

parse the string and use `dangerouslySetHTML` (or an attribute with similar name)
