/* global google */

var React = require('react')

module.exports = React.createClass({
  componentWillUnmount: function () {
    if (!this.marker) return

    this.marker.setMap(null)
  },

  render: function () {
    // create new marker
    if (!this.marker) {
      this.marker = new google.maps.Marker(this.props)

    // update existing marker
    } else {
      this.marker.setOptions(this.props)
    }

    return null
  }
})

module.exports.Animation = google.maps.Animation
