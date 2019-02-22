// $(document).ready(() => {
//   $("#search").click(function(){ 
//     alert("aaa");
//    })
//   })
var x_start;
var y_start;
function initMap(){


  let $ = document.querySelector.bind(document);
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
    let geolocation = navigator.geolocation;
    if (geolocation) {
      geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
    } else {
      console.log("trinh duyệt của bạn không hỗ trợ Geolocation.");
    }
  
  
  function onGeoSuccess(position) {
    x_start = position.coords.latitude;
    y_start = position.coords.longitude;
    drawMap();
  }
  
  function onGeoError(error) {
    let detailError;
    if(error.code === error.PERMISSION_DENIED) {
      detailError = "người dùng từ chối chia sẻ vị trí.";
    } 
    else if(error.code === error.POSITION_UNAVAILABLE) {
      detailError = "thông tin vị trí không khả dụng.";
    } 
    else if(error.code === error.TIMEOUT) {
      detailError = "yêu cầu đã hết thời gian ."
    } 
    else if(error.code === error.UNKNOWN_ERROR) {
      detailError = "lỗi không xác định."
    }
    alert(detailError)
  }
              // khai báo tọa độ của place
        function drawMap(){
             var myCenter=new google.maps.LatLng(x_start, y_start);
                function initialize()
                  {
                    var mapProp = {
                                  center:myCenter,
                                  zoom:14,
                                  mapTypeId:google.maps.MapTypeId.ROADMAP,
                                  panControl:true,
                                  zoomControl:true,
                                  mapTypeControl:true,
                                  scaleControl:true,
                                  streetViewControl:true,
                                  overviewMapControl:true,
                                  rotateControl:true
                                  };

                    var map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);

                    var marker=new google.maps.Marker({
                                                        position: myCenter,
                                                        draggable: true,
                                                        animation:google.maps.Animation.BOUNCE,
                                                        });
                    marker.setMap(map);
                    var around= new google.maps.Circle({
                      center:myCenter,
                      radius:2000,
                      strokeColor:"#0000FF",
                      strokeOpacity:0.8,
                      strokeWeight:2,
                      fillColor:"#0000FF",
                      fillOpacity:0.4
                    });
                    around.setMap(map);


                    var infowindow = new google.maps.InfoWindow({
                      content:"Hello World!"
                      });
                    //bắt sự kiện click marker
                    google.maps.event.addListener(marker, 'click', function() {
                      //mở infowindow
                      infowindow.open(map,marker);
                      });

                      //function initAutocomplete() {
                        alert("xxx")
                        // Create the search box and link it to the UI element.
                        var input = document.getElementById('pac-input');
                        var  placeRequestObj = {
                          location: myCenter,
                          radius: 5000 //bán kính tính bằng m.
                          }
                        var searchBox = new google.maps.places.SearchBox(input);
                        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                        // Bias the SearchBox results towards current map's viewport.
                        map.addListener('bounds_changed', function() {
                          searchBox.setBounds(map.getBounds());
                        });
                
                        var markers = [];
                        // Listen for the event fired when the user selects a prediction and retrieve
                        // more details for that place.
                        searchBox.addListener('places_changed', function() {
                          var places = searchBox.getPlaces();
                
                          if (places.length == 0) {
                            return;
                          }
                
                          // Clear out the old markers.
                          markers.forEach(function(marker) {
                            marker.setMap(null);
                          });
                          markers = [];
                
                          // For each place, get the icon, name and location.
                          var bounds = new google.maps.LatLngBounds();
                          places.forEach(function(place) {
                            if (!place.geometry) {
                              console.log("Returned place contains no geometry");
                              return;
                            }
                            var icon = {
                              url: place.icon,
                              size: new google.maps.Size(71, 71),
                              origin: new google.maps.Point(0, 0),
                              anchor: new google.maps.Point(17, 34),
                              scaledSize: new google.maps.Size(25, 25)
                            };
                
                            // Create a marker for each place.
                            markers.push(new google.maps.Marker({
                              map: map,
                              icon: icon,
                              title: place.name,
                              position: place.geometry.location
                            }));
                
                            if (place.geometry.viewport) {
                              // Only geocodes have viewport.
                              bounds.union(place.geometry.viewport);
                            } else {
                              bounds.extend(place.geometry.location);
                            }
                          });
                          map.fitBounds(bounds);
                        });
                      //}
                







              // Tạo sự kiện khi click search button
              var search = document.getElementById("search");
              search.addEventListener('click',searchPlace);
              function searchPlace(){
                // Lấy từ khóa người dùng đã nhập
                //var placeKeyword = $("#keyword").val().trim()
                var placeKeyword = document.getElementById("keyword").value;
                alert(placeKeyword);
                // Kiểm tra để chắc chắn từ khóa đã được nhập
                if (placeKeyword){
                    // Khởi tạo object chứa tùy chọn cho việc tìm kiếm địa điểm
                    // bao gồm vị trí, bán kính và từ khóa của địa điểm
                    var placeRequestObj =
                       { 
                        location: new google.maps.LatLng(x_start, y_start),
                        radius: 5000, // bán kính tính bằng m.
                        keyword: placeKeyword,
                       }
        
                    //Khởi tạo PlacesService
                 var   placesSvc = new google.maps.places.PlacesService(map)
                    // Thực hiện tìm kiếm địa điểm và gọi callback function
                    placesSvc.nearbySearch(placeRequestObj, searchPlacesResult)
                      }
                else
                    alert("Bạn chưa nhập thông tin tìm kiếm");
        
        // Callback function nhận kết quả tìm kiếm
        var searchPlacesResult = (results, status) =>{
            // Kiểm tra xem kết quả có thành công không
            if (status == google.maps.places.PlacesServiceStatus.OK){
                // Vẽ một vòng tròn để đánh dấu bán kính tìm kiếm
                drawCircle = new google.maps.Circle({
                    map: map,
                    center: new google.maps.LatLng(x_start, y_start),
                    radius: 5000,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 1,
                    strokeColor: "#FF0000",
                    fillColor: "#FF0000",
                    fillOpacity: 0.35
                  })
                // Duyệt mảng kết quả
              var  i = 0;
                while (i < results.length)
                    // Tạo các đánh dấu cho địa điểm trên bản đồ
                   { placeMarkerMaker(results[i])
                    i++
                   }
        
        // Tạo đánh dấu các điểm và gắn thông tin chi tiết khi click vào các đánh dấu đó
        var placeMarkerMaker = (place) =>{
            // Lấy kinh/vĩ độ của địa điểm
            placeLocation = place.geometry.location
            // Lấy tham chiếu địa điểm để lấy ra thông tin chi tiết
           var detailRequest =
                {
                  reference: place.reference
                }
            // Lấy chi tiết về địa điểm
            placesSvc.getDetails(detailRequest, (details, status) =>{
                var markerIcon = '';
                if (details.icon)
                    // Tạo icon cho đánh dấu
                    markerIcon = new google.maps.MarkerImage(details.icon, null, null, null, new google.maps.Size(32, 32))
                // Tạo đánh dấu
                placeMarker = new google.maps.Marker({
                    map: map,
                    position: placeLocation,
                    icon: markerIcon,
                    animation: google.maps.Animation.DROP
                  })
                })
                // Gắn sự kiện, khi click vào một địa điểm
                // hiển thị thông tin về địa điểm đó
                google.maps.event.addListener(placeMarker, 'click', (e) =>{
                    infoWindow.setContent("<b>#{details.name}</b><br />#{details.formatted_address}")
                  })
                    // Bật InfoWindow
                    infoWindow.open(map, placeMarker)
        }
            }
        }
        }

                 }
                  google.maps.event.addDomListener(window, 'load', initialize);
                }
              }
              //});




















