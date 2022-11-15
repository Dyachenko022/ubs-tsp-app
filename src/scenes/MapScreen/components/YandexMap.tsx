import React from 'react';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import WebView from 'react-native-webview';

interface IYandexMapProps {
  points: IMapPoint[],
  initialLongitude: number,
  initialLatitude: number,
  onMarkerPress: (id: number) => void,
}

export default class YandexMap extends React.Component<IYandexMapProps, never> {
  private readonly html: string
  private unmount = false
  private webview: React.RefObject<WebView> = React.createRef();

  constructor(props: IYandexMapProps) {
    super(props);
    this.html = `
        <html lang="ru">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
          <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
          <script type="text/javascript">
            ymaps.ready(init);
            let myMap;
    
            function init(){
              myMap = new ymaps.Map("map", {
                center: [${this.props.initialLatitude}, ${this.props.initialLongitude}],
                controls: ['geolocationControl', 'zoomControl' ],
                zoom: 13
              });
              window.ReactNativeWebView.postMessage(JSON.stringify({type: 'ready'}));
              window.ReactNativeWebView.postMessage(JSON.stringify({type: 'added'}));
              myMap.events.add('click', function (e) {
                // Получение координат щелчка
                var coords = e.get('coords');
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'helloworld'}));
                window.ReactNativeWebView.postMessage(JSON.stringify({type: 'hello', coords: coords.join(', ')}));
            });
            }
          </script>
        </head>
          <body>
              <div id="map" style="width: 100%; height: 100%; border: 20px red; box-sizing: border-box"></div>
          </body>
        </html>
    `;
  }

  componentWillUnmount() {
    this.unmount = true;
  }

  onWebViewMessage = (event: WebViewMessageEvent) => {
    let msg;
    try {
      msg = JSON.parse(event.nativeEvent.data);
      switch (msg.type) {
        case 'ready':
          this.placeMarkers();
          break;
        case 'markerPress':
          this.fitToSuppliedMarkers(msg.marker.geometry.coordinates);
          this.props.onMarkerPress(msg.marker.uId);
          break;
        default:
          break;
      }

    } catch (err) {
      console.error(err);
    }
  }

  markersToPoints = () => {
    const mapPoints = [];
    this.props.points.map((marker) => {
      const latitude = parseFloat(marker.location.split(',')[0]);
      const longitude = parseFloat(marker.location.split(',')[1]);
      mapPoints.push({
        type: marker.type,
        uId: marker.id,
        coordinates: [latitude, longitude],
        iconLayout: 'default#image',
        iconImageSize: [50, 50],
        iconImageHref: marker.logo,
        geometry: {
          coordinates: [latitude, longitude],
          type: 'Point',
        },
      });
    });
    return mapPoints;
  }

  componentDidUpdate(prevProps: IYandexMapProps) {
    if (prevProps.points.length !== this.props.points.length) {
      this.placeMarkers();
    }
  }


  placeMarkers = () => {
    const injectPlaceMarkes = `
      (function() {
        var markers = ${JSON.stringify(this.markersToPoints())}
        
        window.ReactNativeWebView.postMessage(JSON.stringify(markers))
        
        myMap.geoObjects.removeAll()
        myMap.geoObjects.each(function (e) {
          window.ReactNativeWebView.postMessage(JSON.stringify({type: 'custom', e}))
          }
        )
        markers.forEach(function(marker, i) {
          const point = new ymaps.Placemark(marker.coordinates, {}, {
              iconLayout: marker.iconLayout,
              iconImageHref: marker.iconImageHref,
              iconImageSize: marker.iconImageSize,
          });
          
          point.events.add("click", function (e) {
            window.ReactNativeWebView.postMessage(JSON.stringify({type: 'markerPress', markerIndex: marker.uId, marker: marker}))
          });
        
          myMap.geoObjects.add(point)
        })
        
      })();
    `;

    this.injectJavaScript(injectPlaceMarkes);
  }

  fitToSuppliedMarkers = (location: number[]) => {
    const injectPlaceMarkes = `
      (function() {
        myMap.panTo([
            ${location},
        ], {
          delay: 1000
        }).then(function () {
          myMap.setZoom(17);
        })
      })();
    `;

    this.injectJavaScript(injectPlaceMarkes);
  }

  injectJavaScript = (inject) => {
    if (!this.unmount) this.webview.current?.injectJavaScript(inject);
  }

  render() {
    setTimeout(() => this.fitToSuppliedMarkers(), 3000)
    return (
      <WebView
        ref={this.webview}
        source={{ html: this.html }}
        style={{ flex: 1,}}
        mixedContentMode='always'
        scalesPageToFit
        scrollEnabled={false}
        onMessage={this.onWebViewMessage}
      />
    );
  }
}
