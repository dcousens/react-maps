/* global google */

var React = require('react')
var blacklist = require('blacklist')

module.exports = React.createClass({
  componentWillUnmount: function () {
    if (!this.marker) return

    this.marker.setMap(null)
  },

  render: function () {
    var options = this.props
    if (!options.map) return null

    // avoid map reset
    if (options.map === this.map) {
      options = blacklist(options, 'map')
    }

    // new
    if (!this.marker) {
      this.marker = new google.maps.Marker(options)
      this.map = options.map

    // existing
    } else {
      this.marker.setOptions(options)
    }

    return null
  }
})

module.exports.Animation = google.maps.Animation
