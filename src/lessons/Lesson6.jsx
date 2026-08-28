import { useState } from 'react'

const sampleAngles = [-45, 0, 30, 45, 60, 80, 90]

function Lesson6() {
  const [angleDeg, setAngleDeg] = useState(45)
  const size = 430
  const origin = size / 2
  const radius = 150
  const angle = angleDeg * Math.PI / 180
  const x = Math.cos(angle)
  const y = Math.sin(angle)
  const isVertical = Math.abs(x) < 1e-10
  const tangent = isVertical ? null : y / x
  const pointX = origin + x * radius
  const pointY = origin - y * radius
  const tangentY = tangent === null ? null : origin - tangent * radius
  const tangentVisible = tangentY !== null && tangentY > 20 && tangentY < size - 20

  return (
    <div className='lesson-container'>
      <header className='lesson-header'><span className='lesson-kicker'>السؤال المركزي</span><h2>6. كيف نقيس شدة الاتجاه، ولماذا يفشل القياس عند الخط العمودي؟</h2><p>لدينا زاوية ولدينا إحداثيات نقطة على دائرة الوحدة. نريد عددًا يجيب: كم نرتفع مقابل كل وحدة أفقية؟</p></header>
      <section className='story-grid'>
        <article className='story-card'><span className='story-step'>المشكلة</span><h3>الزاوية لا تشبه الارتفاع</h3><p>نحتاج رقمًا يقارن انحدار طريق أو سقف أو شعاع.</p></article>
        <article className='story-card'><span className='story-step'>الأداة السابقة</span><h3>الميل</h3><p>تعلمنا أن الميل هو العمودي ÷ الأفقي.</p></article>
        <article className='story-card'><span className='story-step'>الربط</span><h3>النسبة نفسها باسم جديد</h3><p>على دائرة الوحدة، العمودي sin والأفقي cos.</p></article>
      </section>
      <section className='derivation-card'><span className='story-step'>اشتقاق لا تعريف للحفظ</span><p>ميل الشعاع الواصل من الأصل إلى النقطة هو:</p><div className='formula-line' dir='ltr'>m = rise / run = y / x</div><p>ومن دائرة الوحدة نعرف أن <span dir='ltr'>y = sin(θ)</span> و<span dir='ltr'>x = cos(θ)</span>.</p><div className='formula-line' dir='ltr'>tan(θ) = m = sin(θ) / cos(θ)</div><p>إذن الظل هو الميل نفسه حين نصف الاتجاه بزاوية.</p></section>
      <aside className='thought-prompt'><strong>تنبّأ:</strong> كلما اقترب الشعاع من 90°، ماذا يحدث للأفقي cos وللنسبة sin/cos؟ لا تسمِّ الناتج «لانهاية» قبل التجربة.</aside>
      <section className='simulation-container'>
        <h3>المختبر: الزاوية والميل والخط المماس</h3>
        <p>حرّك الزاوية. المثلث يعرض الارتفاع والأفقي، والخط الأصفر مماس الدائرة عند (1,0).</p>
        <div className='interactive-area'>
          <div className='canvas-wrapper' style={{cursor:'default'}}><svg viewBox='0 0 430 430' className='lesson-svg' role='img' aria-label={'ميل شعاع عند زاوية ' + angleDeg + ' درجة'}>
            <rect width={size} height={size} fill='#12141c'/>
            <line x1='20' y1={origin} x2='410' y2={origin} stroke='rgba(255,255,255,.3)'/><line x1={origin} y1='20' x2={origin} y2='410' stroke='rgba(255,255,255,.3)'/>
            <circle cx={origin} cy={origin} r={radius} fill='none' stroke='rgba(255,255,255,.25)' strokeWidth='2'/>
            <line x1={origin+radius} y1='20' x2={origin+radius} y2='410' stroke='var(--warning-color)' strokeWidth='2' strokeDasharray='7'/>
            <polygon points={origin+','+origin+' '+pointX+','+origin+' '+pointX+','+pointY} fill='rgba(79,172,254,.14)'/>
            <line x1={origin} y1={origin} x2={pointX} y2={pointY} stroke='white' strokeWidth='3'/>
            <line x1={origin} y1={origin} x2={pointX} y2={origin} stroke='var(--accent-color)' strokeWidth='5'/>
            <line x1={pointX} y1={origin} x2={pointX} y2={pointY} stroke='var(--success-color)' strokeWidth='5'/>
            {tangentVisible && <><line x1={origin} y1={origin} x2={origin+radius} y2={tangentY} stroke='rgba(246,211,101,.6)' strokeDasharray='5'/><circle cx={origin+radius} cy={tangentY} r='6' fill='var(--warning-color)'/></>}
          </svg></div>
          <div className='controls-panel'><h3>غيّر الاتجاه</h3>
            <div className='control-group'><label htmlFor='tan-angle'>الزاوية: {angleDeg}°</label><input id='tan-angle' type='range' className='slider' min='-90' max='90' step='1' value={angleDeg} onChange={(event)=>setAngleDeg(Number(event.target.value))}/></div>
            <div className='value-display' dir='ltr'>x = cos θ = {Math.abs(x)<1e-10 ? '0' : x.toFixed(3)}</div>
            <div className='value-display' dir='ltr'>y = sin θ = {Math.abs(y)<1e-10 ? '0' : y.toFixed(3)}</div>
            <div className={isVertical ? 'value-display undefined-value' : 'value-display'} dir='ltr'>tan θ = {isVertical ? 'undefined' : tangent.toFixed(3)}</div>
            <div className='angle-buttons'>{sampleAngles.map((value)=><button key={value} type='button' className={angleDeg===value?'angle-button active':'angle-button'} onClick={()=>setAngleDeg(value)}>{value}°</button>)}</div>
          </div>
        </div>
        <p className='observation'>عند الخط الأصفر يكون الأفقي 1؛ لذلك ارتفاع نقطة التقاطع = الميل × 1 = tan(θ). من هذه الهندسة نفهم ارتباط اسم الظل بخط المماس.</p>
      </section>
      <section className='derivation-card'><span className='story-step'>الحالة التي تكشف المعنى</span><h3>لماذا ليس tan(90°) = ∞؟</h3><p>عند 90° يكون الأفقي صفرًا، فيطلب القانون قسمة 1 على 0، والقسمة على الصفر غير معرّفة. عند الاقتراب من 90° من اليسار تكبر القيم، لكن هذا وصف للاقتراب لا قيمة عند 90°.</p><div className='formula-line' dir='ltr'>tan(90°) = 1 / 0 → undefined</div><p>هندسيًا، الشعاع العمودي والخط المماس x=1 متوازيان؛ لذلك لا توجد نقطة تقاطع محدودة تمثل طول الظل.</p></section>
      <section className='quiz-section'><h3>اختبر الفهم</h3>
        <div className='question'><h4>أعد بناء العلاقة</h4><p>لماذا يساوي tan ميل الشعاع؟</p><details><summary>قارن تفسيرك</summary><p>الميل y/x، وعلى دائرة الوحدة y=sin وx=cos؛ لذلك الميل=sin/cos=tan.</p></details></div>
        <div className='question'><h4>فسّر الإشارة</h4><p>ماذا يعني ميل سالب في طريق أو خط؟</p><details><summary>قارن تفسيرك</summary><p>حين نتحرك يمينًا تهبط قيمة y بدل أن ترتفع؛ الإشارة تصف اتجاه التغير.</p></details></div>
        <div className='question'><h4>صحح الادعاء</h4><p>قال شخص: tan(90°) عدد لا نهائي. أين الخطأ؟</p><details><summary>قارن تفسيرك</summary><p>القيم تكبر عند الاقتراب من جهة، لكن عند 90° المقام صفر؛ لذلك القيمة غير معرّفة وليست عددًا لانهائيًا.</p></details></div>
      </section>
      <aside className='bridge-card'><strong>السؤال التالي:</strong> استعملنا الدرجات لقياس الدوران، لكن التفاضل والموجات يفضلان وحدة أخرى تنشأ من طول القوس نفسه. لماذا الراديان هو القياس الطبيعي؟</aside>
    </div>
  )
}

export default Lesson6
