import React, { Component, PropTypes } from 'react'

export default class RadioGroup extends Component {
  static propTypes = {
    radios: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };
  _onChange(event) {
    this.props.onChange(this._getValue())
  }
  _getValue() {
    const checked = Object.keys(this.refs).find(key => this.refs[key].checked)
    return this.refs[checked] ? this.refs[checked].id : null
  }
  _getItems(radio, index, id) {
    return (<li key={index}>
      <label><input ref={index} id={radio} name={id} onChange={this._onChange.bind(this)} type="radio"/>{radio}</label>
    </li>)
  }
  render() {
    const { radios, name } = this.props
    const id = `${name}${new Date().getTime()}`
    return (<ul>{radios.map((radio, index) => this._getItems(radio, index, id))}</ul>)
  }
}
