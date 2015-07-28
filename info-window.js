/* global google */

var React = require('react')
var blacklist = require('blacklist')
var xtend = require('xtend')

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
    var options = blacklist(this.props, 'children', 'content', 'map', 'open')

    // new
    if (!this.iw) {
      var content = React.renderToString(this.props.children)
      this.iw = new google.maps.InfoWindow(xtend({ content: content }, options))

    // existing
    } else {
      this.iw.setOptions(options)
    }

    // avoid superfluous map reset
    if (props.map !== this.map) {
      this.map = props.map

      if (props.open) {
        this.iw.open(this.map)
      }
    }

    return null
  }
})

module.exports.Animation = google.maps.Animation
