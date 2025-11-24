import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const description = formData.get("description");
        const model = formData.get("model");
        const image = formData.get("image");

        if (!process.env.GEMINI_API_KEY) {
            console.error("Error: GEMINI_API_KEY is missing from environment variables.");
            return NextResponse.json(
                { error: "Gemini API Key not configured" },
                { status: 500 }
            );
        }

        const promptText = `You are an expert Security Architect and Threat Modeler.
Create a comprehensive threat model for the following system using the ${model} methodology.

System Description:
${description}

${image ? "Note: An architecture diagram has been provided." : ""}

Return your response as a JSON object with this exact structure:
{
  "dfd": "A Mermaid.js flowchart using basic 'flowchart TD' syntax with TRUST BOUNDARIES and DATA FLOW. Show trust boundaries using subgraph zones. Label arrows with data types. Keep it clean with maximum 15 nodes.",
  "analysis": "A detailed markdown report with:\\n## Scope\\n\\n## Identified Risks\\n\\n## Proposed Mitigations\\n\\n## Validation Steps"
}

CRITICAL: For the DFD, follow these STRICT rules:
1. Use subgraph to show security zones like Internet, DMZ, Internal Network, Database Layer
2. Label ALL arrows with data type like: A -->|User Login Data| B
3. Use simple node shapes: A[Text], B(Text), C{Text}
4. ARROWS MUST BE --> WITH NO SPACES - write it as one word
   - CORRECT: -->
   - WRONG: -- > or - -> 
5. NO SPECIAL CHARACTERS in labels - avoid parentheses, slashes, quotes
   - GOOD: A -->|User Login Data| B
   - BAD: A -->|Login (SAML Init)| B
6. Use plain text with spaces and hyphens only
   - GOOD: "Encrypted User Data", "API Request"
   - BAD: "PII/SSN Data", "Auth (JWT)"
7. Maximum 15 nodes for clarity
8. Example:
   subgraph Internet
     A[User Browser]
   end
   subgraph DMZ
     B[Web Server]
   end
   A -->|HTTPS Request| B

Return ONLY the JSON object, no markdown code blocks.`;

        console.log("Initializing Gemini model...");
        console.log("Sending request to Gemini...");

        let contents;
        if (image) {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64Data = buffer.toString("base64");

            contents = [
                { text: promptText },
                {
                    inlineData: {
                        mimeType: image.type,
                        data: base64Data
                    }
                }
            ];
        } else {
            contents = promptText;
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents
        });

        console.log("Received response from Gemini.");
        const responseText = response.text;

        const cleanedResponse = responseText.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const jsonResponse = JSON.parse(cleanedResponse);

            // Clean up the DFD to fix common syntax issues
            if (jsonResponse.dfd) {
                jsonResponse.dfd = jsonResponse.dfd
                    .replace(/--\s+>/g, '-->') // Fix "-- >" to "-->"
                    .replace(/<\s+--/g, '<--') // Fix "< --" to "<--"
                    .replace(/\s+\|/g, '|')     // Remove spaces before |
                    .replace(/\|\s+/g, '|');    // Remove spaces after |
            }

            return NextResponse.json(jsonResponse);
        } catch (e) {
            console.error("Failed to parse JSON:", responseText);
            return NextResponse.json({
                dfd: "flowchart TD; A[Error] --> B[Could not parse DFD];",
                analysis: responseText
            });
        }

    } catch (error) {
        console.error("Analysis error details:", error);
        return NextResponse.json(
            { error: "Failed to analyze threat model", details: error.message },
            { status: 500 }
        );
    }
}
