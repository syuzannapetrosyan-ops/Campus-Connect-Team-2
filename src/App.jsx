import { useMemo, useState } from 'react'
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleUserRound,
  Clock3,
  FileCheck2,
  Filter,
  Gauge,
  GraduationCap,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  MapPin,
  Menu,
  MessageSquareText,
  Search,
  Send,
  ServerCog,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react'
import {
  advisors,
  auditEvents,
  demoUsers,
  engagementSeries,
  initialCourses,
  initialEvents,
  policyDocs,
} from './data'

const navItems = [
  { id: 'home', label: 'Home', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'appointments', label: 'Appointments', icon: CalendarCheck },
  { id: 'assistant', label: 'Policy AI', icon: Bot },
  { id: 'observability', label: 'Observability', icon: Gauge, restricted: true },
  { id: 'security', label: 'Security & FERPA', icon: ShieldCheck },
]

const pageDetails = {
  home: ['Student dashboard', 'Everything you need, in one place.'],
  courses: ['Course selection', 'Plan your term and manage waitlists.'],
  events: ['Event directory', 'Find your people and your next opportunity.'],
  appointments: ['Appointment scheduler', 'Book the right campus expert in minutes.'],
  assistant: ['RAG Policy AI Assistant', 'Grounded answers from approved BTU policy.'],
  observability: ['Observability dashboard', 'Service health, adoption, delivery, and risk.'],
  security: ['Security & FERPA', 'Privacy by design, access by role.'],
}

function readStore(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

function writeStore(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function Logo({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <div className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      {!compact && (
        <div>
          <strong>CampusConnect</strong>
          <small>Bluesky Technology University</small>
        </div>
      )}
    </div>
  )
}

function LoginScreen({ onLogin }) {
  const [role, setRole] = useState('Student')
  const [showPassword, setShowPassword] = useState(false)
  const profile = demoUsers[role]

  return (
    <main className="login-shell">
      <section className="login-story">
        <Logo />
        <div className="story-copy">
          <div className="eyebrow light"><Sparkles size={15} /> STUDENT SERVICES, SIMPLIFIED</div>
          <h1>One campus.<br />One connected experience.</h1>
          <p>
            Courses, events, appointments, and trusted policy answers—designed around the student journey.
          </p>
          <div className="story-proof">
            <div><strong>7</strong><span>connected services</span></div>
            <div><strong>24/7</strong><span>policy guidance</span></div>
            <div><strong>FERPA</strong><span>privacy by design</span></div>
          </div>
        </div>
        <div className="story-orbit orbit-one"><BookOpen size={21} /></div>
        <div className="story-orbit orbit-two"><CalendarCheck size={20} /></div>
        <div className="story-orbit orbit-three"><Bot size={20} /></div>
        <p className="login-footnote">Team 2 · Rockstars · MVP 1.0</p>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="mobile-logo"><Logo /></div>
          <div className="eyebrow">WELCOME TO BTU</div>
          <h2>Sign in to CampusConnect</h2>
          <p className="muted">Choose a demo role to experience role-based access.</p>

          <div className="role-tabs" aria-label="Demo role selection">
            {Object.keys(demoUsers).map((item) => (
              <button
                className={role === item ? 'active' : ''}
                key={item}
                onClick={() => setRole(item)}
                type="button"
              >
                {item === 'Administrator' ? 'Admin' : item}
              </button>
            ))}
          </div>

          <label className="field-label" htmlFor="email">University account</label>
          <div className="input-wrap">
            <CircleUserRound size={19} />
            <input id="email" value={profile.account} readOnly />
          </div>

          <div className="password-row">
            <label className="field-label" htmlFor="password">Password</label>
            <button type="button">Forgot password?</button>
          </div>
          <div className="input-wrap">
            <LockKeyhole size={18} />
            <input id="password" type={showPassword ? 'text' : 'password'} value="campus2026" readOnly />
            <button className="show-password" type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button className="primary-button login-button" type="button" onClick={() => onLogin(role)}>
            Sign in as {role === 'Administrator' ? 'Administrator' : role}
            <ArrowRight size={18} />
          </button>

          <div className="sso-divider"><span>or continue with</span></div>
          <button className="sso-button" type="button" onClick={() => onLogin(role)}>
            <span className="btu-seal">B</span>
            BTU Single Sign-On
          </button>
          <p className="demo-note"><ShieldCheck size={15} /> Demo data only—no real student records are used.</p>
        </div>
      </section>
    </main>
  )
}

function Sidebar({ page, setPage, user, role, open, setOpen, onLogout }) {
  return (
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top">
        <Logo />
        <button className="mobile-close icon-button" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={21} />
        </button>
      </div>
      <nav className="nav-list" aria-label="Primary navigation">
        <span className="nav-heading">CAMPUS HUB</span>
        {navItems.map(({ id, label, icon: Icon, restricted }) => (
          <button
            key={id}
            className={page === id ? 'active' : ''}
            onClick={() => {
              setPage(id)
              setOpen(false)
            }}
          >
            <Icon size={19} strokeWidth={1.9} />
            <span>{label}</span>
            {restricted && role !== 'Administrator' && <LockKeyhole className="nav-lock" size={14} />}
          </button>
        ))}
      </nav>

      <div className="sidebar-help">
        <div className="help-icon"><HelpCircle size={19} /></div>
        <strong>Need a human?</strong>
        <p>Student Success is online.</p>
        <button onClick={() => setPage('appointments')}>Get support <ChevronRight size={14} /></button>
      </div>

      <div className="sidebar-user">
        <div className="avatar">{user.initials}</div>
        <div>
          <strong>{user.name}</strong>
          <span>{role}</span>
        </div>
        <button onClick={onLogout} aria-label="Sign out" title="Sign out"><LogOut size={17} /></button>
      </div>
    </aside>
  )
}

function Header({ page, user, role, setMobileOpen }) {
  const [title, subtitle] = pageDetails[page]
  return (
    <header className="topbar">
      <button className="menu-button icon-button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
        <Menu size={22} />
      </button>
      <div className="page-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <div className="role-chip"><UserCheck size={15} /> {role} access</div>
        <button className="notification-button" aria-label="Notifications">
          <Bell size={19} />
          <span />
        </button>
        <div className="top-user">
          <div className="avatar small">{user.initials}</div>
          <div><strong>{user.name}</strong><span>{user.subtitle}</span></div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  )
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  )
}

function StatusBadge({ children, tone = 'neutral' }) {
  return <span className={`status-badge ${tone}`}><span />{children}</span>
}

function Dashboard({ user, courses, events, rsvps, setPage }) {
  const enrolled = courses.filter((course) => course.status === 'enrolled')
  const nextEvent = events.find((event) => rsvps.includes(event.id)) || events[0]
  return (
    <div className="page-grid dashboard-page">
      <section className="welcome-banner">
        <div>
          <div className="eyebrow light"><Sparkles size={15} /> MONDAY, AUGUST 12</div>
          <h2>Good evening, {user.name.split(' ')[0]}.</h2>
          <p>You’re all set for the week. Here’s what’s moving across your campus.</p>
        </div>
        <div className="progress-ring" aria-label="Profile 86 percent complete">
          <div><strong>86%</strong><span>profile ready</span></div>
        </div>
      </section>

      <section className="stats-grid">
        <button className="stat-card" onClick={() => setPage('courses')}>
          <div className="stat-icon violet"><BookOpen size={21} /></div>
          <div><span>Current courses</span><strong>{enrolled.length || 1}</strong><small>3 credits in progress</small></div>
          <ChevronRight size={18} />
        </button>
        <button className="stat-card" onClick={() => setPage('appointments')}>
          <div className="stat-icon blue"><CalendarCheck size={21} /></div>
          <div><span>Next appointment</span><strong className="stat-text">Tomorrow</strong><small>10:30 AM · Career Services</small></div>
          <ChevronRight size={18} />
        </button>
        <button className="stat-card" onClick={() => setPage('events')}>
          <div className="stat-icon orange"><TicketCheck size={21} /></div>
          <div><span>Upcoming events</span><strong>{Math.max(rsvps.length, 1)}</strong><small>{nextEvent.title}</small></div>
          <ChevronRight size={18} />
        </button>
      </section>

      <section className="panel schedule-panel">
        <SectionHeading
          eyebrow="TODAY"
          title="Your day at a glance"
          action={<button className="text-button" onClick={() => setPage('courses')}>Full schedule <ArrowRight size={15} /></button>}
        />
        <div className="timeline">
          <div className="timeline-item current">
            <div className="timeline-time"><strong>6:00</strong><span>PM</span></div>
            <div className="timeline-line"><i /></div>
            <div className="timeline-card">
              <div><StatusBadge tone="live">Starts soon</StatusBadge><h3>MB668 · Project Management with AI</h3></div>
              <span><MapPin size={15} /> Innovation Hall 302</span>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-time"><strong>8:45</strong><span>PM</span></div>
            <div className="timeline-line"><i /></div>
            <div className="timeline-card muted-card">
              <div><StatusBadge>Personal</StatusBadge><h3>Team 2 MVP review</h3></div>
              <span><Users size={15} /> Online · Project workspace</span>
            </div>
          </div>
        </div>
      </section>

      <section className="panel quick-panel">
        <SectionHeading eyebrow="QUICK ACTIONS" title="What do you need?" />
        <div className="quick-actions">
          <button onClick={() => setPage('courses')}><BookOpen size={20} /><span><strong>Add a course</strong><small>Browse open sections</small></span><ChevronRight size={17} /></button>
          <button onClick={() => setPage('appointments')}><CalendarCheck size={20} /><span><strong>Book an advisor</strong><small>Next opening tomorrow</small></span><ChevronRight size={17} /></button>
          <button onClick={() => setPage('assistant')}><Bot size={20} /><span><strong>Ask Campus AI</strong><small>Grounded policy answers</small></span><ChevronRight size={17} /></button>
        </div>
      </section>

      <section className="panel event-spotlight">
        <div className={`spotlight-date ${nextEvent.accent}`}><strong>{nextEvent.day}</strong><span>{nextEvent.month}</span></div>
        <div className="spotlight-copy">
          <span className="eyebrow">NEXT ON CAMPUS</span>
          <h3>{nextEvent.title}</h3>
          <p><Clock3 size={15} /> {nextEvent.time}</p>
          <p><MapPin size={15} /> {nextEvent.location}</p>
        </div>
        <button className="secondary-button" onClick={() => setPage('events')}>View event</button>
      </section>

      <section className="panel ai-nudge">
        <div className="ai-nudge-icon"><Sparkles size={22} /></div>
        <div><span>NEW · POLICY AI</span><h3>Answers you can verify.</h3><p>Every response includes the BTU policy source used.</p></div>
        <button className="icon-button" onClick={() => setPage('assistant')} aria-label="Open AI assistant"><ArrowRight size={20} /></button>
      </section>
    </div>
  )
}

function EventsPage({ events, rsvps, setRsvps, notify }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = ['All', ...new Set(events.map((event) => event.category))]
  const visible = events.filter((event) => {
    const matchesCategory = category === 'All' || event.category === category
    const text = `${event.title} ${event.location} ${event.category}`.toLowerCase()
    return matchesCategory && text.includes(query.toLowerCase())
  })

  function toggleRsvp(event) {
    const isGoing = rsvps.includes(event.id)
    const next = isGoing ? rsvps.filter((id) => id !== event.id) : [...rsvps, event.id]
    setRsvps(next)
    writeStore('cc-rsvps', next)
    notify(isGoing ? `RSVP canceled for ${event.title}` : `You’re going to ${event.title}`)
  }

  return (
    <div className="page-stack">
      <section className="page-hero events-hero">
        <div>
          <div className="eyebrow light"><Calendar size={15} /> CAMPUS LIFE</div>
          <h2>There’s more to campus<br />than the classroom.</h2>
          <p>Explore workshops, communities, and opportunities curated for BTU students.</p>
        </div>
        <div className="hero-calendar">
          <span>AUG</span><strong>12</strong><small>6 events ahead</small>
        </div>
      </section>
      <section className="toolbar">
        <div className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events or locations" /></div>
        <div className="filter-scroll">
          {categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}
        </div>
      </section>
      <section className="event-grid">
        {visible.map((event) => {
          const isGoing = rsvps.includes(event.id)
          const available = event.capacity - event.attending - (isGoing ? 1 : 0)
          return (
            <article className="event-card" key={event.id}>
              <div className={`event-card-top ${event.accent}`}>
                <div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div>
                <span className="category-pill">{event.category}</span>
                <div className="event-pattern" />
              </div>
              <div className="event-card-body">
                <h3>{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-meta"><span><Clock3 size={15} /> {event.time}</span><span><MapPin size={15} /> {event.location}</span></div>
                <div className="capacity-row">
                  <div className="avatar-stack"><i>MC</i><i>JR</i><i>+</i></div>
                  <span>{event.attending + (isGoing ? 1 : 0)} going · {available} spots left</span>
                </div>
                <button className={isGoing ? 'rsvp-button going' : 'rsvp-button'} onClick={() => toggleRsvp(event)}>
                  {isGoing ? <><Check size={17} /> Going</> : <>RSVP <ArrowRight size={17} /></>}
                </button>
              </div>
            </article>
          )
        })}
      </section>
      {visible.length === 0 && <div className="empty-state"><Search size={26} /><h3>No events found</h3><p>Try a different keyword or category.</p></div>}
    </div>
  )
}

function CoursesPage({ courses, setCourses, notify }) {
  const [view, setView] = useState('All courses')
  const [query, setQuery] = useState('')
  const shown = courses.filter((course) => {
    const viewMatch = view === 'All courses' ||
      (view === 'My schedule' && course.status === 'enrolled') ||
      (view === 'Waitlists' && course.status === 'waitlisted')
    return viewMatch && `${course.id} ${course.title} ${course.instructor}`.toLowerCase().includes(query.toLowerCase())
  })

  function changeStatus(course) {
    let nextStatus
    let message
    if (course.status === 'enrolled') {
      nextStatus = 'available'
      message = `${course.id} removed from your schedule`
    } else if (course.enrolled >= course.capacity) {
      nextStatus = course.status === 'waitlisted' ? 'available' : 'waitlisted'
      message = nextStatus === 'waitlisted' ? `Joined the ${course.id} waitlist` : `Left the ${course.id} waitlist`
    } else {
      nextStatus = 'enrolled'
      message = `Successfully enrolled in ${course.id}`
    }
    const next = courses.map((item) => item.id === course.id ? { ...item, status: nextStatus, waitlistPosition: nextStatus === 'waitlisted' ? 4 : item.waitlistPosition } : item)
    setCourses(next)
    writeStore('cc-courses', next)
    notify(message)
  }

  return (
    <div className="page-stack">
      <section className="course-summary">
        <div><span>FALL 2026</span><h2>Build a schedule<br />that works for you.</h2><p>Registration closes August 21 at 11:59 PM.</p></div>
        <div className="credit-meter">
          <div className="progress-ring small-ring"><div><strong>{courses.filter((c) => c.status === 'enrolled').reduce((sum, c) => sum + c.credits, 0)}</strong><span>credits</span></div></div>
          <div><strong>Full-time progress</strong><span>12 credits recommended</span><i><b style={{ width: '25%' }} /></i></div>
        </div>
      </section>
      <section className="toolbar course-toolbar">
        <div className="tab-control">
          {['All courses', 'My schedule', 'Waitlists'].map((item) => <button className={view === item ? 'active' : ''} onClick={() => setView(item)} key={item}>{item}</button>)}
        </div>
        <div className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Course, code, or instructor" /></div>
        <button className="filter-button"><Filter size={17} /> Filters</button>
      </section>
      <section className="course-list">
        {shown.map((course) => {
          const full = course.enrolled >= course.capacity
          const seats = course.capacity - course.enrolled
          return (
            <article className="course-card" key={course.id}>
              <div className={`course-code ${course.color}`}><span>{course.id.slice(0, 2)}</span><strong>{course.id.slice(2)}</strong></div>
              <div className="course-main">
                <div className="course-title-row">
                  <div><span>{course.id} · {course.credits} CREDITS</span><h3>{course.title}</h3></div>
                  {course.status === 'enrolled' && <StatusBadge tone="success">Enrolled</StatusBadge>}
                  {course.status === 'waitlisted' && <StatusBadge tone="warning">Waitlist #{course.waitlistPosition}</StatusBadge>}
                  {course.status === 'available' && <StatusBadge tone={full ? 'warning' : 'success'}>{full ? 'Waitlist only' : `${seats} seats open`}</StatusBadge>}
                </div>
                <div className="course-facts">
                  <span><CircleUserRound size={15} /> {course.instructor}</span>
                  <span><Clock3 size={15} /> {course.schedule}</span>
                  <span><MapPin size={15} /> {course.location}</span>
                </div>
                <div className="course-capacity"><i><b style={{ width: `${Math.min(100, (course.enrolled / course.capacity) * 100)}%` }} /></i><span>{course.enrolled}/{course.capacity} seats</span></div>
              </div>
              <button className={course.status === 'enrolled' || course.status === 'waitlisted' ? 'secondary-button course-action' : 'primary-button course-action'} onClick={() => changeStatus(course)}>
                {course.status === 'enrolled' ? 'Drop' : course.status === 'waitlisted' ? 'Leave waitlist' : full ? 'Join waitlist' : 'Add course'}
              </button>
            </article>
          )
        })}
      </section>
      {shown.length === 0 && <div className="empty-state"><BookOpen size={26} /><h3>Nothing here yet</h3><p>Browse all courses to build your schedule.</p></div>}
    </div>
  )
}

function AppointmentsPage({ appointment, setAppointment, notify }) {
  const [selectedAdvisor, setSelectedAdvisor] = useState(advisors[0].id)
  const [selectedDay, setSelectedDay] = useState('Thu 13')
  const [selectedTime, setSelectedTime] = useState('10:30 AM')
  const [meetingType, setMeetingType] = useState('Video meeting')
  const selected = advisors.find((advisor) => advisor.id === selectedAdvisor)
  const days = ['Thu 13', 'Fri 14', 'Mon 17', 'Tue 18', 'Wed 19']
  const times = ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM']

  function book() {
    const next = { advisor: selected.name, role: selected.role, day: selectedDay, time: selectedTime, type: meetingType }
    setAppointment(next)
    writeStore('cc-appointment', next)
    notify(`Appointment confirmed with ${selected.name}`)
  }

  return (
    <div className="page-grid appointment-page">
      <section className="booking-panel panel">
        <div className="booking-progress">
          <span className="done"><Check size={13} /> Service</span><i /><span className="active">2 Advisor</span><i /><span>3 Time</span><i /><span>4 Confirm</span>
        </div>
        <SectionHeading eyebrow="STEP 1–2" title="Who can help?" />
        <div className="service-pills">
          {['Career Services', 'Academic Advising', 'International Support'].map((service, index) => <button key={service} className={selectedAdvisor === advisors[index].id ? 'active' : ''} onClick={() => setSelectedAdvisor(advisors[index].id)}>{service}</button>)}
        </div>
        <div className="advisor-list">
          {advisors.map((advisor) => (
            <button className={selectedAdvisor === advisor.id ? 'active' : ''} key={advisor.id} onClick={() => setSelectedAdvisor(advisor.id)}>
              <div className={`advisor-avatar ${advisor.color}`}>{advisor.initials}</div>
              <div><strong>{advisor.name}</strong><span>{advisor.role}</span><small><span /> Next: {advisor.next}</small></div>
              <div className="radio-mark"><i /></div>
            </button>
          ))}
        </div>

        <SectionHeading eyebrow="STEP 3" title="Choose a time" />
        <div className="date-scroller">
          {days.map((day) => <button className={selectedDay === day ? 'active' : ''} key={day} onClick={() => setSelectedDay(day)}><span>{day.split(' ')[0]}</span><strong>{day.split(' ')[1]}</strong></button>)}
        </div>
        <div className="time-grid">
          {times.map((time) => <button className={selectedTime === time ? 'active' : ''} key={time} onClick={() => setSelectedTime(time)}>{time}</button>)}
        </div>
        <div className="meeting-types">
          {['Video meeting', 'In person'].map((type) => <button className={meetingType === type ? 'active' : ''} onClick={() => setMeetingType(type)} key={type}>{type === 'Video meeting' ? <MessageSquareText size={18} /> : <MapPin size={18} />}<span><strong>{type}</strong><small>{type === 'Video meeting' ? 'Secure BTU Meet link' : 'Student Success Center'}</small></span><i /></button>)}
        </div>
      </section>

      <aside className="booking-summary panel">
        <span className="eyebrow">APPOINTMENT SUMMARY</span>
        <div className={`advisor-avatar large ${selected.color}`}>{selected.initials}</div>
        <h3>{selected.name}</h3><p>{selected.role}</p>
        <div className="summary-details">
          <span><Calendar size={18} /><div><small>Date</small><strong>{selectedDay}, Aug 2026</strong></div></span>
          <span><Clock3 size={18} /><div><small>Time</small><strong>{selectedTime} · 30 min</strong></div></span>
          <span><MessageSquareText size={18} /><div><small>Location</small><strong>{meetingType}</strong></div></span>
        </div>
        <button className="primary-button confirm-button" onClick={book}><CalendarCheck size={18} /> Confirm appointment</button>
        <p className="privacy-note"><ShieldCheck size={14} /> Your appointment details are visible only to you and the assigned advisor.</p>
        {appointment && <div className="confirmed-note"><CheckCircle2 size={18} /><div><strong>Booking confirmed</strong><span>{appointment.day} at {appointment.time}</span></div></div>}
      </aside>
    </div>
  )
}

function scorePolicies(question) {
  const normalized = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ')
  return policyDocs
    .map((doc) => ({ doc, score: doc.keywords.reduce((sum, word) => sum + (normalized.includes(word) ? 1 : 0), 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
}

function PolicyAssistant() {
  const [question, setQuestion] = useState('')
  const [thinking, setThinking] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi there—I’m the BTU Policy AI. I only answer from approved campus policy and I’ll always show my source. What can I help you find?' },
  ])
  const prompts = ['How does the course waitlist work?', 'Can BTU share my resume?', 'What is the add/drop deadline?']

  function ask(text = question) {
    const clean = text.trim()
    if (!clean || thinking) return
    setMessages((current) => [...current, { role: 'user', text: clean }])
    setQuestion('')
    setThinking(true)
    window.setTimeout(() => {
      const matches = scorePolicies(clean)
      if (!matches.length) {
        setMessages((current) => [...current, {
          role: 'assistant',
          text: "I couldn't find enough approved policy evidence to answer that safely. Please contact Student Success or ask about registration, waitlists, appointments, events, privacy, or responsible AI.",
          uncertain: true,
        }])
      } else {
        const top = matches.slice(0, 2).map((item) => item.doc)
        setMessages((current) => [...current, {
          role: 'assistant',
          text: top[0].answer,
          sources: top,
          confidence: matches[0].score >= 2 ? 'High' : 'Grounded',
        }])
      }
      setThinking(false)
    }, 650)
  }

  return (
    <div className="assistant-layout">
      <section className="assistant-chat panel">
        <div className="chat-header">
          <div className="ai-avatar"><Bot size={22} /></div>
          <div><h3>BTU Policy AI</h3><span><i /> Online · Approved sources only</span></div>
          <StatusBadge tone="success"><ShieldCheck size={13} /> Grounded mode</StatusBadge>
        </div>
        <div className="message-list">
          <div className="chat-date">TODAY · AUGUST 12</div>
          {messages.map((message, index) => (
            <div className={`message ${message.role}`} key={`${message.role}-${index}`}>
              {message.role === 'assistant' && <div className="message-avatar"><Bot size={17} /></div>}
              <div className="message-content">
                <div className={`message-bubble ${message.uncertain ? 'uncertain' : ''}`}>{message.text}</div>
                {message.sources && (
                  <div className="source-stack">
                    <div className="answer-quality"><ShieldCheck size={14} /> {message.confidence} confidence · {message.sources.length} approved source{message.sources.length > 1 ? 's' : ''}</div>
                    {message.sources.map((source) => <div className="source-card" key={source.id}><FileCheck2 size={18} /><div><strong>{source.title}</strong><span>{source.id} · Updated {source.updated}</span></div><ChevronRight size={16} /></div>)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {thinking && <div className="message assistant"><div className="message-avatar"><Bot size={17} /></div><div className="typing"><i /><i /><i /></div></div>}
        </div>
        <div className="suggested-prompts">
          {prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)}>{prompt}</button>)}
        </div>
        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); ask() }}>
          <Sparkles size={18} />
          <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask a question about BTU policy…" />
          <button type="submit" aria-label="Send question"><Send size={18} /></button>
        </form>
        <p className="assistant-disclaimer">AI can make mistakes. Verify important decisions using the cited policy or a BTU advisor.</p>
      </section>
      <aside className="assistant-context">
        <section className="panel rag-explainer">
          <div className="eyebrow"><Zap size={14} /> HOW THIS ANSWER WORKS</div>
          <h3>Retrieval before response.</h3>
          <div className="rag-flow">
            <div><span>1</span><p><strong>Your question</strong><small>Intent is detected</small></p></div><i />
            <div><span>2</span><p><strong>Approved policy</strong><small>Relevant passages retrieved</small></p></div><i />
            <div><span>3</span><p><strong>Grounded answer</strong><small>Source is attached</small></p></div>
          </div>
        </section>
        <section className="panel knowledge-panel">
          <SectionHeading eyebrow="KNOWLEDGE BASE" title="6 verified policies" />
          {policyDocs.slice(0, 4).map((doc) => <div className="knowledge-item" key={doc.id}><FileCheck2 size={17} /><div><strong>{doc.topic}</strong><span>{doc.id}</span></div><CheckCircle2 size={15} /></div>)}
          <div className="index-status"><span><i /> Index healthy</span><small>Last synced today, 9:30 AM</small></div>
        </section>
        <section className="human-card"><div><Heart size={19} /></div><h3>Prefer a person?</h3><p>Policy AI never replaces an advisor for individual decisions.</p><button>Contact Student Success <ArrowRight size={14} /></button></section>
      </aside>
    </div>
  )
}

function Sparkline({ values }) {
  const width = 560
  const height = 150
  const min = Math.min(...values) - 5
  const max = Math.max(...values) + 5
  const points = values.map((value, index) => `${(index / (values.length - 1)) * width},${height - ((value - min) / (max - min)) * height}`).join(' ')
  const area = `0,${height} ${points} ${width},${height}`
  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" role="img" aria-label="Weekly active users increased from 38 to 91 percent of target">
      <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#536fe8" stopOpacity=".26" /><stop offset="1" stopColor="#536fe8" stopOpacity="0" /></linearGradient></defs>
      <line x1="0" x2={width} y1="30" y2="30" /><line x1="0" x2={width} y1="85" y2="85" /><line x1="0" x2={width} y1="140" y2="140" />
      <polygon points={area} fill="url(#areaGradient)" />
      <polyline points={points} fill="none" stroke="#4f68df" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={width} cy={points.split(' ').at(-1).split(',')[1]} r="6" fill="#fff" stroke="#4f68df" strokeWidth="4" />
    </svg>
  )
}

function ObservabilityPage({ role }) {
  if (role !== 'Administrator') return <AccessDenied />
  return (
    <div className="page-stack observability-page">
      <section className="ops-banner">
        <div><span><i /> ALL SYSTEMS OPERATIONAL</span><h2>CampusConnect is healthy.</h2><p>Last refreshed 18 seconds ago · Demo telemetry</p></div>
        <button className="secondary-button"><Activity size={17} /> Live view</button>
      </section>
      <section className="ops-stats">
        <article><div className="stat-icon green"><ServerCog size={21} /></div><span>Platform uptime</span><strong>99.98%</strong><small className="positive">↑ 0.04% this week</small></article>
        <article><div className="stat-icon blue"><Zap size={21} /></div><span>Median response</span><strong>184 ms</strong><small className="positive">↓ 26 ms this week</small></article>
        <article><div className="stat-icon violet"><Users size={21} /></div><span>Weekly active users</span><strong>1,248</strong><small className="positive">↑ 18.2% vs last week</small></article>
        <article><div className="stat-icon orange"><Bot size={21} /></div><span>Grounded answer rate</span><strong>96.4%</strong><small>Target ≥ 95%</small></article>
      </section>
      <section className="ops-grid">
        <article className="panel engagement-chart">
          <SectionHeading eyebrow="ADOPTION" title="Weekly active students" action={<div className="chart-legend"><i /> Actual <span /> Target</div>} />
          <div className="chart-number"><strong>1,248</strong><span>of 1,400 target users</span><b>89%</b></div>
          <Sparkline values={engagementSeries} />
          <div className="chart-axis"><span>May 26</span><span>Jun 16</span><span>Jul 7</span><span>Jul 28</span><span>Aug 12</span></div>
        </article>
        <article className="panel service-health">
          <SectionHeading eyebrow="SERVICE HEALTH" title="Core journeys" />
          {[
            ['Login & role access', '99.99%', 99, 'green'],
            ['Course selection', '99.96%', 96, 'blue'],
            ['Appointments', '99.91%', 91, 'violet'],
            ['Policy AI', '99.84%', 84, 'orange'],
          ].map(([name, value, width, tone]) => <div className="health-row" key={name}><span><i className={tone} />{name}</span><strong>{value}</strong><div><b className={tone} style={{ width: `${width}%` }} /></div></div>)}
        </article>
        <article className="panel delivery-panel">
          <SectionHeading eyebrow="DELIVERY" title="MVP release readiness" />
          <div className="readiness-score"><strong>92%</strong><span>Ready for demo</span></div>
          <div className="milestone-list">
            <div className="complete"><Check size={14} /><span><strong>Phase 3A core journeys</strong><small>Completed · Day 46</small></span></div>
            <div className="active"><span>2</span><span><strong>MVP integration & QA</strong><small>In progress · 92%</small></span></div>
            <div><span>3</span><span><strong>Launch & adoption pilot</strong><small>Planned · Day 60</small></span></div>
          </div>
        </article>
        <article className="panel budget-panel">
          <SectionHeading eyebrow="BUDGET" title="$5,000 controlled plan" />
          <div className="budget-ring"><div><strong>$3.6K</strong><span>committed</span></div></div>
          <div className="budget-legend">
            <span><i className="violet" /> AI tools <strong>$1,600</strong></span>
            <span><i className="blue" /> Hosting <strong>$800</strong></span>
            <span><i className="orange" /> Testing <strong>$900</strong></span>
            <span><i className="green" /> Adoption <strong>$300</strong></span>
            <span><i className="gray" /> Contingency <strong>$1,400</strong></span>
          </div>
        </article>
        <article className="panel risk-panel">
          <SectionHeading eyebrow="ACTIVE RISK WATCH" title="Top operational risks" />
          <div className="risk-item high"><span>HIGH</span><div><strong>AI policy hallucination</strong><small>Owner: Developer · Controls active</small></div><ShieldCheck size={18} /></div>
          <div className="risk-item medium"><span>MED</span><div><strong>Compressed launch schedule</strong><small>Owner: Project Manager · Daily checkpoints</small></div><Clock3 size={18} /></div>
          <div className="risk-item low"><span>LOW</span><div><strong>Student adoption below target</strong><small>Owner: Product Manager · Pilot plan active</small></div><Users size={18} /></div>
        </article>
      </section>
    </div>
  )
}

function SecurityPage({ role }) {
  return (
    <div className="page-stack security-page">
      <section className="security-hero">
        <div className="security-shield"><ShieldCheck size={42} /></div>
        <div><div className="eyebrow light">TRUST CENTER</div><h2>Student data stays<br />student data.</h2><p>CampusConnect is designed around least privilege, consent, and transparent policy.</p></div>
        <div className="compliance-stamp"><strong>FERPA</strong><span>Aligned MVP controls</span><CheckCircle2 size={20} /></div>
      </section>
      <section className="trust-grid">
        <article><div className="trust-icon"><LockKeyhole size={22} /></div><h3>Role-based access</h3><p>Students see their own records. Advisors see only assigned service data. Administrative analytics require an admin role.</p><StatusBadge tone="success">Active</StatusBadge></article>
        <article><div className="trust-icon"><FileCheck2 size={22} /></div><h3>Consent before sharing</h3><p>Resumes and education records are not released to third parties without documented student consent.</p><StatusBadge tone="success">Enforced</StatusBadge></article>
        <article><div className="trust-icon"><ServerCog size={22} /></div><h3>Data minimization</h3><p>This MVP uses fictional records only, collects the minimum fields required, and never stores passwords.</p><StatusBadge tone="success">Verified</StatusBadge></article>
        <article><div className="trust-icon"><Bot size={22} /></div><h3>Responsible AI</h3><p>The assistant retrieves from approved policy, cites its source, and refuses unsupported answers.</p><StatusBadge tone="success">Guardrails on</StatusBadge></article>
      </section>
      <section className="privacy-grid">
        <article className="panel access-matrix">
          <SectionHeading eyebrow="ROLE-BASED ACCESS (RBA)" title="Who can see what" />
          <div className="matrix-table">
            <div className="matrix-head"><span>Capability</span><span>Student</span><span>Advisor</span><span>Admin</span></div>
            {[
              ['Own courses & appointments', true, false, false],
              ['Assigned advising queue', false, true, true],
              ['Campus events directory', true, true, true],
              ['System observability', false, false, true],
              ['De-identified adoption metrics', false, true, true],
            ].map(([label, ...checks]) => <div className="matrix-row" key={label}><span>{label}</span>{checks.map((check, i) => <span key={i}>{check ? <CheckCircle2 size={18} /> : <X size={17} />}</span>)}</div>)}
          </div>
        </article>
        <article className="panel privacy-controls">
          <SectionHeading eyebrow="YOUR CONTROLS" title="Privacy center" />
          <button><div><strong>Profile visibility</strong><span>Only you and authorized staff</span></div><StatusBadge tone="success">Private</StatusBadge><ChevronRight size={17} /></button>
          <button><div><strong>Career document sharing</strong><span>No external consent granted</span></div><StatusBadge>Off</StatusBadge><ChevronRight size={17} /></button>
          <button><div><strong>Event participation</strong><span>Show name to event hosts</span></div><StatusBadge tone="success">On</StatusBadge><ChevronRight size={17} /></button>
          <button><div><strong>Download my data</strong><span>Request a portable copy</span></div><ChevronRight size={17} /></button>
        </article>
      </section>
      {role === 'Administrator' ? (
        <section className="panel audit-panel">
          <SectionHeading eyebrow="ADMIN ONLY" title="Recent access audit" action={<button className="text-button">Export log <ArrowRight size={15} /></button>} />
          <div className="audit-table">
            <div className="audit-head"><span>Time</span><span>Actor</span><span>Action</span><span>Decision</span></div>
            {auditEvents.map((event) => <div className="audit-row" key={`${event.time}-${event.action}`}><span>{event.time}</span><strong>{event.actor}</strong><span>{event.action}</span><StatusBadge tone={event.tone}>{event.result}</StatusBadge></div>)}
          </div>
        </section>
      ) : <section className="admin-hidden"><LockKeyhole size={18} /><div><strong>Administrative audit log is protected</strong><span>Sign in with the Administrator demo role to view access events.</span></div></section>}
    </div>
  )
}

function AccessDenied() {
  return (
    <section className="access-denied">
      <div><LockKeyhole size={34} /></div>
      <span className="eyebrow">ROLE-BASED ACCESS</span>
      <h2>This view requires Administrator access.</h2>
      <p>Observability contains operational and adoption data. CampusConnect blocked this request because your current role does not have permission.</p>
      <div className="access-event"><ShieldCheck size={18} /><span><strong>Access control worked as designed.</strong><small>The denied request was added to the demo audit log.</small></span></div>
    </section>
  )
}

function App() {
  const [role, setRole] = useState(null)
  const [page, setPage] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [events] = useState(initialEvents)
  const [rsvps, setRsvps] = useState(() => readStore('cc-rsvps', [1]))
  const [courses, setCourses] = useState(() => readStore('cc-courses', initialCourses))
  const [appointment, setAppointment] = useState(() => readStore('cc-appointment', null))
  const user = role ? demoUsers[role] : null

  const currentView = useMemo(() => {
    if (!user) return null
    switch (page) {
      case 'courses': return <CoursesPage courses={courses} setCourses={setCourses} notify={notify} />
      case 'events': return <EventsPage events={events} rsvps={rsvps} setRsvps={setRsvps} notify={notify} />
      case 'appointments': return <AppointmentsPage appointment={appointment} setAppointment={setAppointment} notify={notify} />
      case 'assistant': return <PolicyAssistant />
      case 'observability': return <ObservabilityPage role={role} />
      case 'security': return <SecurityPage role={role} />
      default: return <Dashboard user={user} courses={courses} events={events} rsvps={rsvps} setPage={setPage} />
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, role, courses, events, rsvps, appointment])

  function notify(message) {
    setToast(message)
    window.clearTimeout(window.__campusToast)
    window.__campusToast = window.setTimeout(() => setToast(''), 3000)
  }

  function login(nextRole) {
    setRole(nextRole)
    setPage('home')
  }

  if (!role) return <LoginScreen onLogin={login} />

  return (
    <div className="app-shell">
      {mobileOpen && <button className="sidebar-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
      <Sidebar page={page} setPage={setPage} user={user} role={role} open={mobileOpen} setOpen={setMobileOpen} onLogout={() => { setRole(null); setPage('home') }} />
      <div className="app-main">
        <Header page={page} user={user} role={role} setMobileOpen={setMobileOpen} />
        <main className="content">{currentView}</main>
        <footer className="app-footer"><span>CampusConnect MVP · Team 2 Rockstars</span><span>PM · Developer · BA · Product Manager</span></footer>
      </div>
      {toast && <div className="toast"><CheckCircle2 size={18} />{toast}</div>}
    </div>
  )
}

export default App
