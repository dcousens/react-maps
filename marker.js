/* global google */

var React = require('react')
var blacklist = require('blacklist')

module.exports = React.createClass({
  componentDidMount: function () { this.updateMarker(this.props) },
  componentWillReceiveProps: function (newProps) { this.updateMarker(newProps) },

  getInitialState: function () {
    return {}
  },

  updateMarker: function (newProps) {
    var marker = this.state.marker
    var markerOptions = blacklist(newProps, 'map')
    markerOptions.map = this.context.map

    // create new marker
    if (!marker) {
      marker = new google.maps.Marker(newProps)

    // update existing marker
    } else {
      marker.setOptions(newProps)
    }

    this.setState({ marker: marker })
  },

  render: function () {
    return <div/>
  }
})

module.exports.Animation = google.maps.Animation
