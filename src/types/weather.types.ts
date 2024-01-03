export interface Weather {
  latitude: number;
  longitude: number;
  time: number;
  timezone: string;
  source: string;
  currently: Currently;
  minutely: Minutely;
  hourly: Hourly;
  daily: Daily;
}

export interface Currently {
  apparentTemperature: number;
  cloudCover: number;
  dewPoint: number;
  humidity: number;
  icon: string;
  pressure: number;
  summary: string;
  time: number;
  temperature: number;
  uvIndex: number;
  visibility: number;
  windBearing: number;
  windGust: number;
  windSpeed: number;
}

export interface Minutely {
  summary: string | null;
  data: MinutelyData[];
}

export interface MinutelyData {
  time: number;
  precipIntensity: number;
  precipProbability: number;
}

export interface Hourly {
  summary: string | null;
  data: HourlyData[];
}

export interface HourlyData {
  apparentTemperature: number;
  cloudCover: number;
  dewPoint: number;
  humidity: number;
  icon: string;
  precipAccumulation: number;
  precipIntensity: number;
  precipProbability: number;
  precipType: string;
  pressure: number;
  summary: string;
  temperature: number;
  time: number;
  uvIndex: number;
  visibility: number;
  windBearing: number;
  windSpeed: number;
}

export interface Daily {
  summary: string | null;
  data: Daily[];
}

export interface DailyData {
  time: number;
  temperatureMax: number;
  temperatureMin: number;
  apparentTemperatureMax: number;
  apparentTemperatureMin: number;
  dewPointMax: number;
  dewPointMin: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  humidityMax: number;
  humidityMin: number;
  icon: string;
  moonPhase: string;
  precipAccumulation: number;
  precipIntensityMax: number;
  precipIntensityMin: number;
  precipProbability: number;
  precipType: string;
  pressureMax: number;
  pressureMin: number;
  summary: string;
  sunriseTime: number;
  sunsetTime: number;
  uvIndexMax: number;
  uvIndexMin: number;
  visibilityMax: number;
  visibilityMin: number;
  windBearingMax: number;
  windBearingMin: number;
  windSpeedMax: number;
  windSpeedMin: number;
}
