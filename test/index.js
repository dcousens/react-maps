var React = require('react')
var GoogleMap = require('../')

var App = React.createClass({
  getInitialState: function () {
    return {
      t: 0,
      center: {
        lat: -37.9,
        lng: 145.08
      },
      marker: {
        lat: -37.9,
        lng: 145.08
      }
    }
  },

  componentDidMount: function () {
    var self = this

    setInterval(function () {
      var dx = 0.2 * Math.cos(self.state.t)
      var dy = 0.2 * Math.sin(self.state.t)

      self.setState({
        t: self.state.t + 0.01,
        marker: {
          lng: self.state.center.lng + dx,
          lat: self.state.center.lat + dy
        }
      })
    }, 10)
  },

  render: function () {
    return React.createElement(GoogleMap, {
      center: this.state.center,
      zoom: 8
    }, [
      React.createElement(GoogleMap.Marker, {
        key: 'marker1',
        position: this.state.marker,
        label: 'A pleasant place to live'
      })
    ])
  }
})

React.render(React.createElement(App), document.getElementById('app'))
