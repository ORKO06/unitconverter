import UnitConverter from "../components/unit-converter";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-slate-100">
          Unit Converter
        </h1>
        <UnitConverter />
      </div>
    </main>
  );
}
