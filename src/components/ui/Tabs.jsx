import { useState } from "react";

export default function Tabs({ tabs }) {
    const [active, setActive] = useState(tabs[0].label);

    return (
        <div>
            <div className="flex gap-2 border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        className={\`px-4 py-2 font-medium border-b-2 \${active === tab.label ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-blue-600"}\`}
                        onClick={() => setActive(tab.label)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>
                {tabs.find((tab) => tab.label === active)?.content}
            </div>
        </div>
    );
}