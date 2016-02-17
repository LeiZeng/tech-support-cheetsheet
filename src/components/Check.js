import React, { Component, PropTypes } from 'react'

export default class Check extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onCheck: PropTypes.func
  };
  static defaultProps = {
    title: '',
    yes: 'Yes',
    no: 'No'
  };
  state = { branch: null };
  _onChange(event) {
    this.setState({
      branch: !!event.target.checked ? this.props.onCheck() : null
    })
  }
  render() {
    const { title } = this.props
    const { branch } = this.state
    return (<section>
      <label><input type="checkbox" onChange={this._onChange.bind(this)}/>{title}</label>
      {branch ? branch : (<p>(Check the box to continue)</p>)}
    </section>)
  }
}
