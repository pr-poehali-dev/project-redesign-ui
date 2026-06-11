import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  TrendingUp,
  Shield,
  FileText,
  Clock,
  Users,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
  Menu,
  DollarSign,
  Target,
  Wallet,
  ArrowLeftRight,
  LineChart,
  Heart,
  FileCheck,
  Scale,
  Compass,
  Building2,
  Brain,
  GraduationCap,
  BarChart3,
  Receipt,
} from "lucide-react"

interface StrategyCardProps {
  id: string
  icon:
    | "shield"
    | "target"
    | "clock"
    | "wallet"
    | "arrows"
    | "chart"
    | "heartbeat"
    | "file-check"
    | "scales"
    | "compass"
  title: string
  valueProp: string
  what: string[]
  metrics: string[]
  sources: string[]
  tag: "Priority" | "Risk" | "Tax" | "Income" | "Estate" | "Health" | "Implementation"
}

const tagLabels: Record<StrategyCardProps["tag"], string> = {
  Priority: "Приоритет",
  Risk: "Риски",
  Tax: "Налоги",
  Income: "Доход",
  Estate: "Наследие",
  Health: "Здоровье",
  Implementation: "Реализация",
}

function StrategyCard({ id, icon, title, valueProp, what, metrics, sources, tag }: StrategyCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const iconMap = {
    shield: <Shield className="h-6 w-6 text-primary" />,
    target: <Target className="h-6 w-6 text-primary" />,
    clock: <Clock className="h-6 w-6 text-primary" />,
    wallet: <Wallet className="h-6 w-6 text-primary" />,
    arrows: <ArrowLeftRight className="h-6 w-6 text-primary" />,
    chart: <LineChart className="h-6 w-6 text-primary" />,
    heartbeat: <Heart className="h-6 w-6 text-primary" />,
    "file-check": <FileCheck className="h-6 w-6 text-primary" />,
    scales: <Scale className="h-6 w-6 text-primary" />,
    compass: <Compass className="h-6 w-6 text-primary" />,
  }

  const tagColors = {
    Priority: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Risk: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Tax: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Income: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    Estate: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Health: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    Implementation: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  }

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">{iconMap[icon]}</div>
            <CardTitle className="text-xl leading-tight text-balance">{title}</CardTitle>
          </div>
          <Badge className={`${tagColors[tag]} text-xs font-semibold flex-shrink-0 ml-2`}>{tagLabels[tag]}</Badge>
        </div>
        <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
          <p className="text-base text-foreground leading-relaxed">{valueProp}</p>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-6 pt-0">
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Что включено</h5>
            <ul className="space-y-2 text-base text-muted-foreground">
              {what.map((item, index) => (
                <li key={index} className="leading-relaxed flex items-start">
                  <span className="mr-2 flex-shrink-0">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Метрики успеха</h5>
            <ul className="space-y-2 text-base text-muted-foreground">
              {metrics.map((metric, index) => (
                <li key={index} className="leading-relaxed flex items-start">
                  <span className="mr-2 flex-shrink-0">-</span>
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 border-t">
            <h5 className="font-semibold text-foreground mb-2 text-sm">Источники</h5>
            <p className="text-sm text-muted-foreground italic">{sources.join("; ")}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

interface RecommendationCardProps {
  number: number
  title: string
  icon: React.ReactNode
  what: string
  why: string
  firstSteps: string[]
}

function RecommendationCard({ number, title, icon, what, why, firstSteps }: RecommendationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="cursor-pointer transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3 min-h-[60px] flex justify-center" onClick={() => setIsExpanded(!isExpanded)}>
        <CardTitle className="flex items-center justify-between text-base sm:text-lg leading-tight">
          <div className="flex items-center space-x-2 pr-2">
            <div className="flex-shrink-0">{icon}</div>
            <span className="text-balance">
              {number}. {title}
            </span>
          </div>
          <div className="flex-shrink-0 ml-2">
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-6 pt-0 px-4 sm:px-6">
          <div className="bg-muted/50 p-4 rounded-lg border-l-4 border-primary">
            <p className="text-sm text-foreground font-medium leading-relaxed">{why}</p>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Что включено</h5>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{what}</p>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-3 text-base">Первые шаги</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {firstSteps.map((step, index) => (
                <li key={index} className="leading-relaxed flex items-start">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function TableOfContents() {
  const [activeSection, setActiveSection] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "team", label: "Команда" },
    { id: "executive-summary", label: "Резюме" },
    { id: "service-options", label: "Варианты услуг" },
    { id: "recommendations", label: "Рекомендации" },
    { id: "fees", label: "Стоимость" },
    { id: "onboarding", label: "Онбординг" },
    { id: "next-steps", label: "Следующие шаги" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile TOC Toggle */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-background/95 backdrop-blur-sm shadow-lg"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile TOC Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <Card className="absolute top-16 right-4 w-48 bg-background shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Содержание</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left text-xs px-2 py-1 rounded transition-colors ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

interface ServiceCategory {
  id: string
  title: string
  color: string
  icon: React.ReactNode
  services: ServiceItem[]
}

interface ServiceItem {
  service: string
  details: string
  isPersonalized?: boolean
}

const financialPlanningServices: ServiceCategory[] = [
  {
    id: "retirement-income",
    title: "Пенсионное планирование и доход",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: <Clock className="h-6 w-6" />,
    services: [
      {
        service: "Анализ пенсионных накоплений",
        details: "Прогнозы, симуляции Монте-Карло для пенсионных сценариев",
      },
      {
        service: "Оптимизация пенсии",
        details: "Оптимальные стратегии выбора пенсии (единовременная выплата или аннуитет)",
      },
      {
        service: "Оптимизация социальных выплат",
        details: "Стратегии отсрочки и консультации по получению (с акцентом на супруга)",
      },
      {
        service: "Конвертация в Roth IRA",
        details: "Стратегические конвертации в Roth IRA",
      },
      {
        service: "Анализ разрыва в доходах",
        details: "Оценка источников пенсионного дохода и управление дефицитом",
      },
      {
        service: "План расходов на переходный период",
        details: "Разработка стратегии расходования до начала социальных выплат или пенсии",
      },
      {
        service: "Интеграция медицинских расходов",
        details: "Включение расходов на медицину в пенсионные прогнозы",
      },
    ],
  },
  {
    id: "tax-planning",
    title: "Налоговое планирование и оптимизация",
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    icon: <Receipt className="h-6 w-6" />,
    services: [
      {
        service: "Немедленно активировать взносы в 401(k)",
        details: "Начать отчисления до налогов для снижения облагаемого дохода 2025 и формирования пенсионных накоплений",
        isPersonalized: true,
      },
      {
        service: "Открыть Backdoor Roth IRA (с 2026)",
        details: "Внедрить ежегодные конвертации Roth для формирования необлагаемых пенсионных активов",
        isPersonalized: true,
      },
      {
        service: "Согласовать квартальные налоговые платежи 2025 с бухгалтером",
        details: "Обеспечить корректные квартальные платежи для избежания штрафов и оптимизации денежного потока",
        isPersonalized: true,
      },
      {
        service: "Открыть Donor-Advised Fund (DAF) для благотворительности",
        details: "Создать налогово-эффективный инструмент благотворительности с немедленным вычетом и гибким сроком",
        isPersonalized: true,
      },
      {
        service: "Реструктурировать 50 млн ₽ наличных в налогово-эффективные инструменты",
        details: "Разместить избыточную наличность в муниципальные облигации и другие налогово-эффективные инструменты",
        isPersonalized: true,
      },
      {
        service: "Интегрировать портфель муниципальных облигаций",
        details: "Добавить поток необлагаемого дохода для снижения общей налоговой нагрузки в годы высокого дохода",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "cash-flow-budget",
    title: "Управление денежными потоками и бюджетом",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    icon: <Wallet className="h-6 w-6" />,
    services: [
      {
        service: "Определить базовую финансовую подушку",
        details: "Установить оптимальный размер и расположение резервного фонда для нерегулярного дохода",
        isPersonalized: true,
      },
      {
        service: "Создать систему распределения крупных поступлений",
        details: "Систематический процесс распределения крупных комиссионных по целям",
        isPersonalized: true,
      },
      {
        service: "Вести 12-месячную карту расходов",
        details: "Отслеживать и прогнозировать расходы для управления переменным доходом и поиска оптимизаций",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "investment-planning",
    title: "Инвестиционное планирование и управление",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: <BarChart3 className="h-6 w-6" />,
    services: [
      {
        service: "Реализовать 36-месячный план диверсификации RSU Palantir",
        details: "Систематическая диверсификация концентрированной позиции в акциях за три года",
        isPersonalized: true,
      },
      {
        service: "Диверсификация от риска одной акции",
        details: "Снизить концентрационный риск с учётом налоговых последствий, сохраняя потенциал роста",
        isPersonalized: true,
      },
      {
        service: "Внедрить автоматизированную инвестиционную политику (IPS)",
        details: "Формализовать инвестиционную стратегию, распределение активов и правила ребалансировки",
        isPersonalized: true,
      },
      {
        service: "Смоделировать сценарий ранней финансовой независимости (50-55 лет)",
        details: "Спрогнозировать готовность к пенсии и выявить пробелы для опции раннего выхода",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "risk-insurance",
    title: "Управление рисками и страхование",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: <Shield className="h-6 w-6" />,
    services: [
      {
        service: "Комплексный обзор страхования",
        details: "Оценка потребностей в страховании жизни, нетрудоспособности, зонтичном и других видах для текущей ситуации",
        isPersonalized: true,
      },
      {
        service: "Защита концентрированных активов в переходный период",
        details: "Рассмотреть стратегии хеджирования или страховые решения на период диверсификации акций",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "estate-legacy",
    title: "Наследственное планирование",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: <FileCheck className="h-6 w-6" />,
    services: [
      {
        service: "Оформить базовые документы (2025)",
        details: "Создать завещание, медицинскую доверенность, финансовую доверенность и назначения бенефициаров",
        isPersonalized: true,
      },
      {
        service: "Интегрировать DAF и будущие благотворительные цели",
        details: "Согласовать стратегию благотворительности с общим наследственным планированием",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "education-college",
    title: "Образовательное планирование",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    icon: <GraduationCap className="h-6 w-6" />,
    services: [
      {
        service: "Планы 529 и образовательные фонды",
        details: "Настройка и стратегии финансирования (налогово-эффективные взносы)",
      },
      {
        service: "Финансовая грамотность для детей",
        details: "Введение в бюджетирование и основы инвестирования",
      },
    ],
  },
  {
    id: "business-entrepreneurial",
    title: "Бизнес-планирование",
    color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    icon: <Building2 className="h-6 w-6" />,
    services: [
      {
        service: "Создать резерв для будущих проектов",
        details: "Выделить капитал для потенциальных стартапов или бизнес-возможностей",
        isPersonalized: true,
      },
      {
        service: "Оценить структуры для будущего стартапа",
        details: "Анализ ООО, S-Corp и других структур для будущей предпринимательской деятельности",
        isPersonalized: true,
      },
    ],
  },
  {
    id: "behavioral-emotional",
    title: "Поведенческая и эмоциональная поддержка",
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    icon: <Brain className="h-6 w-6" />,
    services: [
      {
        service: "Формализовать системы принятия решений",
        details: "Создать систематические процессы для финансовых решений, снижающие сложность и тревожность",
        isPersonalized: true,
      },
      {
        service: "Переосмыслить рост капитала как системный процесс",
        details: "Сместить фокус с краткосрочных выигрышей на долгосрочное накопление и устойчивость",
        isPersonalized: true,
      },
    ],
  },
]

function ExecutiveSummaryCard() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card
      className="mb-8 sm:mb-12 cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      id="executive-summary"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <CardTitle className="text-xl sm:text-2xl">Резюме</CardTitle>
          </div>
          {isExpanded ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">
          Ваше финансовое положение и ключевые возможности планирования
        </CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-8">
          <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
            <p className="text-base text-foreground leading-relaxed">
              Это ваше первое обращение к профессиональному финансовому планированию, вызванное необходимостью
              управления концентрированным пакетом акций Palantir и нестабильным комиссионным доходом. Ваша финансовая
              база прочна, но быстрый рост доходов и неравномерные денежные потоки создали неопределённость в
              отношении налоговой оптимизации, сроков диверсификации и долгосрочной структуры капитала. Вы готовы
              к системному руководству для трансформации сложности в уверенность.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-lg">Где вы сейчас</h4>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Вы руководитель корпоративных продаж Palantir с доходом ~150 млн ₽ за 2025 год (оклад 15 млн ₽,
                    комиссионные ~110 млн ₽, RSU 25,3 млн ₽)
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    У вас ~100 млн ₽ ликвидного капитала: 50 млн ₽ на высокодоходном счёте (Amex), 31,8 млн ₽ в акциях Palantir
                    и ~20 млн ₽ в ETF
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Вы арендуете жильё в Нолите за 380 000 ₽/месяц и рассматриваете покупку в Манхэттене или
                    Бруклине (бюджет 100-200 млн ₽)
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Вы ещё не начали взносы в 401(k); Palantir не делает matching, но полностью покрывает
                    медицинскую страховку
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    У вас нет долгов, кроме текущих остатков по кредитным картам, основной банк - JP Morgan Chase
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-lg">На чём мы сфокусируемся вместе</h4>
              <ul className="space-y-4 text-base text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Мы оптимизируем вашу налоговую ситуацию, смоделировав федеральные и NY/NYC обязательства за 2025
                    и снизив высокую маржинальную ставку (~49%) через отложенный доход, муниципальные фонды и
                    стратегические вычеты
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Мы разработаем многолетний план снижения концентрации Palantir с учётом налоговых последствий
                    и сохранением потенциала роста
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Мы поможем вам оценить компромиссы аренды vs покупки в NYC, включая альтернативную стоимость,
                    налоговые льготы и гибкость образа жизни
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Мы создадим системы для управления нерегулярным комиссионным доходом, автоматизации накоплений
                    и оптимизации размещения высокодоходной наличности
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">
                    Мы разработаем диверсифицированную инвестиционную стратегию, соответствующую вашей толерантности
                    к риску и будущим целям (семья, предпринимательство, финансовая независимость)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function ServiceCategoryCard({ category }: { category: ServiceCategory }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const personalizedCount = category.services.filter((s) => s.isPersonalized).length

  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-lg rounded-2xl border-2"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">{category.icon}</div>
            <CardTitle className="text-xl leading-tight text-balance">{category.title}</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            {personalizedCount > 0 && (
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0">
                {personalizedCount} для вас
              </Badge>
            )}
            <Badge className={`${category.color} text-xs font-semibold flex-shrink-0`}>
              {category.services.length} услуг
            </Badge>
            {isExpanded ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="space-y-4">
            {category.services.map((service, index) => (
              <div
                key={index}
                className={`border-l-4 pl-4 py-2 ${
                  service.isPersonalized
                    ? "border-primary bg-primary/5"
                    : "border-primary/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h5 className="font-semibold text-foreground text-base mb-1 flex-1">{service.service}</h5>
                  {service.isPersonalized && (
                    <Badge className="bg-primary text-primary-foreground text-xs font-semibold flex-shrink-0">
                      Для вас
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default function ClientProposal() {
  return (
    <div className="min-h-screen bg-background">
      <TableOfContents />

      {/* Professional Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <img
                src="/images/design-mode/FgXdJj9lQfuwdL2tT3uNYMFNviU.png"
                alt="Meridian Wealth Partners Logo"
                className="h-10 w-10 rounded-lg flex-shrink-0 object-cover"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                  Meridian Wealth Partners
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Ясная стратегия. Надёжное руководство. Реальные результаты.</p>
              </div>
            </div>
            <div className="text-left sm:text-right space-y-1 w-full sm:w-auto">
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" aria-label="Адрес" />
                <span>17 Prince St, Rochester, NY 14607</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" aria-label="Телефон" />
                <span>585-504-1616</span>
              </div>
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" aria-label="Email" />
                <span>hello@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mt-20">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <Badge variant="secondary" className="mb-4">
            Предложение для нового клиента
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
            Подготовлено для Шейна Макуильямса
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            Трансформация концентрированного пакета Palantir и нестабильного дохода в налогово-эффективный
            диверсифицированный план устойчивого роста
          </p>
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Дата: 21 октября 2025</span>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <Card className="mb-8 sm:mb-12" id="team">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-xl sm:text-2xl">
              <Users className="h-5 w-5 text-primary" />
              <span>Наша команда</span>
            </CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Профессионалы, которые будут сопровождать вас на вашем финансовом пути
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Christopher Haigh, CFP</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Генеральный директор и ведущий планировщик</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Jack Hills</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Директор по инвестициям</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Gene Thompson, CFP</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Директор по финансовому планированию</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Stephanie Nemecheck</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Директор по операциям</p>
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-foreground text-base">Matthew Scott</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">Ассоциат по финансовому планированию</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <ExecutiveSummaryCard />

        {/* Service Model Selection */}
        <Card className="mb-8 sm:mb-12" id="service-options">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Выберите подходящий вариант</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Три модели обслуживания, разработанные для различных потребностей и предпочтений клиентов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1: Asset Management Only */}
              <div className="border rounded-lg p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Только управление активами</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Дисциплинированный инвестиционный механизм работает в фоновом режиме
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Хотите делегировать без текущего планирования
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Пенсионеры, упрощающие активы
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Пассивные долгосрочные инвесторы
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Недорогие диверсифицированные портфели
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Прямое индексирование + сбор налоговых убытков
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Ежегодная встреча с директором по инвестициям
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Доступ к Right Capital
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Не включено</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">x</span>Финансовое планирование
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 2: Comprehensive Wealth Management - Recommended */}
              <div className="border-2 border-primary rounded-lg p-6 space-y-6 relative">
                <Badge className="absolute -top-3 left-4 bg-primary text-primary-foreground font-semibold">
                  РЕКОМЕНДУЕМ
                </Badge>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Комплексное управление капиталом</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Партнёрство с экспертами на каждом этапе вашего финансового пути
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Семьи с текущими сложностями
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Акционерные компенсации, владельцы бизнеса
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Клиенты, ценящие стратегию и структуру
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        2-4 встречи в год, привязанные к жизненным событиям
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Индивидуальные портфели и налоговая стратегия
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Планирование наследства, пенсии и передачи капитала
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Специализированное моделирование и координация с другими специалистами
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Открытый доступ для вопросов по email в течение года
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Vault + RightCapital (полный доступ)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 3: Project-Based Planning */}
              <div className="border rounded-lg p-6 space-y-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-lg">Проектное планирование</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">Решить одну большую задачу правильно</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Для кого подходит</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Разовые решения в сложных ситуациях
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Нужна экспертная проверка, не постоянная поддержка
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Что вы получите</h5>
                    <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Чёткий план за 1-3 месяца
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        90-дневное окно поддержки
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                        Индивидуальные материалы под вас
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        Временный доступ к ПО для планирования
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-foreground mb-3">Примеры</h5>
                    <ul className="text-base text-muted-foreground space-y-3 leading-relaxed">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="break-words">Покупка жилья</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="break-words">Покупка, продажа, долгосрочная/краткосрочная аренда</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="break-words">Пенсионное планирование</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="break-words">Планирование крупных поступлений</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Recommendations */}
        <div className="mb-8 sm:mb-12" id="recommendations">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
            Комплексные услуги финансового планирования
          </h2>
          <p className="text-base text-muted-foreground mb-8 leading-relaxed">
            Наш целостный подход охватывает все аспекты вашей финансовой жизни. Ниже представлены ключевые области
            услуг, которые помогут вам достичь ваших целей. Нажмите на любую категорию, чтобы увидеть конкретные услуги.
          </p>

          <div className="space-y-6">
            {financialPlanningServices.map((category) => (
              <ServiceCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Fee Structure */}
        <Card className="mb-8 sm:mb-12" id="fees">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Стоимость инвестиций и планирования</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Наши тарифы продуманно структурированы для отражения ценности наших услуг и не подлежат обсуждению
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Структура тарифов</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Год 1 (включая онбординг)</span>
                    <span className="text-sm font-semibold">800 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Год 2+ ежегодная плата</span>
                    <span className="text-sm font-semibold">550 000 ₽</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Комиссия за управление активами</span>
                    <span className="text-sm font-semibold">0,90% AUM</span>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">Итого за Год 1:</span> 800 000 ₽ + 0,90% от активов
                    под управлением
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    <span className="font-semibold text-foreground">Последующие годы:</span> 550 000 ₽ ежегодно
                    + 0,90% AUM
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">График платежей</h4>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Ваша плата за Год 1 в размере 800 000 ₽ покрывает всё от онбординга до полного первого года
                  комплексного планирования. Мы выставляем счёт ежеквартально по 200 000 ₽, начиная с момента начала
                  сотрудничества. Комиссии за управление активами рассчитываются и списываются ежеквартально на основе
                  баланса вашего счёта.
                </p>
                <a
                  href="https://invoice.stripe.com/i/acct_1PEwj3K5hxtton4H/live_YWNjdF8xUEV3ajNLNWh4dHRvbjRILF9USEptT1RQTWJJYVNhQzNud3FxczRGdnBGZzRTaENTLDE1MTYxNTQxMw0200n7CPpSAc?s=db"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full min-h-[48px] text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                >
                  Оплатить первый взнос (200 000 ₽)
                </a>
              </div>
            </div>

            <div className="border-t pt-8">
              <h4 className="font-semibold text-foreground text-lg mb-6">Предлагаемые активы под управление</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">ETrade TOD</span>
                  <span className="text-sm font-semibold">29 400 000 ₽</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Rollover IRA (из старого 401(k))</span>
                  <span className="text-sm font-semibold">15 300 000 ₽</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Roth IRA</span>
                  <span className="text-sm font-semibold">900 000 ₽</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg border-2 border-dashed border-primary/30">
                  <span className="text-sm font-medium">PLTR RSU (обсуждается)</span>
                  <span className="text-sm font-semibold">32 000 000 ₽</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/40 mt-4">
                  <span className="text-base font-semibold text-foreground">Всего активов (без PLTR RSU)</span>
                  <span className="text-base font-bold text-foreground">45 600 000 ₽</span>
                </div>
                <p className="text-xs text-muted-foreground italic mt-4 leading-relaxed">
                  Примечание: PLTR RSU показаны отдельно, поскольку управление этими активами будет определено на основе
                  ваших предпочтений и наших обсуждений стратегии диверсификации акций.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Process */}
        <Card className="mb-8 sm:mb-12" id="onboarding">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Ваш путь онбординга</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Продуманный процесс, который превращает сложность в ясность под руководством экспертов, знающих вашу историю.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-10">
              {/* Phase 1 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 1</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Фундамент и диагностика</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Мы организуем ваши счета, соберём финансовые данные и создадим основу для вашего
                      персонализированного плана.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Christopher Haigh</span>
                      </div>
                      <span>-</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Stephanie Nemecheck</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Открытие и привязка счетов</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Сбор финансовых данных и документов</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Phase 2 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 2</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Разработка инвестиционной стратегии</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Мы создадим вашу персонализированную инвестиционную стратегию, оптимизируем размещение активов
                      и встроим налоговую эффективность с первого дня.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Jack Hills</span>
                      </div>
                      <span className="text-xs">Директор по инвестициям</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Разработка стратегии распределения активов</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Внедрение сбора налоговых убытков</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Оптимизация размещения активов по счетам</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Phase 3 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Receipt className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 3</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Налоговое и наследственное планирование</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Мы доработаем вашу налоговую стратегию, создадим основы наследственного планирования и обеспечим
                      защиту и целенаправленную структуру вашего капитала.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Gene Thompson</span>
                      </div>
                      <span className="text-xs">Директор по финансовому планированию</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Построение комплексной налоговой стратегии</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Руководство по основам наследственного планирования</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-primary/40 to-transparent"></div>
              </div>

              {/* Phase 4 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                      <Compass className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground font-semibold">Этап 4</Badge>
                      <h4 className="font-semibold text-foreground text-lg">Презентация плана и реализация</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Мы представим ваш полный финансовый план, разберём каждую рекомендацию и составим персональную
                      дорожную карту реализации.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">Обзор всей командой</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Обзор финализированного плана</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Составление дорожной карты реализации</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Callout Box */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-2xl p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-lg">Что вы получите в итоге</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      После онбординга у вас будет полный финансовый план, команда, знающая вашу историю, и ясный путь
                      вперёд - никакой перегрузки, только уверенность.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 sm:mb-12" id="next-steps">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Следующие шаги</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Готовы оптимизировать ваше финансовое будущее? Вот как мы двигаемся дальше.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Немедленные действия</h4>
                <ol className="space-y-4 text-base text-muted-foreground">
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5 font-semibold">
                      1
                    </span>
                    <span className="leading-relaxed">
                      Изучите это предложение и обсудите любые вопросы с Christopher
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5 font-semibold">
                      2
                    </span>
                    <span className="leading-relaxed">Подпишите договор и оплатите 200 000 ₽ за онбординг</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center mt-0.5 font-semibold">
                      3
                    </span>
                    <span className="leading-relaxed">
                      Назначьте вводную встречу со Stephanie для начала сбора данных
                    </span>
                  </li>
                </ol>
              </div>
              <div className="space-y-6">
                <h4 className="font-semibold text-foreground text-lg">Важные детали</h4>
                <div className="space-y-4 text-base text-muted-foreground">
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">
                      <span className="font-semibold text-foreground">Оплата счёта:</span> Оплатите по ссылке Stripe
                      выше или запросите реквизиты для банковского перевода
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">
                      <span className="font-semibold text-foreground">Договор:</span> Договор на финансовое
                      планирование будет отправлен через Adobe Sign для электронной подписи
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="leading-relaxed">
                      <span className="font-semibold text-foreground">Сроки:</span> Онбординг обычно занимает 4-6
                      недель от первого платежа до доставки финального плана
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="text-center space-y-3">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Это предложение действительно 30 дней и отражает наш анализ на основе информации, предоставленной
                  во время наших консультационных звонков с Шейном 15-18 октября 2025 года.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Подготовлено командой Meridian Wealth Partners - hello@example.com - 585-504-1616
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Дополнительные ресурсы</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Услуги и ресурсы с добавленной ценностью для наших клиентов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Monthly Newsletter */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Ежемесячная рассылка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Доступ к нашей ежемесячной клиентской рассылке, о которой некоторые клиенты говорят, что она
                    "сама по себе стоит наших услуг"
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: Discounts and Partners */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Скидки и партнёры</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Доступ к эксклюзивным скидкам и нашей сети проверенных партнёров, включая:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>- Monarch (бюджетирование)</li>
                    <li>- Cloaked (приватность)</li>
                    <li>- Encorestate Plans</li>
                    <li>- Sora Finance</li>
                    <li>- CardPointers</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Card 3: Client Communications */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Клиентские коммуникации</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    Будьте в курсе целевых обновлений по темам, которые важны для вас.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Рассылки с релевантными обновлениями, например{" "}
                    <span className="font-mono text-xs break-all">updates@example.com</span>
                  </p>
                </CardContent>
              </Card>

              {/* Card 4: Legal Information */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Юридическая информация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Meridian Wealth Partners LLC - зарегистрированный инвестиционный консультант, предоставляющий
                    консультационные услуги и работающий в штате Нью-Йорк.
                  </p>
                  <a
                    href="https://adviserinfo.sec.gov/firm/summary/310132"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:text-primary/80 underline leading-relaxed break-words"
                  >
                    Просмотреть Form ADV нашей компании
                  </a>
                </CardContent>
              </Card>

              {/* Card 5: Questions */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Вопросы?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Мы готовы ответить на любые вопросы и убедиться, что это партнёрство идеально соответствует вашим
                    целям и ценностям.
                  </p>
                  <a
                    href="mailto:hello@example.com"
                    className="inline-flex items-center justify-center w-full min-h-[40px] text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                  >
                    Напишите нам
                  </a>
                </CardContent>
              </Card>

              {/* Card 6: Blog */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Наш блог</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Читайте наши последние материалы о финансовом планировании, инвестиционных стратегиях и
                    комментарии к рынку.
                  </p>
                  <a
                    href="https://meridianwp.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full min-h-[40px] text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
                  >
                    Перейти в блог
                  </a>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
