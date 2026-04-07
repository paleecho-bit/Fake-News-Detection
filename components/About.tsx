"use client"

export default function About() {
  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-cyan-400">
        📰 Fake News Detection System
      </h2>

      {/* PROJECT OVERVIEW */}
      <div className="bg-[#1a2438] p-4 rounded-xl">
        <h3 className="font-semibold mb-2">📌 overview</h3>
        <p className="text-sm text-gray-300">
          This project is a Fake News Detection System that uses Machine Learning
          and Natural Language Processing (NLP) techniques to classify news as
          Real or Fake. The system analyzes the given text and predicts its authenticity
          along with a confidence score.
        </p>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-[#1a2438] p-4 rounded-xl">
        <h3 className="font-semibold mb-2">🧠 How It Works</h3>
        <ul className="text-sm text-gray-300 list-disc ml-5 space-y-1">
          <li>Text is cleaned and preprocessed</li>
          <li>Converted into numerical form using TF-IDF Vectorizer</li>
          <li>Machine Learning model analyzes the pattern</li>
          <li>Predicts whether news is Fake or Real</li>
          <li>Displays confidence score</li>
        </ul>
      </div>

      {/* FEATURES */}
      <div className="bg-[#1a2438] p-4 rounded-xl">
        <h3 className="font-semibold mb-2">⚙️ Features</h3>
        <ul className="text-sm text-gray-300 list-disc ml-5 space-y-1">
          <li>Real-time Fake News Detection</li>
          <li>Confidence Score Visualization</li>
          <li>Upload Files (PDF, DOCX, Images)</li>
          <li>OCR Text Extraction from Images</li>
          <li>Example News Testing</li>
          <li>History Tracking</li>
          <li>Modern UI Dashboard</li>
        </ul>
      </div>

      {/* TECHNOLOGIES */}
      <div className="bg-[#1a2438] p-4 rounded-xl">
        <h3 className="font-semibold mb-2">🛠️ Technologies Used</h3>
        <ul className="text-sm text-gray-300 list-disc ml-5 space-y-1">
          <li>Frontend: Next.js, React, Tailwind CSS</li>
          <li>Backend: Flask (Python)</li>
          <li>Machine Learning: Scikit-learn</li>
          <li>NLP: TF-IDF Vectorization</li>
          <li>OCR: Tesseract</li>
        </ul>
      </div>

      {/* YOUR CONTRIBUTION */}
      <div className="bg-[#1a2438] p-4 rounded-xl">
        <h3 className="font-semibold mb-2">👨‍💻 Developer</h3>
        <p className="text-sm text-gray-300">
          This project is developed as part of a final year BCA project.
          It demonstrates implementation of Machine Learning
          in real-world applications like misinformation detection.
        </p>
      </div>

    </div>
  )
}