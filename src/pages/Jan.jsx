import Sidebar from "@/components/Jan-Sidebar";

export default function ChasGPT() {
  return (
    <div className="flex min-h-[90vh] flex-col">
      <div className="navbar">
        <Sidebar />
        <button className="btn btn-ghost">ChasGPT</button>
      </div>
      <div className="mx-auto flex w-full max-w-3xl flex-grow flex-col items-center justify-center">
        <h1 className="mb-8 text-3xl font-bold">What can I help with?</h1>
        <input
          type="text"
          placeholder="Message ChasGPT"
          className="input input-lg input-bordered size w-full"
        />
      </div>
    </div>
  );
}
