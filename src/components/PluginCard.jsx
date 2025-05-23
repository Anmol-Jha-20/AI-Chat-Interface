import {
  CalculatorIcon,
  CloudRainIcon,
  SunIcon,
  AlertTriangleIcon,
} from "lucide-react";

export default function PluginCard({ pluginName, pluginData }) {
  if (pluginName === "calc") {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm max-w-sm">
        <div className="text-sm text-gray-600 font-semibold uppercase mb-1">
          <CalculatorIcon size={18} />
          Calculator Result
        </div>
        <div className="text-lg font-mono text-gray-800">
          {pluginData.output}
        </div>
      </div>
    );
  }

  if (pluginName === "weather") {
    if (pluginData.error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-md max-w-sm">
          <div className="flex items-center gap-2 text-red-700 mb-2">
            <AlertTriangleIcon size={18} />
            <span className="font-semibold text-sm">Weather Error</span>
          </div>
          <p className="text-sm">{pluginData.error}</p>
        </div>
      );
    }

    const iconUrl = pluginData.icon
      ? `https://openweathermap.org/img/wn/${pluginData.icon}@2x.png`
      : "https://openweathermap.org/img/wn/01d@2x.png"; // fallback icon

    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg shadow-md max-w-sm">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <CloudRainIcon size={18} />
          <span className="font-semibold uppercase text-sm">Weather</span>
        </div>
        <div className="flex items-center gap-4">
          <img src={iconUrl} alt="weather icon" className="w-12 h-12" />
          <div>
            <div className="text-lg font-bold">{pluginData.city}</div>
            <div className="text-sm text-gray-700">
              {pluginData.temp}°C, {pluginData.condition}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pluginName === "define") {
    if (pluginData?.error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg shadow-md max-w-sm">
          <div className="flex items-center gap-2 text-red-700 mb-2">
            <AlertTriangleIcon size={18} />
            <span className="font-semibold text-sm">Definition Error</span>
          </div>
          <p className="text-sm">{pluginData.error}</p>
        </div>
      );
    }

    const word = pluginData?.word ?? "unknown";
    const partOfSpeech = pluginData?.partOfSpeech ?? "n/a";
    const definition = pluginData?.definition ?? "No definition available.";

    return (
      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-md max-w-sm">
        <div className="text-green-700 font-semibold mb-1">
          Definition of <strong>{word}</strong> ({partOfSpeech})
        </div>
        <div className="text-gray-700 text-sm">{definition}</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded">{JSON.stringify(pluginData)}</div>
  );
}
