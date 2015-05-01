var React = require('react')
var GoogleMap = require('../')

var App = React.createClass({
  getInitialState: function () {
    return {}
  },

  render: function () {
    var center = {
      lat: -37.8602828,
      lng: 145.079616
    }

    return React.createElement(GoogleMap, {
      center: center,
      zoom: 8
    }, [
      React.createElement(GoogleMap.Marker, { position: center, label: 'A pleasant place to live' })
    ])
  }
})

React.render(React.createElement(App), document.getElementById('app'))
