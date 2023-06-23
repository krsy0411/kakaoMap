import React, { useEffect, useRef, useState } from "react";
import "./App.css";

declare global {
  interface Window {
    loadMap: () => void;
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  // [map, setMap] = useState<any>();
  const map = useRef<any>(null);
  // 상태관리 : 배열data, 입력을 배열을 받음
  const [markerList, setMarkerList] = useState<any[]>([]);

  useEffect(() => {
    // script 태그를 만들어서 속성 넣고 html문서에 넣기
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=cbb49438e7bd4ad18d236ae0c6d7506f&autoload=false";
    document.head.appendChild(script);

    // html문서에서 script태그가 동작하면 - html문서보다 먼저 js가 읽히는 것을 방지하는 함수 : onload
    script.onload = () => {
      // v3가 완전히 로드된 이후에 콜백함수 실행 : load()
      window.kakao.maps.load(() => {
        // mapRef.current == 지도div
        if (mapRef.current) {
          var options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 10,
          };
          // map 객체 생성
          map.current = new window.kakao.maps.Map(mapRef.current, options);

          // 마우스 우클릭 이벤트
          window.kakao.maps.event.addListener(
            map.current,
            "rightclick",
            (mouseEvent: any) => {
              const latlng = mouseEvent.latLng;
              // 타이틀을 입력
              const title = prompt("마커의 타이틀을 입력해주세요");
              // 마커 객체
              var marker = new window.kakao.maps.Marker({
                map: map.current,
                position: latlng,
                title,
              });
              // 이전 데이터들을 풀어서 새로 받은 데이터와 새 배열로 생성
              setMarkerList((prev) => [...prev, marker]);
            }
          );
        }
      });
    };
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          width: 500,
          height: 500,
        }}
      ></div>
      {/* markerList를 순회하면서 value들을 div로 생성 */}
      {markerList.map((value) => (
        <div
          onClick={() => {
            // 클릭하면 해당 마커 사라짐
            value.setMap(null);
            // map함수에서 받은 value와 일치하지 않는 배열 내 값들만 살려서 set
            setMarkerList(markerList.filter((v) => v !== value));
          }}
        >
          {value.getTitle()}
        </div>
      ))}
    </div>
  );
}

export default App;
