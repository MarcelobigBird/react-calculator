import React, { Component } from 'react';
import './Calculator.css';

import { Button } from '../components/Button';
import Display from '../components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};
export default class Calculator extends Component {
  state = { ...initialState };
  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation: operation, current: 1, clearDisplay: true });
    } else {
      const equal = operation === '=';
      const currentOperation = this.state.operation;
      const values = [...this.state.values];

      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
        if (isNaN(values[0]) || !isFinite(values[0])) {
          this.clearMemory();
          return;
        }
      } catch (error) {
        values[0] = this.state.values[0];
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equal ? null : operation,
        current: equal ? 0 : 1,
        clearDisplay: !equal,
        values,
      });
    }
  }

  addDigit(num) {
    if (num === '.' && typeof this.state.displayValue !== 'string') {
      return;
    }

    if (num === '.' && this.state.displayValue.includes('.')) {
      return;
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay === true;
    const currentValue = clearDisplay === true ? '' : this.state.displayValue;
    const displayValue = currentValue + num;

    this.setState({ displayValue: displayValue, clearDisplay: false });

    if (num !== '.') {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;

      this.setState({ values: values });
      console.log(values);
    }
  }

  render() {
    const setOperation = (op) => this.setOperation(op);

    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={() => this.clearMemory()} triple />
        <Button label="/" click={setOperation} operation />
        <Button label="7" click={(num) => this.addDigit(num)} />
        <Button label="8" click={(num) => this.addDigit(num)} />
        <Button label="9" click={(num) => this.addDigit(num)} />
        <Button label="*" click={setOperation} operation />
        <Button label="4" click={(num) => this.addDigit(num)} />
        <Button label="5" click={(num) => this.addDigit(num)} />
        <Button label="6" click={(num) => this.addDigit(num)} />
        <Button label="-" click={setOperation} operation />
        <Button label="1" click={(num) => this.addDigit(num)} />
        <Button label="2" click={(num) => this.addDigit(num)} />
        <Button label="3" click={(num) => this.addDigit(num)} />
        <Button label="+" click={setOperation} operation />
        <Button label="0" click={(num) => this.addDigit(num)} double />
        <Button label="." click={(num) => this.addDigit(num)} />
        <Button label="=" click={setOperation} operation />
      </div>
    );
  }
}
