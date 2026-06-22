export const AI_SERVICE_URL =
  process.env.NEXT_PUBLIC_AI_SERVICE_URL ?? "http://127.0.0.1:8000";

export type EnergyBand = {
  band: string;
  range_hz?: string;
  description: string;
  percentage: number;
};

export type PredictionResponse = {
  model: string;
  prediction: string;
  confidence: number;
  risk_level: string;
  recommendation: string;
  spectrogram_url: string;
  gradcam_url: string;
  overlay_waveform_url: string;
  frequency_focus: string;
  energy_bands: EnergyBand[];
  raw_probabilities: Record<string, number>;
  audio?: {
    sample_rate: number;
    processed_sample_rate: number;
    duration_seconds: number;
  };
};

type ErrorResponse = {
  detail?: unknown;
};

function getErrorMessage(body: ErrorResponse) {
  if (typeof body.detail === "string") {
    return body.detail;
  }

  if (body.detail) {
    return JSON.stringify(body.detail);
  }

  return "AI service gagal memproses audio.";
}

export async function predictAudio(
  file: Blob,
  fileName: string,
  modelName: string,
) {
  const formData = new FormData();
  formData.append("file", file, fileName);

  const response = await fetch(
    `${AI_SERVICE_URL}/predict?model_name=${encodeURIComponent(modelName)}`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    let message = `AI service mengembalikan status ${response.status}.`;

    try {
      message = getErrorMessage((await response.json()) as ErrorResponse);
    } catch {
      // Keep the status-based fallback when the response body is not JSON.
    }

    throw new Error(message);
  }

  return (await response.json()) as PredictionResponse;
}
