# react-maps

[![Version](http://img.shields.io/npm/v/react-maps.svg)](https://www.npmjs.org/package/react-maps)

Read the code for an understanding


## Example

``` javascript
	// ...

	render: function() {
		// Melbourne
		var center = {
			lat: -37.8602828,
			lng: 145.079616
		}

		return (<GoogleMap center={center} zoom={8}>
			<InfoWindow position={center} open>
				<h1>Melbourne</h1>
			</InfoWindow>
			<Marker position={center} label="A pleasant place to live"/>
		</GoogleMap>)
	}
```

## LICENSE [MIT](LICENSE)
