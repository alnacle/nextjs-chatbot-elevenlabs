'use client'
 
import { useChat } from 'ai/react'

async function fetchStream(text: string) {
    const res = await fetch('api/elevenlabs', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            voice: 'Rachel',
            message: text,
        })
    })
    return res.blob()
}

async function speak(message: string) {
    const stream = await fetchStream(message)
    var blob = new Blob([stream], { type: 'audio/mp3' });
    var url = window.URL.createObjectURL(blob)

    window.audio = new Audio();
    window.audio.src = url;
    window.audio.play();
}

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({ api: '/api/openai'} )

  return (
      <main className="mx-auto w-full h-screen max-w-xl p-9 flex flex-col">
          <section className="mb-auto m w-full">
              { messages.map(m => (
                  <div className="mb-4" key={m.id}>
                      <button className="w-8 h-8 rounded-full text-white bg-green-500"
                          onClick={ async () => { speak(m.content) } }>
                          &#9658;
                      </button>
                  {m.role === 'user' ? ' User: ' : ' AI: '}
                  {m.content}
              </div>
      ))}
  </section>
  <form className="md:flex md:justify-center mb-6" onSubmit={handleSubmit}>
      <input
          className="rounded-md p-2 text-black"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
      />
      <button
          type="submit"
          className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
          Send
      </button>
  </form>
    </main>
  )
}
