import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const MonthlyExpenditureChart = () => {
  const [data, setData] = useState<{ month: string; totalSpent: number }[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/payments/monthly-expenditure") // Adjust URL if needed
      .then((response) => response.json())
      .then((json) => {
        console.log("API Response:", json); // ✅ Debugging Log

         // ✅ Ensure json.monthlyExpenditure is an array before mapping
         if (!json || !Array.isArray(json.monthlyExpenditure)) {
          console.error("Unexpected API response format:", json);
          return;
        }

        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const formattedData = json.monthlyExpenditure.map((item: { month: string; totalSpent: number }) => ({
          month: months[parseInt(item.month, 10) - 1], // Convert "03" -> Mar
          totalSpent: item.totalSpent || 0
        }));

        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-[#99A3B3] text-lg mb-4">Monthly Expenditure</h2>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalSpent" fill="#7F5EFD" barSize={20}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenditureChart;
