import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Admin from './admin/Admin'
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
import Tournament from './pages/Tournament'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<Admin />} />
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="documents" element={<Documents />} />
          <Route path="about/documents" element={<Navigate to="/documents" replace />} />
          <Route path="competitions" element={<Competitions />} />
          <Route path="competitions/rules" element={<CompetitionRules />} />
          <Route path="competitions/results" element={<CompetitionResults />} />
          <Route path="competitions/:id" element={<Tournament />} />
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
