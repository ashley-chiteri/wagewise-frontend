import SideNav from "../components/ui/SideNav";
import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";

const taxData = [
  {
    category: "PAYE Rates",
    data: [
      { range: "Up to 24,000", annual: "Up to 288,000", rate: "10.0%" },
      { range: "24,001 - 32,333", annual: "288,001 - 388,000", rate: "25.0%" },
      { range: "32,334 - 500,000", annual: "388,001 - 6,000,000", rate: "30.0%" },
      { range: "500,001 - 800,000", annual: "6,000,001 - 9,600,000", rate: "32.5%" },
      { range: "Above 800,000", annual: "Above 9,600,000", rate: "35.0%" },
    ],
  },
  {
    category: "SHIF Contribution",
    data: [{ range: "All Salaries", annual: "", rate: "2.75% of Gross Salary" }],
  },
  {
    category: "NSSF Contribution",
    data: [
      { range: "Tier I", annual: "Up to 8,000", rate: "6%" },
      { range: "Tier II", annual: "8,001 - 72,000", rate: "6%" },
    ],
  },
  {
    category: "Housing Levy",
    data: [{ range: "All Salaries", annual: "", rate: "1.5% (Employer & Employee)" }],
  },
];

const TaxPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Tax Rates 2025</h1>
        
        {taxData.map((section, index) => (
          <Card key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpanded(expanded === section.category ? null : section.category)}
            >
              <h2 className="text-lg font-semibold text-gray-700">{section.category}</h2>
              <span>{expanded === section.category ? "▲" : "▼"}</span>
            </div>
            {expanded === section.category && (
              <CardContent className="mt-4">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Monthly Pay</th>
                      <th className="border border-gray-300 p-2">Annual Pay</th>
                      <th className="border border-gray-300 p-2">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.data.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-100">
                        <td className="border border-gray-300 p-2">{item.range}</td>
                        <td className="border border-gray-300 p-2">{item.annual || "-"}</td>
                        <td className="border border-gray-300 p-2 font-bold">{item.rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaxPage;
