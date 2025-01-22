export default function ChasGPT() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex w-full flex-col items-center justify-center">
        <h1>ChasGPT</h1>
        <h1>What can I help with?</h1>
        <input
          type="text"
          placeholder="Message ChasGPT"
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
}
