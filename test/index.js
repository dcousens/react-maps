var React = require('react')
var GoogleMap = require('../')
var Marker = GoogleMap.Marker

var App = React.createClass({
  getInitialState: function () {
    return {}
  },

  render: function () {
    var center = {
      lat: -37.8602828,
      lng: 145.079616
    }

    return (<GoogleMap
      center={center}
      zoom={8}
    >
      <Marker position={center} label="A pleasant place to live"/>
    </GoogleMap>)
  }
})

React.render(<App/>, document.getElementById('app'))
