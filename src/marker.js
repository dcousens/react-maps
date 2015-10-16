/* global google */

let React = require('react')
let blacklist = require('blacklist')

module.exports = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },

  componentWillUnmount () {
    if (!this.marker) return

    this.marker.setMap(null)
    google.maps.event.clearInstanceListeners(this.marker)
  },

  getMarker () {
    return this.marker
  },

  onClick () {
    if (!this.props.onClick) return

    this.props.onClick()
  },

  render () {
    let options = blacklist(this.props, {})
    if (!options.map) return null

    // avoid superfluous map reset
    if (options.map === this.map) {
      options = blacklist(options, 'map')

    } else {
      this.map = options.map
    }

    // new
    if (!this.marker) {
      this.marker = new google.maps.Marker(options)
      google.maps.event.addListener(this.marker, 'click', this.onClick)

    // existing
    } else {
      this.marker.setOptions(options)
    }

    return null
  }
})

module.exports.Animation = google.maps.Animation
