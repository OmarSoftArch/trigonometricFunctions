import { useState } from 'react'

const angleChoices = [25, 35, 50]

function Lesson4() {
  const [scaleFactor, setScaleFactor] = useState(1.8)
  const [angleDeg, setAngleDeg] = useState(35)
  const angleRad = angleDeg * Math.PI / 180
  const smallHypotenuse = 3
  const largeHypotenuse = smallHypotenuse * scaleFactor
  const smallAdjacent = smallHypotenuse * Math.cos(angleRad)
  const smallOpposite = smallHypotenuse * Math.sin(angleRad)
  const largeAdjacent = largeHypotenuse * Math.cos(angleRad)
  const largeOpposite = largeHypotenuse * Math.sin(angleRad)
  const pixelScale = 48
  const originX = 55
  const originY = 315
  const toX = (value) => originX + value * pixelScale
  const toY = (value) => originY - value * pixelScale
  const points = (adjacent, opposite) => [originX + ',' + originY, toX(adjacent) + ',' + originY, toX(adjacent) + ',' + toY(opposite)].join(' ')

  return (
    <div className='lesson-container'>
      <header className='lesson-header'>
        <span className='lesson-kicker'>السؤال المركزي</span>
        <h2>4. كيف نصف اتجاهًا لا يتغير عندما يتغير الحجم؟</h2>
        <p>قد يختلف سلّمان في الطول لكنهما يميلان بالاتجاه نفسه. الأطوال وحدها لا تحفظ هذا المعنى؛ نحتاج عددًا يبقى ثابتًا حين نكبّر الشكل أو نصغّره.</p>
      </header>
      <section className='story-grid' aria-label='من المشكلة إلى الفكرة'>
        <article className='story-card'><span className='story-step'>المشكلة</span><h3>الحجم يتغير والاتجاه لا</h3><p>إذا ضاعفنا كل الأضلاع، كبر المثلث لكن شعاعه لم يَدُر.</p></article>
        <article className='story-card'><span className='story-step'>محاولة لا تكفي</span><h3>قياس ضلع واحد</h3><p>الارتفاع وحده لا يحدد الانحدار؛ نحتاج مقارنته بالأفقي.</p></article>
        <article className='story-card'><span className='story-step'>الفكرة الجديدة</span><h3>قارن بدل أن تعدّ</h3><p>النسبة بين طولين تزيل أثر التكبير وتحفظ هيئة المثلث.</p></article>
      </section>
      <aside className='thought-prompt'><strong>تنبّأ:</strong> إذا تضاعف المثلث، فهل تتضاعف «العمودي ÷ الوتر» أم تبقى كما هي؟</aside>
      <section className='simulation-container'>
        <h3>المختبر: مثلثان، زاوية واحدة</h3>
        <p>غيّر الحجم وراقب الأطوال والنِّسب معًا. الأزرق للصغير، والأصفر للمكبّر.</p>
        <div className='interactive-area'>
          <div className='canvas-wrapper' style={{ cursor: 'default' }}>
            <svg viewBox='0 0 460 350' className='lesson-svg' role='img' aria-label={'مثلثان قائمان بزاوية ' + angleDeg + ' درجة'}>
              <rect width='460' height='350' fill='#12141c' />
              <line x1='30' y1={originY} x2='430' y2={originY} stroke='rgba(255,255,255,.25)' />
              <polygon points={points(largeAdjacent, largeOpposite)} fill='rgba(246,211,101,.08)' stroke='var(--warning-color)' strokeWidth='3' />
              <polygon points={points(smallAdjacent, smallOpposite)} fill='rgba(79,172,254,.18)' stroke='var(--accent-color)' strokeWidth='3' />
              <circle cx={originX} cy={originY} r='5' fill='white' />
            </svg>
          </div>
          <div className='controls-panel'>
            <h3>غيّر الحجم</h3>
            <div className='control-group'>
              <label htmlFor='scale-factor'>عامل التكبير: ×{scaleFactor.toFixed(1)}</label>
              <input id='scale-factor' type='range' className='slider' min='1.2' max='2.6' step='0.1' value={scaleFactor} onChange={(event) => setScaleFactor(Number(event.target.value))} />
            </div>
            <div className='ratio-table' dir='ltr'>
              <div><span>small x/r</span><strong>{smallAdjacent.toFixed(2)} / 3 = {(smallAdjacent / smallHypotenuse).toFixed(3)}</strong></div>
              <div><span>large x/r</span><strong>{largeAdjacent.toFixed(2)} / {largeHypotenuse.toFixed(2)} = {(largeAdjacent / largeHypotenuse).toFixed(3)}</strong></div>
              <div><span>small y/r</span><strong>{smallOpposite.toFixed(2)} / 3 = {(smallOpposite / smallHypotenuse).toFixed(3)}</strong></div>
              <div><span>large y/r</span><strong>{largeOpposite.toFixed(2)} / {largeHypotenuse.toFixed(2)} = {(largeOpposite / largeHypotenuse).toFixed(3)}</strong></div>
            </div>
            <p className='observation'>تغيرت الأطوال، لكن النسبتين لم تتغيرا.</p>
          </div>
        </div>
        <div className='second-experiment'>
          <strong>غيّر الزاوية بعد اختبار الحجم:</strong>
          <div className='angle-buttons'>{angleChoices.map((angle) => <button key={angle} type='button' className={angleDeg === angle ? 'angle-button active' : 'angle-button'} onClick={() => setAngleDeg(angle)}>{angle}°</button>)}</div>
          <p>الحجم لا يغيّر النسبة، لكن الزاوية تغيّرها. إذن النسبة تحمل معلومة عن الزاوية نفسها.</p>
        </div>
      </section>
      <section className='derivation-card'>
        <span className='story-step'>لماذا يحدث ذلك؟</span>
        <h3>التشابه هو البرهان، لا الرسم</h3>
        <p>للمثلثين زاوية قائمة والزاوية الأخرى نفسها؛ لذلك هما متشابهان، وكل ضلع في الكبير يساوي نظيره مضروبًا في عامل واحد k.</p>
        <div className='formula-line' dir='ltr'>(k · opposite) / (k · hypotenuse) = opposite / hypotenuse</div>
        <p>يلغى عامل التكبير من النسبة. هذه هي العلة الرياضية لثباتها.</p>
      </section>
      <section className='quiz-section'>
        <h3>هل تستطيع إعادة بناء الفكرة؟</h3>
        <div className='question'><h4>فسّر، لا تحسب</h4><p>لماذا لا يكفي ارتفاع منحدر وحده لوصف شدته؟</p><details><summary>قارن تفسيرك</summary><p>لأن الارتفاع نفسه قد يحدث خلال امتداد أفقي قصير أو طويل؛ النسبة هي التي تحفظ الهيئة.</p></details></div>
        <div className='question'><h4>أعد الاشتقاق</h4><p>لماذا تصف 3/5 و6/10 الاتجاه نفسه؟</p><details><summary>قارن استدلالك</summary><p>كل طول تضاعف بالعامل نفسه، ثم أُلغي العامل عند القسمة، فبقيت النسبة.</p></details></div>
        <div className='question'><h4>متى تفشل الحجة؟</h4><p>ماذا يحدث إن ضاعفنا الارتفاع وحده؟</p><details><summary>قارن تفسيرك</summary><p>يتغير الشكل والزاوية؛ لأن الأضلاع لم تتغير بالعامل نفسه.</p></details></div>
      </section>
      <aside className='bridge-card'><strong>السؤال التالي:</strong> إذا كانت النِّسب ثابتة، فهل يجعل وتر طوله 1 هذه النسب إحداثيات مباشرة؟ هذا ما ستبنيه دائرة الوحدة.</aside>
    </div>
  )
}

export default Lesson4
