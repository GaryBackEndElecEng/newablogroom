import { ChartConfiguration, ChartConfigurationCustomTypesPerDataset } from 'chart.js/auto'

export type barOptionType=ChartConfiguration<"bar", number[], number|string> | ChartConfigurationCustomTypesPerDataset<"bar", number[], number|string>
export type lineOptionType=ChartConfiguration<"line", number[], number|string> | ChartConfigurationCustomTypesPerDataset<"line", number[], number|string>
