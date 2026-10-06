import os
from dotenv import load_dotenv
from google import genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Read mission knowledge
with open("data/mission_data.txt", "r", encoding="utf-8") as file:
    document = file.read()

# Split document into sections
chunks = [
    chunk.strip()
    for chunk in document.split("\n\n")
    if chunk.strip()
]

# Create searchable representations
vectorizer = TfidfVectorizer()
vectors = vectorizer.fit_transform(chunks)


def retrieve_evidence(question, top_k=3):
    question_vector = vectorizer.transform([question])

    scores = cosine_similarity(
        question_vector,
        vectors
    )[0]

    best_indexes = scores.argsort()[-top_k:][::-1]

    results = []

    for i in best_indexes:
        results.append({
            "text": chunks[i],
            "score": round(float(scores[i]), 2)
        })

    return results


question = input("\nAsk P.Y.A.R.E.: ")

# Find relevant mission information
evidence = retrieve_evidence(question)


print("\n========== RETRIEVED EVIDENCE ==========")

for i, item in enumerate(evidence, start=1):
    print(f"\nEvidence {i} | Relevance: {item['score']}")
    print(item["text"])

context = "\n\n".join(item["text"] for item in evidence)

# Give retrieved evidence to the LLM
prompt = f"""
You are P.Y.A.R.E., an AI Mission Operations Copilot.

Answer ONLY using the mission evidence below.

If the evidence is insufficient, say:
"Insufficient evidence."

Do not invent facts, numbers, incidents, causes, or recommendations.

MISSION EVIDENCE:
{context}

USER QUESTION:
{question}

Return the answer in this format:

Conclusion:
Confidence:
Evidence:
Recommended Action:
"""

response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
    contents=prompt
)

print("\n========== P.Y.A.R.E. ==========")
print(response.text)