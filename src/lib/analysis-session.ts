import type { PredictionResponse } from "@/lib/ai-service";

export const PENDING_ANALYSIS_KEY = "paruscan:pending-analysis";
export const LAST_ANALYSIS_RESULT_KEY = "paruscan:last-analysis-result";

export type PendingAnalysis = {
  patientName: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileDataUrl: string;
  modelName: "vgg16" | "vgg19";
  createdAt: string;
};

export type StoredAnalysisResult = {
  analysisId?: string;
  patientName: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  result: PredictionResponse;
};
