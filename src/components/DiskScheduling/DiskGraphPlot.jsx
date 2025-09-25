import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
} from "recharts";
const DiskGraphPlot = ({ completedData, data, currentStep }) => {
  return (
    <ResponsiveContainer width="100%" height={420}>
      <LineChart
        data={data}
        margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="cylinder"
          type="number"
          domain={[0, 199]}
          orientation="top"
          label={{
            value: "Cylinder Number",
            position: "insideTop",
            dy: -20, // push label slightly up
          }}
        />

        <YAxis
          dataKey="step"
          type="number"
          domain={[0, 12]}
          allowDecimals={false}
          reversed={true} // flips Y so values grow downward
          label={{
            value: "Step (time)",
            position: "insideLeft",
            angle: -90,
          }}
        />

        <Tooltip />

        <Line
          data={completedData}
          dataKey="step"
          stroke="#1a7db6ff"
          strokeWidth={3}
          dot={{ r: 5, stroke: "#1e293b", strokeWidth: 2, fill: "#fff" }}
          isAnimationActive={false}
        />

        <Scatter
          data={[data[Math.min(currentStep, data?.length - 1)]]}
          shape={(props) => {
            const { cx, cy } = props;
            if (cx === undefined || cy === undefined) return null;
            return (
              <g>
                <circle
                  cx={cx}
                  cy={cy}
                  r={10}
                  fill="#ef4444"
                  stroke="#0f172a"
                  strokeWidth={2}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={14}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth={1}
                  opacity={0.22}
                >
                  <animate
                    attributeName="r"
                    values="12;20;12"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.35;0.05;0.35"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DiskGraphPlot;
