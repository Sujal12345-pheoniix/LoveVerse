export interface StoryGenerateInput {
  partnerA: string;
  partnerB: string;
  anniversaryDate: string;
  notes: string;
  memoriesList: string[];
}

export interface CaptionGenerateInput {
  partnerA: string;
  partnerB: string;
  imageDescription: string;
}

export interface MusicSuggestInput {
  partnerA: string;
  partnerB: string;
  relationshipVibe: string;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

async function callGemini(prompt: string, fallbackText: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not found. Using local fallback generator.");
    return fallbackText;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error response:", errText);
      return fallbackText;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      return text.trim();
    }
    return fallbackText;
  } catch (error) {
    console.error("Error calling Gemini API, using fallback:", error);
    return fallbackText;
  }
}

// 1. Generate Love Story
export async function generateLoveStory(input: StoryGenerateInput): Promise<string> {
  const prompt = `Write a premium, deeply emotional, cinematic love story about ${input.partnerA} and ${input.partnerB}.
Their anniversary is ${input.anniversaryDate}.
Here are some notes/memories from their relationship:
"${input.notes}"
Moments list:
${input.memoriesList.map(m => `- ${m}`).join("\n")}

Requirements:
- Make it feel poetic, luxurious, and magical.
- Write in first person or third-person romantic perspective (approx 200-300 words).
- End with a beautiful heart-touching quote.
- Do NOT use markdown code blocks, just return plain text paragraphs separated by double newlines.`;

  const fallback = `My dearest ${input.partnerB},

From the very first moment our paths crossed, my world quietly shifted. It wasn't a sudden storm, but a beautiful sunrise that painted every corner of my life with colors I didn't know existed. ${input.partnerA} and ${input.partnerB}—two names that now feel like a single melody.

Since our anniversary on ${input.anniversaryDate}, every single memory has been a treasure locked in my heart. Whether it was ${input.memoriesList[0] || "our first conversation"} or just the simple joy of sharing a laugh, every second with you feels like a lifetime of happiness. 

"${input.notes || "You are my best friend, my biggest support, and my favorite adventure. Thank you for choosing me every single day."}"

You are my home, my peace, and my greatest love story. I love you more than words can ever capture.

"In every lifetime, in every universe, I would still seek you out and choose you."`;

  return callGemini(prompt, fallback);
}

// 2. Generate Photo Captions
export async function generatePoeticCaption(input: CaptionGenerateInput): Promise<string> {
  const prompt = `Write a short, beautiful, poetic, one-sentence caption for a romantic photo card of ${input.partnerA} and ${input.partnerB}.
The photo is described as: "${input.imageDescription}".
Keep it short, emotional, and elegant (max 15 words). Do not include quotation marks in the output.`;

  const fallback = `Holding your hand makes all of life's noise fade into a beautiful symphony, my love.`;

  return callGemini(prompt, fallback);
}

// 3. Suggest Music Mood & Playlists
export async function suggestMusicMood(input: MusicSuggestInput): Promise<{ mood: string; trackName: string; reason: string }> {
  const prompt = `Suggest a specific musical mood and a famous romantic song/instrumental for a relationship site about ${input.partnerA} and ${input.partnerB}.
Their vibe is described as: "${input.relationshipVibe}".
Return only a JSON object matching this structure:
{
  "mood": "Name of mood (e.g. Dreamy Ambient, Lofi Love, Cinematic Strings)",
  "trackName": "Title and Artist",
  "reason": "One short sentence explaining why it fits"
}
Ensure there is no markdown backticks, just raw JSON.`;

  const fallbackJSON = JSON.stringify({
    mood: "Soft Acoustic Romance",
    trackName: "Saawal Romantic Instrumental",
    reason: "A slow, heartwarming acoustic theme that reflects a quiet, eternal devotion."
  });

  const responseText = await callGemini(prompt, fallbackJSON);
  try {
    // Parse response, handle markdown code block formatting if Gemini wraps it
    let cleanJson = responseText;
    if (cleanJson.includes("```")) {
      cleanJson = cleanJson.replace(/```json/g, "").replace(/```/g, "").trim();
    }
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to parse music suggestion JSON:", responseText);
    return {
      mood: "Dreamy Instrumental",
      trackName: "Saawal Instrumental",
      reason: "A soft, acoustic melody capturing the tender warmth of your love story."
    };
  }
}
