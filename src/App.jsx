import { useState } from 'react'
import Lesson1 from './lessons/Lesson1'
import Lesson2 from './lessons/Lesson2'
import Lesson3 from './lessons/Lesson3'

const lessons = [
  { id: 1, title: "1. الإحداثيات والمستوى (Cartesian Plane)" },
  { id: 2, title: "2. الطول والميل" },
  { id: 3, title: "3. معنى الزاوية كدوران" },
  { id: 4, title: "4. الدائرة الوحدة (Unit Circle)" },
  { id: 5, title: "5. العلاقة بين الدائرة والمثلث القائم" },
  { id: 6, title: "6. tan كميل" },
  { id: 7, title: "7. cot و sec و csc" },
  { id: 8, title: "8. القيم الخاصة للزوايا المشهورة" },
  { id: 9, title: "9. الأرباع والإشارات" },
  { id: 10, title: "10. الراديان" },
  { id: 11, title: "11. الرسوم البيانية للدوال" },
  { id: 12, title: "12. المتطابقات المثلثية" },
  { id: 13, title: "13. التطبيقات الواقعية" },
  { id: 14, title: "14. المرحلة المتقدمة (الموجات)" },
]

function App() {
  const [activeLesson, setActiveLesson] = useState(1)

  const renderLesson = () => {
    switch (activeLesson) {
      case 1:
        return <Lesson1 />
      case 2:
        return <Lesson2 />
      case 3:
        return <Lesson3 />
      default:
        return (
          <div className="info-card">
            <h3>قريباً...</h3>
            <p>هذا الدرس قيد التطوير. يرجى العودة لاحقاً!</p>
          </div>
        )
    }
  }

  return (
    <div className="app-container" dir="rtl">
      <div className="sidebar">
        <h1>أسرار حساب المثلثات</h1>
        <nav>
          {lessons.map(lesson => (
            <a 
              key={lesson.id}
              href="#" 
              className={`nav-link ${activeLesson === lesson.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                setActiveLesson(lesson.id)
              }}
            >
              {lesson.title}
            </a>
          ))}
        </nav>
      </div>
      <div className="main-content">
        {renderLesson()}
      </div>
    </div>
  )
}

export default App
