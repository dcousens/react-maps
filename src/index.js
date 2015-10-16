/* global google */

let React = require('react')
let ReactDOM = require('react-dom')
let blacklist = require('blacklist')

module.exports = React.createClass({
  getDefaultProps () {
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

  getInitialState () {
    return {}
  },

  componentDidMount () { this.updateMap(this.props) },
  componentWillReceiveProps: function (newProps) { this.updateMap(newProps) },

  updateMap: function (newProps) {
    let domNode = ReactDOM.findDOMNode(this)
    let options = blacklist(newProps, 'children', 'pan', 'autofit')
    let map = this.state.map

    // create new map
    if (!map) {
      map = new google.maps.Map(domNode, options)

    // update existing map
    } else {
      map.setOptions(options)
    }

    // autofit the bounds to the children?
    if (newProps.autofit && newProps.children.length) {
      let bounds = new google.maps.LatLngBounds()

      React.Children.forEach(newProps.children, function (child) {
        let position = child.props.position
        if (!position) return

        bounds.extend(new google.maps.LatLng(position.lat, position.lng))
      })

      map.fitBounds(bounds)
    }

    this.setState({ map: map }, () => {
      if (!this.props.onUpdate) return

      this.props.onUpdate(map)
    })
  },

  getMap () { return this.state.map },
  getBounds () { return this.state.map.getBounds() },
  getCenter () { return this.state.map.getCenter() },
  getHeading () { return this.state.map.getHeading() },
  getProjection () { return this.state.map.getProjection() },
  getTilt () { return this.state.map.getTilt() },
  getZoom () { return this.state.map.getZoom() },

  render () {
    let map = this.state.map
    let children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, { map: map })
    })

    return (
      <div style={{ height: '100%', width: '100%' }}>
        {children}
      </div>
    )
  }
})

// expose the marker on the top level export
module.exports.InfoWindow = require('./info-window')
module.exports.Marker = require('./marker')
