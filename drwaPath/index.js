const fs = require("fs");
const { createCanvas } = require("canvas");
const xml2js = require("xml2js");

// GPX 데이터를 읽고 파싱합니다
function parseGpx(filePath) {
  const gpxData = fs.readFileSync(filePath, "utf8");
  const parser = new xml2js.Parser();

  return new Promise((resolve, reject) => {
    parser.parseString(gpxData, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// GPX 트랙 포인트를 가져오는 함수
function getTrackPoints(gpx) {
  return gpx.gpx.trk[0].trkseg[0].trkpt.map((point) => ({
    lat: parseFloat(point["$"].lat),
    lon: parseFloat(point["$"].lon),
  }));
}

// 경로의 최소, 최대 좌표 계산
function calculateBounds(trackPoints) {
  const lats = trackPoints.map((p) => p.lat);
  const lons = trackPoints.map((p) => p.lon);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLon = Math.min(...lons);
  const maxLon = Math.max(...lons);

  return { minLat, maxLat, minLon, maxLon };
}

// 좌표를 캔버스에 맞게 정규화 (패딩 적용)
function convertCoordToCanvas(
  lat,
  lon,
  bounds,
  canvasSize = 256,
  padding = 20
) {
  const { minLat, maxLat, minLon, maxLon } = bounds;

  const x =
    padding + ((lon - minLon) / (maxLon - minLon)) * (canvasSize - 2 * padding);
  const y =
    padding + ((maxLat - lat) / (maxLat - minLat)) * (canvasSize - 2 * padding);

  return { x, y };
}

// 경로 기반 썸네일 생성
async function createThumbnail(gpxFilePath, outputFilePath) {
  const gpx = await parseGpx(gpxFilePath);
  const trackPoints = getTrackPoints(gpx);

  // 경로의 경계 계산 (최소/최대 위도, 경도)
  const bounds = calculateBounds(trackPoints);

  // 캔버스 설정 (256x256, 검정 배경)
  const canvas = createCanvas(256, 256);
  const ctx = canvas.getContext("2d");

  // 배경을 검정으로 채우기
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 256, 256);

  // 경로 그리기 (흰색 선)
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();

  trackPoints.forEach((point, index) => {
    const { x, y } = convertCoordToCanvas(point.lat, point.lon, bounds);

    if (index === 0) {
      ctx.moveTo(x, y); // 첫 번째 점으로 이동
    } else {
      ctx.lineTo(x, y); // 경로를 잇는 선 그리기
    }
  });

  ctx.stroke(); // 경로 그리기 완료

  // 시작점과 끝점에 포인트 그리기 (빨간색 원)
  ctx.fillStyle = "red";

  const startCoords = convertCoordToCanvas(
    trackPoints[0].lat,
    trackPoints[0].lon,
    bounds
  );
  const endCoords = convertCoordToCanvas(
    trackPoints[trackPoints.length - 1].lat,
    trackPoints[trackPoints.length - 1].lon,
    bounds
  );

  // 시작점 그리기
  ctx.beginPath();
  ctx.arc(startCoords.x, startCoords.y, 5, 0, Math.PI * 2);
  ctx.fill();

  // 끝점 그리기
  ctx.beginPath();
  ctx.arc(endCoords.x, endCoords.y, 5, 0, Math.PI * 2);
  ctx.fill();

  // 이미지를 파일로 저장
  const out = fs.createWriteStream(outputFilePath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on("finish", () => console.log("PNG 썸네일이 생성되었습니다."));
}

// GPX 파일 경로와 출력 파일 경로 설정
createThumbnail("test.gpx", "output_thumbnail.png");
