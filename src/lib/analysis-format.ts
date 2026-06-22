export function formatDateTime(value: Date | string) {
  const date = typeof value === "string" ? new Date(value) : value;

  return {
    date: new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
}

export function formatBytes(bytes?: number | null) {
  if (!bytes) {
    return "-";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }

  return `${(kilobytes / 1024).toFixed(1)} MB`;
}

export function getAnalysisTone(riskLevel: string, prediction: string) {
  const risk = riskLevel.toLowerCase();
  const label = prediction.toLowerCase();

  if (risk.includes("tinggi") || label.includes("pneumonia")) {
    return "danger";
  }

  if (risk.includes("sedang") || risk.includes("confidence")) {
    return "warning";
  }

  return "success";
}

export function getDisplayPrediction(prediction: string) {
  return prediction.toUpperCase() === "PNEUMONIA"
    ? "Indikasi Pneumonia"
    : "Suara Paru Normal";
}
