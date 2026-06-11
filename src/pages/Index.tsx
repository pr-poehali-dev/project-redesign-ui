import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

// ===== Типы =====

interface InfoCardProps {
  id: string
  icon: string
  title: string
  description: string
  details: string[]
  tag: "Гайд" | "Механика" | "Стратегия" | "Лор" | "Альянс"
}

interface NewsItem {
  date: string
  title: string
  text: string
  tag: "Событие" | "Обновление" | "Объявление"
}

interface PlayerRow {
  rank: number
  name: string
  role: string
  power: string
  kills: string
  status: "Активен" | "Офлайн" | "Лидер"
}

interface ForumThread {
  title: string
  author: string
  replies: number
  category: "Тактика" | "Набор" | "Общение" | "Вопросы"
  time: string
}

// ===== Данные =====

const tagColors: Record<InfoCardProps["tag"], string> = {
  Гайд: "bg-blue-900/60 text-blue-300 border border-blue-700",
  Механика: "bg-purple-900/60 text-purple-300 border border-purple-700",
  Стратегия: "bg-red-900/60 text-red-300 border border-red-700",
  Лор: "bg-yellow-900/60 text-yellow-300 border border-yellow-700",
  Альянс: "bg-green-900/60 text-green-300 border border-green-700",
}

const gameInfoCards: InfoCardProps[] = [
  {
    id: "basics",
    icon: "BookOpen",
    title: "Что такое Last Asylum",
    description: "Постапокалиптическая стратегия с элементами выживания, где альянсы сражаются за контроль над ресурсами и территориями.",
    details: [
      "Реальное время — события происходят 24/7, пока вы спите",
      "Тысячи игроков на одном сервере",
      "Стройте базу, обучайте войска, исследуйте технологии",
      "Заключайте союзы и объявляйте войны",
      "Глобальные события и сезонные рейды",
    ],
    tag: "Гайд",
  },
  {
    id: "alliance",
    icon: "Shield",
    title: "Зачем нужен альянс",
    description: "Одиночки быстро становятся жертвами. Альянс — это щит, меч и семья в одном флаконе.",
    details: [
      "Защита базы от атак противников",
      "Совместные захваты ключевых точек карты",
      "Бонусы к ресурсам и скорости строительства",
      "Помощь союзников в ускорении очереди",
      "Координация в войнах альянсов (KvK, War Season)",
    ],
    tag: "Альянс",
  },
  {
    id: "combat",
    icon: "Swords",
    title: "Боевая система",
    description: "Три типа войск, контрбоевые механики и умение командира определяют исход сражений.",
    details: [
      "Пехота → Кавалерия → Стрелки → Пехота (треугольник)",
      "Формации: атакующая, оборонительная, смешанная",
      "Командиры с уникальными способностями и деревом навыков",
      "Ловушки и защитные укрепления базы",
      "Разведка перед атакой — обязательна",
    ],
    tag: "Механика",
  },
  {
    id: "resources",
    icon: "Package",
    title: "Ресурсы и экономика",
    description: "Еда, дерево, камень, металл и золото — основа всего. Кто контролирует ресурсы, тот контролирует игру.",
    details: [
      "Фермы, лесопилки, шахты — основное производство",
      "Поля на карте дают бонусные ресурсы",
      "Торговля через рынок с союзниками",
      "Грабёж вражеских баз и лагерей монстров",
      "Не храни ресурсы в открытую — атакуют",
    ],
    tag: "Стратегия",
  },
  {
    id: "lore",
    icon: "Globe",
    title: "Лор мира",
    description: "Мир рухнул. Правительства пали. Выжившие строят новые государства из руин старого мира.",
    details: [
      "Год З.А. (За Апокалипсис) — отсчёт новой эры",
      "Фракции: Стальной Орден, Пустынные Кочевники, Технократы",
      "Загадочный вирус уничтожил 90% населения",
      "Убежища — последние оплоты цивилизации",
      "Артефакты Старого Мира дают невероятные бонусы",
    ],
    tag: "Лор",
  },
  {
    id: "events",
    icon: "Trophy",
    title: "События и рейтинги",
    description: "Еженедельные события, сезонные войны и глобальные рейды держат игру в тонусе.",
    details: [
      "KvK (Kingdom vs Kingdom) — главное событие сезона",
      "Охота на монстров — ежедневные задания",
      "Турнир командиров — личный рейтинг",
      "Война альянсов — захват замков и флагов",
      "Seasonal Pass с эксклюзивными наградами",
    ],
    tag: "Механика",
  },
]

const newsItems: NewsItem[] = [
  {
    date: "10 июн 2026",
    title: "ASYLUM захватил Крепость Забвения",
    text: "После 6-часового рейда наш альянс удержал Крепость Забвения. Спасибо всем участникам битвы! Особая благодарность войскам R4 за координацию.",
    tag: "Событие",
  },
  {
    date: "7 июн 2026",
    title: "Набор новых участников открыт",
    text: "Альянс ASYLUM объявляет набор игроков с силой от 5 млн. Требования: активность в KvK, Discord обязателен. Подавайте заявку в игре.",
    tag: "Объявление",
  },
  {
    date: "3 июн 2026",
    title: "Обновление 4.2 — новые механики",
    text: "В игре появились Штормовые Рейды — кооперативные задания на 10 альянсов. Готовимся к первому прохождению на этой неделе.",
    tag: "Обновление",
  },
  {
    date: "29 май 2026",
    title: "Итоги KvK Season 12",
    text: "Мы финишировали на 3-м месте с результатом 847 млн очков. В следующем сезоне целимся в топ-1. Разбор ошибок в Discord.",
    tag: "Событие",
  },
]

const players: PlayerRow[] = [
  { rank: 1, name: "VoidReaper", role: "Лидер", power: "142M", kills: "8.4M", status: "Лидер" },
  { rank: 2, name: "IronVeil", role: "R4 Война", power: "118M", kills: "6.1M", status: "Активен" },
  { rank: 3, name: "ShadowCrypt", role: "R4 Развед", power: "97M", kills: "5.7M", status: "Активен" },
  { rank: 4, name: "NullBorne", role: "R3", power: "84M", kills: "4.2M", status: "Активен" },
  { rank: 5, name: "AshWarden", role: "R3", power: "76M", kills: "3.8M", status: "Офлайн" },
  { rank: 6, name: "RuneBreaker", role: "R3", power: "71M", kills: "3.1M", status: "Активен" },
  { rank: 7, name: "GlitchHunter", role: "R2", power: "65M", kills: "2.9M", status: "Активен" },
  { rank: 8, name: "DuskSerpent", role: "R2", power: "58M", kills: "2.4M", status: "Офлайн" },
]

const forumThreads: ForumThread[] = [
  { title: "Гайд по расстановке войск в KvK — актуально для Season 13", author: "IronVeil", replies: 34, category: "Тактика", time: "2 ч назад" },
  { title: "Набор в ASYLUM — требования и правила", author: "VoidReaper", replies: 67, category: "Набор", time: "5 ч назад" },
  { title: "Как правильно распределять ресурсы на старте?", author: "NewbieAsh", replies: 21, category: "Вопросы", time: "8 ч назад" },
  { title: "Лучшие командиры для обороны базы в 2026", author: "ShadowCrypt", replies: 45, category: "Тактика", time: "1 д назад" },
  { title: "Общий чат — добро пожаловать в ASYLUM!", author: "GlitchHunter", replies: 128, category: "Общение", time: "2 д назад" },
  { title: "Разбор ошибок KvK Season 12 — что улучшить", author: "VoidReaper", replies: 52, category: "Тактика", time: "3 д назад" },
]

// ===== Компоненты =====

function InfoCard({ icon, title, description, details, tag }: InfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-primary/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Icon name={icon} size={20} className="text-primary" />
            </div>
            <CardTitle className="text-lg leading-tight text-balance text-foreground">{title}</CardTitle>
          </div>
          <Badge className={`${tagColors[tag as InfoCardProps["tag"]]} text-xs font-semibold flex-shrink-0 ml-2`}>{tag}</Badge>
        </div>
        <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
          <p className="text-sm text-foreground/80 leading-relaxed">{description}</p>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0 space-y-2">
          <h5 className="font-semibold text-foreground mb-3 text-sm">Подробнее</h5>
          <ul className="space-y-2">
            {details.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                <Icon name="ChevronRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  )
}

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "about", label: "Об игре" },
    { id: "news", label: "Новости" },
    { id: "ratings", label: "Рейтинг" },
    { id: "forum", label: "Форум" },
    { id: "join", label: "Вступить" },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Icon name="Shield" size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-wide text-foreground">ASYLUM</span>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="px-3 py-1.5 text-sm text-foreground/70 hover:text-foreground hover:bg-white/10 rounded-lg transition-colors"
            >
              {s.label}
            </button>
          ))}
          <Button size="sm" className="ml-2" onClick={() => scrollTo("join")}>
            Вступить
          </Button>
        </div>
        {/* Mobile */}
        <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setIsOpen(!isOpen)}>
          <Icon name={isOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/10 px-4 py-3 space-y-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="w-full text-left px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-white/10 rounded-lg transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

// ===== Главная страница =====

export default function Index() {
  const newsTagColors = {
    Событие: "bg-blue-900/60 text-blue-300 border border-blue-700",
    Обновление: "bg-green-900/60 text-green-300 border border-green-700",
    Объявление: "bg-yellow-900/60 text-yellow-300 border border-yellow-700",
  }

  const forumCatColors = {
    Тактика: "bg-red-900/50 text-red-300",
    Набор: "bg-green-900/50 text-green-300",
    Общение: "bg-blue-900/50 text-blue-300",
    Вопросы: "bg-purple-900/50 text-purple-300",
  }

  const statusColors = {
    Активен: "bg-green-500",
    Офлайн: "bg-gray-500",
    Лидер: "bg-yellow-500",
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + "s",
              }}
            />
          ))}
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-medium mb-6">
            <Icon name="Shield" size={16} />
            Альянс Last Asylum
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none">
            <span className="text-foreground">LAST</span>
            <br />
            <span className="text-primary">ASYLUM</span>
          </h1>
          <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto leading-relaxed">
            Постапокалиптическая стратегия. Мир рухнул — мы выжили. Присоединяйся к сильнейшему альянсу сервера.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="px-8 text-base font-bold" onClick={() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" })}>
              <Icon name="Shield" size={18} className="mr-2" />
              Вступить в альянс
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-base" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
              <Icon name="BookOpen" size={18} className="mr-2" />
              Об игре
            </Button>
          </div>
          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { label: "Игроков", value: "124" },
              { label: "Место в топе", value: "#3" },
              { label: "Сезонов KvK", value: "12" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-primary">{stat.value}</div>
                <div className="text-sm text-foreground/50 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-foreground/30" />
        </div>
      </section>

      {/* Об игре */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40 px-4 py-1">Описание игры</Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Всё, что нужно знать о Last Asylum</h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">Нажми на карточку — раскрой подробности</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameInfoCards.map((card) => (
              <InfoCard key={card.id} {...card} />
            ))}
          </div>
        </div>
      </section>

      {/* Новости */}
      <section id="news" className="py-20 px-4 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40 px-4 py-1">Новости альянса</Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Что происходит в ASYLUM</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {newsItems.map((item, i) => (
              <Card key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-foreground/40">{item.date}</span>
                    <Badge className={`${newsTagColors[item.tag]} text-xs`}>{item.tag}</Badge>
                  </div>
                  <CardTitle className="text-base font-bold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/60 leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Рейтинг игроков */}
      <section id="ratings" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40 px-4 py-1">Таблица лидеров</Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Рейтинг игроков ASYLUM</h2>
            <p className="text-foreground/60">Топ по силе и количеству уничтоженных войск</p>
          </div>
          <Card className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider">#</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Игрок</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider hidden sm:table-cell">Роль</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Сила</th>
                    <th className="text-right px-4 py-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider hidden md:table-cell">Убийства</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((p) => (
                    <tr key={p.rank} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <span className={`text-sm font-bold ${p.rank <= 3 ? "text-primary" : "text-foreground/40"}`}>
                          {p.rank <= 3 ? ["🥇", "🥈", "🥉"][p.rank - 1] : p.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {p.name[0]}
                          </div>
                          <span className="text-sm font-semibold">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-sm text-foreground/60">{p.role}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-mono font-semibold text-foreground">{p.power}</span>
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell">
                        <span className="text-sm font-mono text-foreground/60">{p.kills}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className={`w-2 h-2 rounded-full ${statusColors[p.status]}`} />
                          <span className="text-xs text-foreground/60 hidden sm:inline">{p.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Форум */}
      <section id="forum" className="py-20 px-4 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40 px-4 py-1">Сообщество</Badge>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Форум альянса</h2>
            <p className="text-foreground/60">Обсуждения, тактики, вопросы и набор новых бойцов</p>
          </div>
          <div className="space-y-3">
            {forumThreads.map((thread, i) => (
              <Card
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/8 hover:border-primary/30 transition-all cursor-pointer"
              >
                <CardContent className="py-4 px-5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                        {thread.author[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{thread.title}</p>
                        <p className="text-xs text-foreground/40 mt-0.5">{thread.author} · {thread.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <Badge className={`${forumCatColors[thread.category]} text-xs hidden sm:inline-flex`}>{thread.category}</Badge>
                      <div className="flex items-center gap-1 text-foreground/40">
                        <Icon name="MessageSquare" size={14} />
                        <span className="text-xs">{thread.replies}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" className="border-white/20 hover:bg-white/10">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать тему
            </Button>
          </div>
        </div>
      </section>

      {/* Вступить */}
      <section id="join" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl" />
            <Card className="relative rounded-3xl border border-primary/30 bg-white/5 backdrop-blur-sm p-8 md:p-12">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <Badge className="mb-4 bg-primary/20 text-primary border-primary/40 px-4 py-1">Открытый набор</Badge>
              <h2 className="text-3xl md:text-4xl font-black mb-4">Готов воевать за ASYLUM?</h2>
              <p className="text-foreground/60 mb-8 leading-relaxed">
                Мы принимаем активных игроков с силой от 5 млн. Обязателен Discord, участие в KvK и взаимопомощь.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: "Zap", label: "Сила от 5 млн" },
                  { icon: "Clock", label: "Активность ежедневно" },
                  { icon: "Users", label: "Discord обязателен" },
                ].map((req) => (
                  <div key={req.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10">
                    <Icon name={req.icon} size={20} className="text-primary" />
                    <span className="text-sm text-foreground/70 text-center">{req.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button size="lg" className="px-10 text-base font-bold">
                  <Icon name="Shield" size={18} className="mr-2" />
                  Подать заявку в игре
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10" onClick={() => window.open("https://lolka.me/_demon_hell", "_blank")}>
                  <Icon name="MessageSquare" size={18} className="mr-2" />
                  Lolka сервер
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground">ASYLUM</span>
            <span className="text-foreground/30">·</span>
            <span className="text-sm text-foreground/40">Last Asylum Alliance</span>
          </div>
          <p className="text-sm text-foreground/30">Сайт фанатского альянса. Не является официальным ресурсом игры.</p>
        </div>
      </footer>
    </div>
  )
}