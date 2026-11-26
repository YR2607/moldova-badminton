import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Clubs from './pages/Clubs'
import CompetitionResults from './pages/CompetitionResults'
import CompetitionRules from './pages/CompetitionRules'
import Competitions from './pages/Competitions'
import Contact from './pages/Contact'
import Documents from './pages/Documents'
import Home from './pages/Home'
import News from './pages/News'
import NewsArticle from './pages/NewsArticle'
import Team from './pages/Team'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="about/documents" element={<Documents />} />
          <Route path="competitions" element={<Competitions />} />
          <Route path="competitions/rules" element={<CompetitionRules />} />
          <Route path="competitions/results" element={<CompetitionResults />} />
          <Route path="news" element={<News />} />
          <Route path="news/:slug" element={<NewsArticle />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="team" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
