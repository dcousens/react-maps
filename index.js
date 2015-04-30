/* global google */

var React = require('react')
var blacklist = require('blacklist')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      height: '100%',
      width: '100%',
      disableDoubleClickZoom: false,

      // WARNING: if draggable/panControl is enabled, props.center should only be done once
      draggable: false,
      panControl: false,

      noClear: true,
      keyboardShortcuts: false,
      rotateControl: false,
      scaleControl: false,
      zoomControl: false,
      scrollwheel: false
    }
  },

  componentDidMount: function () { this.updateMap(this.props) },
  componentWillReceiveProps: function (newProps) { this.update(newProps) },

  updateMap: function (newProps) {
    var domNode = this.getDOMNode()
    var mapOptions = blacklist(newProps, 'children', 'height', 'width', 'pan', 'autofit')
    var map = this.state.map

    // create new map
    if (!map) {
      map = new google.maps.Map(domNode, mapOptions)

    // update existing map
    } else {
      var oldCenter = map.getCenter()
      var newCenter = mapOptions.center

      if (!oldCenter.equals(newCenter)) {
        if (newProps.pan) {
          map.panTo(newCenter)

        } else {
          map.setCenter(newCenter)
        }

        delete mapOptions.center
      }

      // update all other properties
      map.setOptions(mapOptions)
    }

    // autofit the bounds to the children?
    if (newProps.autofit && newProps.children) {
      var bounds = new google.maps.LatLngBounds()

      newProps.children.forEach(function (child) {
        var position = child.props.position
        if (!position) return

        bounds.extend(position)
      })

      map.fitBounds(bounds)
    }

    this.setState({ map: map })
  },

  getBounds: function () { return this.state.map.getBounds() },
  getHeading: function () { return this.state.map.getHeading() },
  getProjection: function () { return this.state.map.getProjection() },
  getTilt: function () { return this.state.map.getTilt() },
  getZoom: function () { return this.state.map.getZoom() },

  render: function () {
    var style = {
      height: this.props.height,
      width: this.props.width
    }

    return React.createElement('div', {
      className: 'map-canvas',
      style: style
    }, this.props.children)
  }
})
