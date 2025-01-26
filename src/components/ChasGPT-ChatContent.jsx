export default function ChatContent({ history, isThinking }) {
  function processText(text) {
    const parts = text.split(/(\*\*.+?\*\*)/);
    return parts.map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
    );
  }
  return (
    <div className="flex max-h-full flex-col gap-4 md:pb-4">
      {history.map((entry, index) => (
        <div key={index} className={`chat gap-1 ${entry.role === "user" ? "chat-end" : "chat-start"}`}>
          {entry.role === "model" && (
            <div className="avatar chat-image self-start p-1">
              <div className="w-8 rounded-full">
                <img src="/chas-logo-small.png" alt="Chas Logo" />
              </div>
            </div>
          )}
          <div
            className={`${entry.role === "user" ? "chat-bubble chat-bubble-primary" : ""} whitespace-pre-wrap px-4 py-2`}
          >
            {entry.parts.map((part) => processText(part.text))}
          </div>
        </div>
      ))}
      {isThinking && <div className="loading loading-spinner loading-lg mx-auto"></div>}
    </div>
  );
}
