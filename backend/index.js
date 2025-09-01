// backend/index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

// --- SDK Initialization ---
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const groq = new Groq({ apiKey: GROQ_API_KEY });
// --- End of SDK Initialization ---

const app = express();
app.use(express.json());
app.use(cors());

/**
 * @route   POST /generate
 * @desc    Generates code from pseudocode.
 */
app.post("/generate", async (req, res) => {
    const { pseudocode, language } = req.body;

    if (!pseudocode || !language) {
        return res.status(400).json({ error: "Pseudocode and language are required." });
    }

    const prompt = `Your task is to convert the following pseudocode into clean, correct, and well-formatted ${language} code.
    Only output the raw code itself, without any explanations, introductions, or markdown formatting like \`\`\`.
    
    Pseudocode: "${pseudocode}"`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant", // ✅ UPDATED MODEL NAME
        });
        
        const generatedCode = chatCompletion.choices[0]?.message?.content || "No code generated.";
        res.json({ code: generatedCode });

    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ error: "Failed to generate code from Groq API." });
    }
});

/**
 * @route   POST /solve
 * @desc    Solves a given problem statement.
 */
app.post("/solve", async (req, res) => {
    const { problemStatement } = req.body;

    if (!problemStatement) {
        return res.status(400).json({ error: "Problem statement is required." });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: problemStatement }],
            model: "llama-3.1-8b-instant", // ✅ UPDATED MODEL NAME
        });

        const solutionText = chatCompletion.choices[0]?.message?.content || "No solution found.";
        res.json({ solution: solutionText });

    } catch (error) {
        console.error("Groq API Error:", error);
        res.status(500).json({ error: "Failed to fetch solution from Groq API." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is now running with Groq API on port ${PORT}`);
});