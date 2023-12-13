import { AreaChart, Area, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import './index.css';

const pieData = [
    {
      "name": "Group A",
      "value": 3455
    },
    {
      "name": "Group B",
      "value": 200
    },
    {
      "name": "Group C",
      "value": 345
    },
];

const areaData = [
    {
      "year": "2016",
      "metric1": 4000,
      "metric2": 2400
    },
    {
      "year": "2017",
      "metric1": 3000,
      "metric2": 1398
    },
    {
      "year": "2018",
      "metric1": 2000,
      "metric2": 9800
    },
    {
      "year": "2019",
      "metric1": 2780,
      "metric2": 3908
    },
    {
      "year": "2020",
      "metric1": 1890,
      "metric2": 4800
    },
    {
      "year": "2021",
      "metric1": 2390,
      "metric2": 3800
    },
    {
      "year": "2022",
      "metric1": 3490,
      "metric2": 4300
    }
];

export function ChartsDemo() {
  return (
    <div className="charts-container">
      <div className="demo-chart">
        <ResponsiveContainer>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="colorArea1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF7A00" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorArea2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7638FA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7638FA" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B900B4" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F50000" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorPie0" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D300C5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#7638FA" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorPie1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF0169" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorPie2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFD600" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FF7A00" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="metric1" stroke="#FF7A00" fill="url(#colorArea1)" />
            <Area type="monotone" dataKey="metric2" stroke="#7638FA" fill="url(#colorArea2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="demo-chart">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#colorPie${index})`}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="demo-chart">
        <ResponsiveContainer>
          <BarChart data={areaData}>
            <Bar dataKey="metric1" fill="url(#colorBar)" radius={20} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}