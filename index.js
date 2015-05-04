/* global google */

var React = require('react')
var blacklist = require('blacklist')

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      // WARNING: even if draggable/panControl is enable, props.center will still be authoritative
      draggable: false,
      panControl: false,

      // WARNING: even if rotateControl is enabled, props.heading will still be authoritative
      rotateControl: false,

      // WARNING: if scaleControl is enabled, ... something
      scaleControl: false,

      // WARNING: even if these are enabled, props.zoom will still be authoritative
      disableDoubleClickZoom: true,
      scrollwheel: false,
      zoomControl: false,

      // WARNING: even if enabled, props.mapTypeId will still be authoritative
      mapTypeControl: false,

      // WARNING: be careful with this
      keyboardShortcuts: false,
      streetViewControl: false,

      noClear: true
    }
  },

  getInitialState: function () {
    return {}
  },

  componentDidMount: function () { this.updateMap(this.props) },
  componentWillReceiveProps: function (newProps) { this.updateMap(newProps) },

  updateMap: function (newProps) {
    var domNode = this.getDOMNode()
    var mapOptions = blacklist(newProps, 'children', 'pan', 'autofit')
    var map = this.state.map

    // create new map
    if (!map) {
      map = new google.maps.Map(domNode, mapOptions)

    // update existing map
    } else {
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
    var map = this.state.map
    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { map: map })
    })

    return React.createElement('div', {
      style: { height: "100%", width: "100%" }
    }, children)
  }
})

// expose the marker on the top level export
module.exports.Marker = require('./marker')
