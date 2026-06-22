import type { PredictionResponse } from "@/lib/ai-service";

export type SavedAnalysis = {
  id: string;
  createdAt: string;
};

export type SaveAnalysisInput = {
  patientName?: string;
  fileName: string;
  fileSize: number;
  result: PredictionResponse;
};

type SaveAnalysisResponse = {
  analysis: SavedAnalysis;
};

type ErrorResponse = {
  detail?: unknown;
  error?: unknown;
};

function getErrorMessage(body: ErrorResponse) {
  if (typeof body.detail === "string") {
    return body.detail;
  }

  if (typeof body.error === "string") {
    return body.error;
  }

  return "Hasil analisis gagal disimpan ke database.";
}

export async function saveAnalysis(input: SaveAnalysisInput) {
  const response = await fetch("/api/analyses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    let message = `Database API mengembalikan status ${response.status}.`;

    try {
      message = getErrorMessage((await response.json()) as ErrorResponse);
    } catch {
      // Keep status fallback when body is not JSON.
    }

    throw new Error(message);
  }

  const body = (await response.json()) as SaveAnalysisResponse;
  return body.analysis;
}
