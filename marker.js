/* global google */

var React = require('react')

module.exports = React.createClass({
  componentDidMount: function () { this.updateMarker(this.props) },
  componentWillReceiveProps: function (newProps) { this.updateMarker(newProps) },

  updateMarker: function (props) {
    this.setState({
      marker: new google.maps.Marker(props)
    })
  },

  render: function () {
    return React.createElement('div')
  }
})
