import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import DateRangeSelector from './DateRangeSelector';

interface MapChartProps {
  visitorData: {
    [country: string]: number;
  };
  className?: string;
  dateRange: {
    from: Date;
    to: Date;
  };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  // For compare mode
  getVisitorDataForRange?: (range: { from: Date; to: Date }) => { [country: string]: number };
}

// Helper to interpolate between two colors
function interpolateColor(color1: string, color2: string, factor: number) {
  const c1 = color1.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0,0,0];
  const c2 = color2.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0,0,0];
  const result = c1.map((v, i) => Math.round(v + factor * (c2[i] - v)));
  return `#${result.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

const BASE_COLOR = '#B0E0E6'; // Light blue
const MAX_COLOR = '#4169E1'; // Royal blue

const MapChart: React.FC<MapChartProps> = ({ 
  visitorData, 
  className,
  dateRange,
  onDateRangeChange,
  getVisitorDataForRange
}) => {
  const [compareMode, setCompareMode] = useState(false);
  const [compareRange, setCompareRange] = useState<{ from: Date; to: Date } | null>(null);

  // Helper to prepare data for Treemap
  const prepareData = (dataObj: { [country: string]: number }) => {
    const totalVisits = Object.values(dataObj).reduce((a, b) => a + b, 0);
    const maxVisits = Math.max(...Object.values(dataObj), 1);
    return Object.entries(dataObj)
      .map(([name, value]) => ({
        name,
        value,
        percentage: ((value / totalVisits) * 100).toFixed(1),
        fill: interpolateColor(BASE_COLOR, MAX_COLOR, value / maxVisits)
      }))
      .sort((a, b) => b.value - a.value);
  };

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{data.value} visits ({data.percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  // Custom content renderer for Treemap to apply color gradients
  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, value, fill } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: fill,
            stroke: '#fff',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        {width > 60 && height > 30 && (
          <text x={x + width / 2} y={y + height / 2} textAnchor="middle" fill="#222" fontSize={14} fontWeight={500} pointerEvents="none">
            {name}
          </text>
        )}
        {width > 60 && height > 50 && (
          <text x={x + width / 2} y={y + height / 2 + 18} textAnchor="middle" fill="#444" fontSize={12} pointerEvents="none">
            {value} visits
          </text>
        )}
      </g>
    );
  };

  // Data for main and compare periods
  const mainData = prepareData(visitorData);
  const compareData = compareMode && compareRange && getVisitorDataForRange ? prepareData(getVisitorDataForRange(compareRange)) : null;

  // Summary
  const totalVisits = Object.values(visitorData).reduce((a, b) => a + b, 0);
  const totalCountries = Object.keys(visitorData).length;
  const compareTotalVisits = compareData ? compareData.reduce((a, b) => a + b.value, 0) : 0;
  const compareTotalCountries = compareData ? compareData.length : 0;

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <CardTitle className="text-sm text-muted-foreground">Visitor Distribution by Country</CardTitle>
            <button
              className={`px-3 py-1 rounded text-xs font-semibold border ${compareMode ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-700'}`}
              onClick={() => setCompareMode((v) => !v)}
            >
              {compareMode ? 'Compare: ON' : 'Compare: OFF'}
            </button>
          </div>
          <DateRangeSelector 
            dateRange={dateRange}
            onDateRangeChange={onDateRangeChange}
          />
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-medium">{totalVisits}</span> total visits
            </div>
            <div>
              <span className="font-medium">{totalCountries}</span> countries
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!compareMode && (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={mainData}
                dataKey="value"
                stroke="#fff"
                aspectRatio={4/3}
                animationDuration={450}
                content={<CustomizedContent />}
              >
                <Tooltip content={<CustomTooltip />} />
              </Treemap>
            </ResponsiveContainer>
          </div>
        )}
        {compareMode && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-2 font-semibold text-xs text-muted-foreground">Period A</div>
              <DateRangeSelector
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
              />
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={mainData}
                    dataKey="value"
                    stroke="#fff"
                    aspectRatio={4/3}
                    animationDuration={450}
                    content={<CustomizedContent />}
                  >
                    <Tooltip content={<CustomTooltip />} />
                  </Treemap>
                </ResponsiveContainer>
              </div>
              <div className="text-xs mt-2">Visits: {totalVisits} | Countries: {totalCountries}</div>
            </div>
            <div className="flex-1">
              <div className="mb-2 font-semibold text-xs text-muted-foreground">Period B</div>
              <DateRangeSelector
                dateRange={compareRange || dateRange}
                onDateRangeChange={setCompareRange}
              />
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    data={compareData || []}
                    dataKey="value"
                    stroke="#fff"
                    aspectRatio={4/3}
                    animationDuration={450}
                    content={<CustomizedContent />}
                  >
                    <Tooltip content={<CustomTooltip />} />
                  </Treemap>
                </ResponsiveContainer>
              </div>
              <div className="text-xs mt-2">Visits: {compareTotalVisits} | Countries: {compareTotalCountries}</div>
            </div>
          </div>
        )}
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">Top Countries</h4>
          <div className="space-y-1">
            {mainData.slice(0, 5).map((item) => (
              <div key={item.name} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-medium">{item.value} visits ({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapChart; 