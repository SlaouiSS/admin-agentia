
import { Users, HelpCircle, UserPlus, Edit3 } from "lucide-react";
import { Card, CardContent } from "../ui/Card";

const icons = {
    users: Users,
    "help-circle": HelpCircle,
    "user-plus": UserPlus,
    "edit-3": Edit3,
};

export default function StatCard({ title, value, icon }) {
    const Icon = icons[icon] || HelpCircle;

    return (
        <Card>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-500">{title}</p>
                        <p className="text-xl font-semibold">{value}</p>
                    </div>
                    <Icon size={28} className="text-blue-500" />
                </div>
            </CardContent>
        </Card>
    );
}
