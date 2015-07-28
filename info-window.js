/* global google */

var React = require('react')
var blacklist = require('blacklist')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      // WARNING: if autoPan is enabled, the parent maps props will be overridden
      disableAutoPan: true
    }
  },

  componentWillUnmount: function () {
    if (!this.iw) return

    this.iw.close()
  },

  render: function () {
    var props = this.props
    var options = blacklist(this.props, 'anchor', 'children', 'map', 'open')

    if (props.children) {
      options.content = React.renderToStaticMarkup(React.createElement('span', {}, props.children))
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
