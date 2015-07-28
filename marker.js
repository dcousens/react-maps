/* global google */

var React = require('react')
var blacklist = require('blacklist')

module.exports = React.createClass({
  componentWillUnmount: function () {
    if (!this.marker) return

    this.marker.setMap(null)
  },

  render: function () {
    var props = this.props
    if (!props.map) return null

    // avoid adding/removing the marker to the map repeatedly
    if (props.map === this.map) {
      props = blacklist(props, 'map')
    }

    // create new marker
    if (!this.marker) {
      this.marker = new google.maps.Marker(props)
      this.map = props.map

    // update existing marker
    } else {
      this.marker.setOptions(props)
    }

    return null
  }
})

module.exports.Animation = google.maps.Animation
