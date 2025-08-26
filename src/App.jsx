import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [channels, setChannels] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://SUA-API.com/canais") // 👉 coloque sua API IPTV aqui
      .then(res => res.json())
      .then(data => setChannels(data))
      .catch(err => console.error("Erro ao carregar canais:", err));
  }, []);

  const filtered = channels.filter(ch =>
    ch.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="p-4 bg-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-bold">📺 Meu IPTV</h1>
          <input
            type="text"
            placeholder="Buscar canal..."
            className="px-2 py-1 rounded text-black"
            onChange={e => setSearch(e.target.value)}
          />
        </header>

        <main className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map(ch => (
            <Link
              key={ch.id}
              to={`/canal/${ch.id}`}
              className="bg-gray-700 p-3 rounded-xl hover:bg-gray-600"
            >
              <img src={ch.logo} alt={ch.name} className="w-full rounded" />
              <p className="mt-2 text-center">{ch.name}</p>
            </Link>
          ))}
        </main>

        <Routes>
          <Route
            path="/canal/:id"
            element={<Canal channels={channels} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function Canal({ channels }) {
  const id = window.location.pathname.split("/").pop();
  const canal = channels.find(c => c.id.toString() === id);

  if (!canal) return <p className="p-4">Canal não encontrado</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">{canal.name}</h2>
      <video
        src={canal.url}
        controls
        autoPlay
        className="w-full rounded-lg shadow-lg"
      />
    </div>
  );
}

export default App;
