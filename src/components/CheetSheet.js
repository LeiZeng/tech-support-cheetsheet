import React, { Component } from 'react'

import Flow from './Flow'
import Check from './Check'

export default class CheetSheet extends Component {
  _getStart() {
    return (<Check title="START" onCheck={() => this._findMenuItem()}/>)
  }
  _findMenuItem() {
    return (
      <Flow
        title="FIND A MENU ITEM OR BUTTON WHICH LOOKS RELATED TO WHAT YOU WANT TO DO."
        yes="OK"
        no="I CAN'T FIND ONE"
        yesBranch={() => this._clickIt()}
        noBranch={() => this._pickOnAtRandom()}
      />)
  }
  _clickIt() {
    return (<Check title="Click It." onCheck={() => this._didItWork()}/>)
  }
  _pickOnAtRandom() {
    return (
      <Flow
        title="PICK ONE AT RANDOM"
        yes="I'VE TRIED THEM ALL."
        no="OK"
        yesBranch={() => 'I\'VE TRIED THEM ALL.'}
        noBranch={() => this._clickIt()}
      />)
  }
  _googleTheName() {
    return (
      <Check
        title="GOOGLE THE NAME OF THE PROGRAM PLUS A FEW WORDS RELATED TO WHAT YOU WANT TO DO. FOLLOW ANY INSTRUCTIONS."
        onCheck={() => this._didItWork()}
      />)
  }
  _didItWork() {
    return (
      <Flow
        title="DID IT WORK?"
        yes="YES"
        no="NO"
        yesBranch={() => 'YOU\'RE DONE!'}
        noBranch={() => this._tryThisOverHalfAnHour()}
      />)
  }
  _tryThisOverHalfAnHour() {
    return (
      <Flow
        title="HAVE YOU BEEN TRYING THIS FOR OVER HALF AN HOUR?"
        yes="YES"
        no="NO"
        yesBranch={() => 'ASK SOMEONE FOR HELP OR GIVE UP.'}
        noBranch={() => this._findMenuItem()}
      />)
  }
  render() {
    return (
      <section>
        <h2>Tech Support Cheat Sheet</h2>
        <p>See xkcd: Tech Support Cheat Sheet about how to use this flowchart.</p>
        {this._getStart()}
      </section>
    )
  }
}
