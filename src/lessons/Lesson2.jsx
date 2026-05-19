import React, { useState, useRef } from 'react';

const Lesson2 = () => {
  const [point, setPoint] = useState({ x: 6, y: 8 });
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef(null);

  const gridSize = 20; // 20 units in x and y direction (-10 to 10)
  const pixelSize = 400; // 400x400 pixels
  const scale = pixelSize / gridSize;

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

    let mathX = (xPixel - pixelSize / 2) / scale;
    let mathY = -(yPixel - pixelSize / 2) / scale;

    mathX = Math.max(-10, Math.min(10, mathX));
    mathY = Math.max(-10, Math.min(10, mathY));

    // Snap to 0.5 grid
    mathX = Math.round(mathX * 2) / 2;
    mathY = Math.round(mathY * 2) / 2;

    // Avoid setting exactly to 0,0 to prevent slope division by zero completely if desired,
    // but handling it in display is better.
    setPoint({ x: mathX, y: mathY });
  };

  const length = Math.sqrt(point.x * point.x + point.y * point.y).toFixed(2);
  const slope = point.x !== 0 ? (point.y / point.x).toFixed(2) : 'غير معرّف (خط عمودي)';

  const gridLines = [];
  for (let i = -10; i <= 10; i++) {
    gridLines.push(
      <g key={`grid-${i}`}>
        <line
          x1={i * scale + pixelSize / 2}
          y1={0}
          x2={i * scale + pixelSize / 2}
          y2={pixelSize}
          stroke={i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
          strokeWidth={i === 0 ? 2 : 1}
        />
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

  const originX = pixelSize / 2;
  const originY = pixelSize / 2;
  const pointPixelX = point.x * scale + originX;
  const pointPixelY = -point.y * scale + originY;

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h2>2. الطول والميل (Length and Slope)</h2>
        <p>الآن بعد أن عرفنا موقع النقطة، سنقيس المسافة بينها وبين نقطة الأصل (0,0)، ونحسب مدى انحدار الخط الواصل بينهما.</p>
      </div>

      <div className="info-card">
        <strong>قاعدة فيثاغورس:</strong> المسافة (الطول) تشكل وتراً لمثلث قائم الزاوية ضلعية x و y. لذلك الطول = جذر(x² + y²).
        <br/><br/>
        <strong>الميل (Slope):</strong> هو نسبة الارتفاع (y) إلى الامتداد الأفقي (x). الميل = y / x. وهو الذي سنسميه لاحقاً (tan).
      </div>

      <div className="simulation-container">
        <h3>محاكاة تفاعلية: المثلث القائم خلف كل نقطة</h3>
        <p>اسحب النقطة ولاحظ كيف يتغير طول الوتر (المسافة) والميل.</p>
        
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
              <rect width={pixelSize} height={pixelSize} fill="#12141c" />
              {gridLines}

              {/* Triangle Area Fill */}
              <polygon 
                points={`${originX},${originY} ${pointPixelX},${originY} ${pointPixelX},${pointPixelY}`}
                fill="rgba(79, 172, 254, 0.2)"
              />

              {/* X line (Adjacent) */}
              <line 
                x1={originX} 
                y1={originY} 
                x2={pointPixelX} 
                y2={originY} 
                stroke="var(--accent-color)" 
                strokeWidth="3" 
              />
              {/* Y line (Opposite) */}
              <line 
                x1={pointPixelX} 
                y1={originY} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="var(--success-color)" 
                strokeWidth="3" 
              />
              
              {/* Hypotenuse (Length) */}
              <line 
                x1={originX} 
                y1={originY} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="#fff" 
                strokeWidth="3" 
              />

              {/* Point */}
              <circle
                cx={pointPixelX}
                cy={pointPixelY}
                r={8}
                fill="#fff"
                style={{ cursor: 'grab' }}
              />
            </svg>
          </div>

          <div className="controls-panel">
            <h3>القياسات</h3>
            
            <div className="control-group">
              <label>الأفقي x (Run):</label>
              <div className="value-display" style={{color: 'var(--accent-color)'}}>{point.x}</div>
            </div>
            
            <div className="control-group">
              <label>العمودي y (Rise):</label>
              <div className="value-display" style={{color: 'var(--success-color)'}}>{point.y}</div>
            </div>

            <div className="control-group">
              <label>الطول (Length = √(x²+y²)):</label>
              <div className="value-display" style={{color: 'white'}}>{length}</div>
            </div>

            <div className="control-group">
              <label>الميل (Slope = y/x):</label>
              <div className="value-display" style={{color: 'var(--warning-color)'}}>{slope}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-section">
        <h3>اختبر فهمك</h3>
        
        <div className="question">
          <h4>سؤال الفهم</h4>
          <p>ماذا يحدث للميل إذا كانت قيمة y تساوي 0 (النقطة على المحور الأفقي)؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              يصبح الميل صفر (0 / x = 0). الخط يكون أفقياً تماماً ولا يوجد فيه أي انحدار.
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال الحساب</h4>
          <p>إذا كانت إحداثيات النقطة هي (3, 4)، فما هي المسافة بينها وبين نقطة الأصل؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              المسافة = √(3² + 4²) = √(9 + 16) = √25 = 5.
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال تطبيق واقعي</h4>
          <p>إذا كنت تصمم سلماً (درج)، وكان ارتفاع الدرجة (y) هو 20 سم، وعمقها (x) هو 30 سم. فما هو ميل هذا السلم؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              الميل = y / x = 20 / 30 = 0.66. هذا الميل يخبرنا بمدى انحدار السلم. في حساب المثلثات، هذا الرقم سيصبح الظل (tan) لزاوية انحدار السلم!
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Lesson2;
