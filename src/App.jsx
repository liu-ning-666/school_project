import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScaledDesignSurface from './components/ScaledDesignSurface'
import Display from './pages/Display'
import ActivityList from './pages/ActivityList'
import AvatarSelect from './pages/AvatarSelect'
import Capture from './pages/Capture'
import CampusCultureEvent from './pages/CampusCultureEvent'
import MusicInteraction from './pages/MusicInteraction'
import ResourceDetail from './pages/ResourceDetail'
import SceneSelect from './pages/SceneSelect'
import Settings from './pages/Settings'
import SongSelect from './pages/SongSelect'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Display />} />
        <Route
          path="/activity-list"
          element={
            <ScaledDesignSurface>
              <ActivityList />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/avatar-select"
          element={
            <ScaledDesignSurface>
              <AvatarSelect />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/capture"
          element={
            <ScaledDesignSurface>
              <Capture />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/campus-culture-event"
          element={
            <ScaledDesignSurface>
              <CampusCultureEvent />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/music-interaction"
          element={
            <ScaledDesignSurface>
              <MusicInteraction />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/song-select"
          element={
            <ScaledDesignSurface>
              <SongSelect />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/resource-detail"
          element={
            <ScaledDesignSurface>
              <ResourceDetail />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/scene-select"
          element={
            <ScaledDesignSurface>
              <SceneSelect />
            </ScaledDesignSurface>
          }
        />
        <Route
          path="/settings"
          element={
            <ScaledDesignSurface>
              <Settings />
            </ScaledDesignSurface>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
