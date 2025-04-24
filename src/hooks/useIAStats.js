import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function useIAStats() {
    const [loading, setLoading] = useState(true);
    const [intentStats, setIntentStats] = useState({});
    const [sentimentStats, setSentimentStats] = useState({});
    const [misunderstood, setMisunderstood] = useState([]);
    const [fallbacks, setFallbacks] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    intentRes,
                    sentimentRes,
                    misunderstoodRes,
                    fallbackRes,
                ] = await Promise.all([
                    axiosInstance.get("/ai-responses/intent-stats"),
                    axiosInstance.get("/ai-responses/sentiment-stats"),
                    axiosInstance.get("/ai-responses/misunderstood"),
                    axiosInstance.get("/ai-responses/fallbacks"),
                ]);

                setIntentStats(intentRes.data || {});
                setSentimentStats(sentimentRes.data || {});
                setMisunderstood(misunderstoodRes.data || []);
                setFallbacks(fallbackRes.data || []);
            } catch (err) {
                console.error("Erreur chargement stats IA:", err);
                setIntentStats({});
                setSentimentStats({});
                setMisunderstood([]);
                setFallbacks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return {
        loading,
        intentStats,
        sentimentStats,
        misunderstood,
        fallbacks,
    };
}
