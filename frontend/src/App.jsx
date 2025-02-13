import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {

  const [code, setCode] = useState(` function add(a, b) {
    return a + b
    }`)

  const [review, setReview] = useState(``)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setLoading(true)
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data?.response || 'No review available')
    console.log(response.data)
    setLoading(false)
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                overflow: "auto"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review-btn">Review</div>
        </div>
        <div className="right">
          {loading ? (
            <div className="center-loader">
              <div className="spinner"></div>
              <p>Loading review...</p>
            </div>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>

      </main>
    </>
  )
}



export default App
