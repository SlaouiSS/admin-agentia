
import { Card, CardContent } from "../ui/Card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", clients: 10, faqs: 20 },
    { name: "Feb", clients: 15, faqs: 35 },
    { name: "Mar", clients: 25, faqs: 40 },
    { name: "Apr", clients: 30, faqs: 50 },
];

export default function ActivityChart() {
    return (
        <Card>
            <CardContent>
                <h3 className="text-md font-semibold mb-4">Activité récente</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="clients" stroke="#3b82f6" />
                        <Line type="monotone" dataKey="faqs" stroke="#10b981" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
