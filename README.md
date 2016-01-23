<p align="center">
  <img alt="Logo" src="resources/logo_128.gif" width="128">
</p>

# Tiler / Propagate

A browser side utility library to apply time-based propagations on 2D arrays.

## Usage

#### Direct call

The function `Tiler.propagate()` immediatly apply a propagation on an array.

```js
Tiler.propagate(propagation, elements, parameters, callback, finish)
```

| Parameter       | Type     | Description                                                                        |
| --------------- | -------- | ---------------------------------------------------------------------------------- |
| **propagation** | String   | Name of the propagation to apply                                                   |
| **elements**    | Array    | Array to propagate into                                                            |
| **parameters**  | Object   | Propagation parameters                                                             |
| **callback**    | Function | Function called with for each element with the element and his index as parameters |
| **finish**      | Function | Function called when the propagation is done                                       |

###### Example

```js
Tiler.propagate('All', elements, {}, function (element, index) {
  console.log(index, '->', element);
}, function () {
  console.log('Done');
});
```

#### Instanciation

If the same propagation will be applied multiple times, it can be instantiated only one time then be runned
several times. All propagations are available in the `Tiler.propagate.propagation` namespace.

**Warning :** In the `Tiler.propagate.propagation` namespace, the propagation names are in lower case (for example
propagation 'All' is `Tiler.propagate.propagations.all`)

All propagations expose the same interface.

```js
constructor(elements, parameters);
```

| Parameter       | Type     | Description             |
| --------------- | -------- | ----------------------- |
| **elements**    | Array    | Array to propagate into |
| **parameters**  | Object   | Propagation parameters  |

```js
run(callback, finish);
```

| Parameter       | Type     | Description                                                                        |
| --------------- | -------- | ---------------------------------------------------------------------------------- |
| **callback**    | Function | Callback called with for each element with the element and his index as parameters |
| **finish**      | Function | Callback called when the propagation is done                                       |

###### Example

```js
var propagation = Tiler.propagate.propagations.all(elements, {});

propagation.run(function (element, index) {
  console.log(index, '->', element);
}, function () {
  console.log('Done');
});
```

## Propagations

##### All

```js
Tiler.propagate.propagations.all
```

Simpliest propagation, trigger the callback on all elements simultaneously.

###### Parameters

None

##### Linear

```js
Tiler.propagate.propagations.linear
```

Trigger one element at a time and line by line.

###### Parameters

| Parameter     | Type   | Description                                                                                                      |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| **rows**      | Number | Number of rows in the 2D array                                                                                   |
| **columns**   | Number | Number of columns in the 2D array                                                                                |
| **origin**    | Array  | Array with the vertical (`'top'` or `'bottom'`) and horizontal (`'left'` or `'right'`) origin of the propagation |
| **direction** | String | Propagation direction (`'horizontal'` or `'vertical'`)                                                           |
| **delay**     | Number | Delay in milliseconds between each propagation step                                                              |
