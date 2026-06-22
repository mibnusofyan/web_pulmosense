import { NextResponse } from "next/server";
import { z } from "zod";

import { hasSameOrigin } from "@/lib/auth/request";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const energyBandSchema = z.object({
  band: z.string().min(1),
  range_hz: z.string().optional(),
  description: z.string().optional(),
  percentage: z.coerce.number(),
});

const predictionResultSchema = z.object({
  prediction: z.string().min(1),
  confidence: z.coerce.number(),
  risk_level: z.string().min(1),
  recommendation: z.string().optional(),
  spectrogram_url: z.string().optional(),
  gradcam_url: z.string().optional(),
  overlay_waveform_url: z.string().optional(),
  frequency_focus: z.string().optional(),
  energy_bands: z.array(energyBandSchema).default([]),
  audio: z
    .object({
      sample_rate: z.coerce.number().int().optional(),
      processed_sample_rate: z.coerce.number().int().optional(),
      duration_seconds: z.coerce.number().optional(),
    })
    .optional(),
});

const createAnalysisSchema = z.object({
  patientName: z.string().trim().optional(),
  fileName: z.string().min(1),
  fileSize: z.coerce.number().int().nonnegative(),
  result: predictionResultSchema,
});

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ detail: "Origin request tidak valid." }, { status: 403 });
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json({ detail: "Session tidak valid." }, { status: 401 });
  }

  try {
    const payload = createAnalysisSchema.parse(await request.json());
    const { result } = payload;

    const analysis = await prisma.analysis.create({
      data: {
        userId: currentUser.id,
        patientName: payload.patientName || null,
        audioFileName: payload.fileName,
        fileSize: payload.fileSize,
        duration: result.audio?.duration_seconds ?? null,
        sampleRate: result.audio?.sample_rate ?? null,
        prediction: result.prediction,
        confidence: result.confidence,
        riskLevel: result.risk_level,
        recommendation: result.recommendation ?? null,
        spectrogramUrl: result.spectrogram_url ?? null,
        gradcamUrl: result.gradcam_url ?? null,
        overlayWaveformUrl: result.overlay_waveform_url ?? null,
        frequencyFocus: result.frequency_focus ?? null,
        frequencyBands: {
          create: result.energy_bands.map((band) => ({
            bandName: band.band,
            rangeHz: band.range_hz ?? "",
            description: band.description ?? null,
            percentage: band.percentage,
          })),
        },
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      analysis: {
        id: analysis.id,
        createdAt: analysis.createdAt.toISOString(),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          detail: error.issues,
        },
        { status: 400 },
      );
    }

    console.error("Failed to save analysis", error);
    return NextResponse.json(
      {
        detail: "Hasil analisis gagal disimpan ke database.",
      },
      { status: 500 },
    );
  }
}
