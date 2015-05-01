var React = require('react')
var GoogleMap = require('../')
var Marker = GoogleMap.Marker

var App = React.createClass({
  getInitialState: function () {
    return {}
  },

  handleWindowResize: function () {
    this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    })
  },

  componentDidMount: function () {
    this.handleWindowResize()
    window.addEventListener('resize', this.handleWindowResize)
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  render: function () {
    var center = {
      lat: -37.8602828,
      lng: 145.079616
    }

    return (<GoogleMap
      center={center}
      zoom={8}
      height={this.state.windowHeight}
      width={this.state.windowWidth}
    >
      <Marker position={center} label="A pleasant place to live"/>
    </GoogleMap>)
  }
})

React.render(<App/>, document.getElementById('app'))
