import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TabelPlaylists from './components/TabelPlaylists';
import TabelSongs from './components/TabelSongs';
import FormularSong from './components/FormularSong';
import FormularPlaylist from './components/FormularPlaylist';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<TabelPlaylists />} />
          <Route path="/formularPlaylist" element={<FormularPlaylist />} />
          <Route path="/formularPlaylist/:idPlaylist" element={<FormularPlaylist />} />

          <Route path="/tabelSongs/:idPlaylist" element={<TabelSongs />} />
          <Route path="/formularSong/:idPlaylist" element={<FormularSong />} />
          <Route path="/formularSong/:idPlaylist/:idSong" element={<FormularSong />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
