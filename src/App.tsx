import React, { useEffect, useRef } from "react";
import "./App.css";

declare global {
  interface Window {
    loadMap: () => void;
    kakao: any;
  }
}

function App() {
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

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

          map.current = new window.kakao.maps.Map(mapRef.current, options);
        }
      });
    };
    // 왜 스크립트 태그를 지우지...
    return () => script.remove();
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
    </div>
  );
}

export default App;
