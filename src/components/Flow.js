import React, { Component, PropTypes } from 'react'

import RadioGroup from './RadioGroup'

export default class Flow extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    yes: PropTypes.string,
    no: PropTypes.string,
    yesBranch: PropTypes.func,
    noBranch: PropTypes.func
  };
  static defaultProps = {
    title: '',
    yes: 'Yes',
    no: 'No'
  };
  state = { branch: null };
  _onChange(value) {
    const { yes, no, yesBranch, noBranch } = this.props
    if (value === yes || value === no) {
      this.setState({
        branch: value === yes ? yesBranch() : noBranch()
      })
    }
  }
  render() {
    const { title, yes, no } = this.props
    const { branch } = this.state
    return (<section>
      <p>{title}</p>
      {<RadioGroup name={title} radios={[yes, no]} onChange={this._onChange.bind(this)}/>}
      {branch ? branch : <p>(Choose a branch)</p>}
    </section>)
  }
}
