/* global google */

let React = require('react')
let ReactDOMServer = require('react-dom/server')
let blacklist = require('blacklist')

module.exports = React.createClass({
  getDefaultProps () {
    return {
      // WARNING: if autoPan is enabled, the parent maps props will be overridden
      disableAutoPan: true
    }
  },

  componentWillUnmount () {
    if (!this.iw) return

    this.iw.close()
  },

  render () {
    let props = this.props
    let options = blacklist(this.props, 'anchor', 'children', 'map', 'open')

    if (props.children) {
      options.content = ReactDOMServer.renderToStaticMarkup(React.createElement('span', {}, props.children))
    }

    // new
    if (!this.iw) {
      this.iw = new google.maps.InfoWindow(options)

    // existing
    } else {
      this.iw.setOptions(options)
    }

    if (props.open) {
      if (!props.map) return null

      this.iw.open(props.map, props.anchor)

    } else {
      this.iw.close()
    }

    return null
  }
})
