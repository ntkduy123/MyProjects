import React, { Component } from 'react'
import Nprogress from 'nprogress'
import ReactPlaceholder from 'react-placeholder'
import 'nprogress/nprogress.css'

import 'react-placeholder/lib/reactPlaceholder.css'
import CircularProgress from 'components/CircularProgress'

export default function asyncComponent(importComponent) {
  class AsyncFunc extends Component {
    constructor(props) {
      super(props)
      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      Nprogress.start()
      this.mounted = true
      const { default: Element } = await importComponent()
      Nprogress.done()
      if (this.mounted) {
        this.setState({
          component: <Element {...this.props} />
        })
      }
    }

    componentWillUnmount() {
      this.mounted = false
    }

    render() {
      /* eslint-disable-next-line */
      const Element = this.state.component || <CircularProgress />
      return (
        <ReactPlaceholder type="text" rows={7} ready={Element !== null}>
          {Element}
        </ReactPlaceholder>
      )
    }
  }

  return AsyncFunc
}
