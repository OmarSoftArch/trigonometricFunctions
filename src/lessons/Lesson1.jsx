import { useState, useRef } from 'react';

const Lesson1 = () => {
  const [point, setPoint] = useState({ x: 3, y: 4 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);

  const gridSize = 20; // 20 units in x and y direction (from -10 to 10)
  const pixelSize = 400; // 400x400 pixels
  const scale = pixelSize / gridSize; // 20 pixels per unit

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePointPosition(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      updatePointPosition(e);
    }
  };

  const handlePointerUp = (e) => {
    e.target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const updatePointPosition = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const xPixel = e.clientX - rect.left;
    const yPixel = e.clientY - rect.top;

    // Convert pixel to math coordinates
    // Center is (0,0) -> (200, 200)
    let mathX = (xPixel - pixelSize / 2) / scale;
    let mathY = -(yPixel - pixelSize / 2) / scale; // Invert Y for standard math coordinates

    // Constrain to grid
    mathX = Math.max(-10, Math.min(10, mathX));
    mathY = Math.max(-10, Math.min(10, mathY));

    // Snap to nearest 0.5 for easier interaction
    mathX = Math.round(mathX * 2) / 2;
    mathY = Math.round(mathY * 2) / 2;

    setPoint({ x: mathX, y: mathY });
  };

  // Generate grid lines
  const gridLines = [];
  for (let i = -10; i <= 10; i++) {
    gridLines.push(
      <g key={`grid-${i}`}>
        {/* Vertical */}
        <line
          x1={i * scale + pixelSize / 2}
          y1={0}
          x2={i * scale + pixelSize / 2}
          y2={pixelSize}
          stroke={i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
          strokeWidth={i === 0 ? 2 : 1}
        />
        {/* Horizontal */}
        <line
          x1={0}
          y1={-i * scale + pixelSize / 2}
          x2={pixelSize}
          y2={-i * scale + pixelSize / 2}
          stroke={i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
          strokeWidth={i === 0 ? 2 : 1}
        />
      </g>
    );
  }

  const pointPixelX = point.x * scale + pixelSize / 2;
  const pointPixelY = -point.y * scale + pixelSize / 2;

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <span className="lesson-kicker">السؤال المركزي</span>
        <h2>1. كيف نصف مكانًا بحيث يستطيع شخص آخر العثور عليه؟</h2>
        <p>قولنا «النقطة هناك» يعتمد على المتكلم والمنظور. نريد وصفًا قابلًا للتكرار: مرجع ثابت، واتجاهان، وعددان يحددان الموقع.</p>
      </div>

      <section className="story-grid">
        <article className="story-card"><span className="story-step">المشكلة</span><h3>الوصف اللفظي غامض</h3><p>«قريب من الباب» يتغير بتغير الباب والمتكلم.</p></article>
        <article className="story-card"><span className="story-step">ما نحتاجه</span><h3>مرجع مشترك</h3><p>نختار أصلًا واتجاهين مستقلين، ثم نقيس الإزاحة عنهما.</p></article>
        <article className="story-card"><span className="story-step">الفكرة</span><h3>رقمان لمكان واحد</h3><p>الأول حركة أفقية، والثاني حركة عمودية، وترتيبهما جزء من المعنى.</p></article>
      </section>

      <div className="info-card">
        <strong>الفكرة الأساسية:</strong> المحور الأفقي يسمى <strong>x</strong> ويمثل الحركة يميناً ويساراً. المحور العمودي يسمى <strong>y</strong> ويمثل الحركة للأعلى والأسفل.
      </div>

      <aside className="thought-prompt"><strong>تنبّأ:</strong> هل تصف الإحداثيات المكان نفسه إذا نقلنا نقطة الأصل؟ جرّب أولًا تحريك النقطة وافصل بين «المكان» و«وصف المكان».</aside>
      <div className="simulation-container">
        <h3>محاكاة تفاعلية: حرّك النقطة واستكشف</h3>
        <p>اسحب النقطة الزرقاء ولاحظ كيف تتغير قيم x و y.</p>
        
        <div className="interactive-area">
          <div className="canvas-wrapper">
            <svg
              ref={svgRef}
              width={pixelSize}
              height={pixelSize}
              style={{ touchAction: 'none' }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Background */}
              <rect width={pixelSize} height={pixelSize} fill="#12141c" />
              
              {/* Grid Lines */}
              {gridLines}

              {/* X and Y labels */}
              <text x={pixelSize - 15} y={pixelSize / 2 - 10} fill="white" fontSize="14">x</text>
              <text x={pixelSize / 2 + 10} y={15} fill="white" fontSize="14">y</text>

              {/* Projection Lines */}
              <line 
                x1={pointPixelX} 
                y1={pixelSize / 2} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="var(--accent-color)" 
                strokeDasharray="4" 
                strokeWidth="2" 
                opacity="0.6"
              />
              <line 
                x1={pixelSize / 2} 
                y1={pointPixelY} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="var(--success-color)" 
                strokeDasharray="4" 
                strokeWidth="2" 
                opacity="0.6"
              />

              {/* Point */}
              <circle
                cx={pointPixelX}
                cy={pointPixelY}
                r={8}
                fill="var(--accent-color)"
                style={{ cursor: 'grab' }}
              />
              
              {/* Coordinates Label */}
              <text 
                x={pointPixelX + 12} 
                y={pointPixelY - 12} 
                fill="white" 
                fontSize="14"
                fontWeight="bold"
                direction="ltr"
              >
                ({point.x}, {point.y})
              </text>
            </svg>
          </div>

          <div className="controls-panel">
            <h3>الموقع الحالي</h3>
            <div className="control-group">
              <label>الإحداثي الأفقي (X):</label>
              <div className="value-display" style={{color: 'var(--accent-color)'}}>{point.x}</div>
              <p style={{fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)'}}>
                {point.x > 0 ? 'يمين المركز' : point.x < 0 ? 'يسار المركز' : 'على المركز الأفقي'}
              </p>
            </div>
            
            <div className="control-group">
              <label>الإحداثي العمودي (Y):</label>
              <div className="value-display" style={{color: 'var(--success-color)'}}>{point.y}</div>
              <p style={{fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--text-secondary)'}}>
                {point.y > 0 ? 'أعلى المركز' : point.y < 0 ? 'أسفل المركز' : 'على المركز العمودي'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-section">
        <h3>اختبر فهمك</h3>
        
        <div className="question">
          <h4>سؤال الفهم</h4>
          <p>ماذا يمثل الرقم الأول والرقم الثاني في الزوج (x, y)؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              الرقم الأول x يمثل المسافة الأفقية (يميناً أو يساراً)، والرقم الثاني y يمثل المسافة العمودية (أعلى أو أسفل) من نقطة الأصل (0,0).
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال الحساب</h4>
          <p>إذا تحركت نقطة من (2, 3) بمقدار 4 وحدات لليسار ووحدتين للأسفل، فما هي إحداثياتها الجديدة؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              4 وحدات لليسار تعني x - 4 = 2 - 4 = -2.<br/>
              وحدتين للأسفل تعني y - 2 = 3 - 2 = 1.<br/>
              الإحداثيات الجديدة هي (-2, 1).
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال تطبيق واقعي</h4>
          <p>في لعبة ثنائية الأبعاد، موقع اللاعب هو (5, 5). إذا أردت تحريكه لليمين لتجنب عقبة، هل ستزيد قيمة x أم y؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              ستزيد قيمة x. الحركة الأفقية (لليمين واليسار) يتحكم بها المحور x، بينما الحركة العمودية (أعلى وأسفل) يتحكم بها المحور y.
            </p>
          </details>
        </div>
      </div>
      <aside className="bridge-card"><strong>السؤال التالي:</strong> عرفنا أين تقع النقطة، لكن كيف نقيس الطريق المباشر إليها، وكيف نصف اتجاه هذا الطريق؟</aside>
    </div>
  );
};

export default Lesson1;
