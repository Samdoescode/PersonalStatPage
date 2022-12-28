import ChessLayout from "~/components/ChessPage/ChessLayout";



export default function Home() {
  return (
    <main class="text-center relative mx-auto text-gray-700">
      
        <div class="relative grid grid-cols-9 max-h-screen grid-rows-6 p-12 h-full bg-green-300" id="mainchart">
          <nav class="w-full bg-slate-500 rounded-xl row-span-6"></nav>
          <menu class="w-full h-full bg-rose-300 col-span-8 row-span-1"></menu>
          <ChessLayout />
        </div>

    </main>
  );
}
