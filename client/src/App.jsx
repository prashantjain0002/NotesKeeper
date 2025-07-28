import React from "react";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col gap-10 items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">
          Note App Setup Complete ✅
        </h1>

        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
