import React from 'react'
import { render } from 'react-dom'

import CheetSheet from './components/CheetSheet'

global.React = React
render(
  <CheetSheet/>,
  document.getElementById('root')
)
