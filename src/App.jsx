import { useState } from 'react'
import Lesson1 from './lessons/Lesson1'
import Lesson2 from './lessons/Lesson2'
import Lesson3 from './lessons/Lesson3'
import Lesson4 from './lessons/Lesson4'
import Lesson5 from './lessons/Lesson5'
import Lesson6 from './lessons/Lesson6'

const lessons = [
  { id: 1, title: "1. لماذا نحتاج الإحداثيات؟" },
  { id: 2, title: "2. كيف نقيس المسافة والاتجاه؟" },
  { id: 3, title: "3. لماذا الزاوية دوران؟" },
  { id: 4, title: "4. لماذا تبقى النِّسب ثابتة؟" },
  { id: 5, title: "5. من النسبة إلى دائرة الوحدة" },
  { id: 6, title: "6. tan بوصفه ميلاً" },
  { id: 7, title: "7. لماذا نحتاج الراديان؟" },
  { id: 8, title: "8. الدورة والأرباع والإشارات" },
  { id: 9, title: "9. اشتقاق الزوايا الخاصة" },
  { id: 10, title: "10. كيف تولّد الدائرة موجة؟" },
  { id: 11, title: "11. استعادة الزاوية من نسبة" },
  { id: 12, title: "12. المتطابقات كأوصاف متعددة" },
  { id: 13, title: "13. القياس غير المباشر والموجات" },
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
      case 4:
        return <Lesson4 />
      case 5:
        return <Lesson5 />
      case 6:
        return <Lesson6 />
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
