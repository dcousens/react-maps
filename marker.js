/* global google */

var React = require('react')

module.exports = React.createClass({
  componentDidMount: function () { this.updateMarker(this.props) },
  componentWillReceiveProps: function (newProps) { this.updateMarker(newProps) },

  updateMarker: function (newProps) {
    var marker = (this.state && this.state.marker)

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
