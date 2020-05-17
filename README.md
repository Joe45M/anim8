# anim8
## Anim8 - Javascript &amp; CSS based animations. 
Currently, Anim8 supports one form of animation, the "fade by scroll" animation, where opacity is relative to the scroll placement of the window and the element. 

## Documentation

### Use
To use Anim8 in your project, simply copy `/dist/anim8.min.js` (6kb) into your project, and instanciate a new instance of the class:
```js
let instance = new Anim8.Anim8(element, params);
```

#### Paramaters
**Element**:

| Type        | Description |
| ----------- | ----------- |
| string      | a string based element selctor       |


**params**:
params should be a javascript object with the below properties.

| paramater name | type          | Value             | Default |
|----------------|------         |-------------------|---------|
| direction      | string        |`'up'` or `'down'` | `'down'`|


### Note
When using `'up'` as the direction, the class will attempt to set the opacity of the target to 0, however there may be 
a delay in doing so. It is advised to set opacity to 0 on the target element manually.