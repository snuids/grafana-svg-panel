type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  svg: string;
  viewbox: string;
  lowcolor: string;
  middlecolor: string;
  highcolor: string;
  thresholdlow: number;
  thresholdhigh: number;
  description: string;
  showSeriesValue: boolean;
  seriesCountSize: SeriesSize;
  valuecolor: string;
  units: string;
}
