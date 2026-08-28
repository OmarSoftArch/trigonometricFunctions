import { useState } from 'react'

function Lesson5() {
  const [angleDeg, setAngleDeg] = useState(60)
  const size = 420
  const origin = size / 2
  const radius = 155
  const angle = angleDeg * Math.PI / 180
  const x = Math.cos(angle)
  const y = Math.sin(angle)
  const pointX = origin + x * radius
  const pointY = origin - y * radius
  const clean = (value) => Math.abs(value) < 0.0005 ? 0 : value

  return (
    <div className='lesson-container'>
      <header className='lesson-header'><span className='lesson-kicker'>السؤال المركزي</span><h2>5. هل يمكن تحويل نسبة الزاوية إلى إحداثي مباشر؟</h2><p>أثبتنا أن النِّسب ثابتة ما دامت الزاوية ثابتة. لذلك نختار أبسط مثلث: وتره، أي نصف قطر دائرته، يساوي 1.</p></header>
      <section className='story-grid'>
        <article className='story-card'><span className='story-step'>المشكلة</span><h3>النسبة ليست طولًا</h3><p>في مثلث عام نقسم على الوتر كل مرة.</p></article>
        <article className='story-card'><span className='story-step'>الاختيار</span><h3>اجعل الوتر 1</h3><p>عندها تصبح القسمة على الوتر قسمة على 1.</p></article>
        <article className='story-card'><span className='story-step'>التعميم</span><h3>دع النقطة تدور</h3><p>الدائرة تشمل كل الاتجاهات، لا الزوايا الحادة فقط.</p></article>
      </section>
      <section className='derivation-card'><span className='story-step'>من النسبة إلى الاسم</span><div className='formula-line' dir='ltr'>cos(θ) = adjacent / hypotenuse = x / 1 = x</div><div className='formula-line' dir='ltr'>sin(θ) = opposite / hypotenuse = y / 1 = y</div><p>إذن إحداثيات النقطة هي <code dir='ltr'>(cos θ, sin θ)</code> بسبب اختيار نصف القطر 1، لا بسبب قاعدة سحرية.</p></section>
      <aside className='thought-prompt'><strong>تنبّأ:</strong> إذا وصل الشعاع إلى اليسار، فما إشارة الإحداثي الأفقي؟ وهل يبقى طوله 1؟</aside>
      <section className='simulation-container'><h3>المختبر: زاوية تتحول إلى إحداثيين</h3><p>الأزرق للإسقاط الأفقي، والفيروزي للعمودي.</p><div className='interactive-area'>
        <div className='canvas-wrapper' style={{cursor:'default'}}><svg viewBox='0 0 420 420' className='lesson-svg' role='img' aria-label={'دائرة الوحدة عند زاوية ' + angleDeg + ' درجة'}>
          <rect width={size} height={size} fill='#12141c'/><line x1='20' y1={origin} x2='400' y2={origin} stroke='rgba(255,255,255,.3)'/><line x1={origin} y1='20' x2={origin} y2='400' stroke='rgba(255,255,255,.3)'/>
          <circle cx={origin} cy={origin} r={radius} fill='none' stroke='rgba(255,255,255,.3)' strokeWidth='2'/>
          <line x1={origin} y1={origin} x2={pointX} y2={origin} stroke='var(--accent-color)' strokeWidth='5'/><line x1={origin} y1={origin} x2={origin} y2={pointY} stroke='var(--success-color)' strokeWidth='5'/>
          <line x1={origin} y1={origin} x2={pointX} y2={pointY} stroke='white' strokeWidth='3'/><circle cx={pointX} cy={pointY} r='7' fill='white'/>
        </svg></div>
        <div className='controls-panel'><h3>القيم</h3>
          <div className='control-group'><label htmlFor='unit-angle'>الزاوية: {angleDeg}°</label><input id='unit-angle' type='range' className='slider' min='0' max='360' step='1' value={angleDeg} onChange={(event)=>setAngleDeg(Number(event.target.value))}/></div>
          <div className='value-display' style={{color:'var(--accent-color)'}} dir='ltr'>cos = {clean(x).toFixed(3)}</div>
          <div className='value-display' style={{color:'var(--success-color)'}} dir='ltr'>sin = {clean(y).toFixed(3)}</div>
          <div className='value-display' dir='ltr'>√(x² + y²) = {Math.hypot(x,y).toFixed(3)}</div>
        </div>
      </div></section>
      <section className='quiz-section'><h3>اختبر البناء لا الحفظ</h3>
        <div className='question'><h4>لماذا الوحدة؟</h4><p>لماذا تجعل الوحدة النسبة مساوية للإحداثي؟</p><details><summary>قارن تفسيرك</summary><p>لأن القسمة على وتر طوله 1 لا تغير الإسقاط.</p></details></div>
        <div className='question'><h4>استنتج من المكان</h4><p>عند 180° ما إشارتا cos وsin؟</p><details><summary>قارن استدلالك</summary><p>النقطة (−1,0)، لذلك cos سالب وsin صفر.</p></details></div>
        <div className='question'><h4>حدود النموذج</h4><p>ذراع طولها متران: هل طرفها (cos θ, sin θ)؟</p><details><summary>قارن تفسيرك</summary><p>لا؛ نضرب الإحداثيين في الطول: (2cos θ, 2sin θ).</p></details></div>
      </section>
      <aside className='bridge-card'><strong>السؤال التالي:</strong> كيف تصبح «العمودي ÷ الأفقي» هي sin(θ)/cos(θ)، ولماذا تتعطل عند الاتجاه العمودي؟</aside>
    </div>
  )
}

export default Lesson5
