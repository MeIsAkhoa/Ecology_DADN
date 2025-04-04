export interface SensorData {
  id: string;
  timestamp: string;
  numericValue: number;
}

export interface SensorResponse {
  code: number;
  result: SensorData[];
} 