import React, { useState } from 'react';

const Lesson4 = () => {
  const [angleDeg, setAngleDeg] = useState(60);

  const pixelSize = 400;
  const originX = pixelSize / 2;
  const originY = pixelSize / 2;
  const radiusVisual = 150; // Visual radius for the unit circle (1 unit = 150px)

  // Math calculations
  const angleRad = (angleDeg * Math.PI) / 180;
  
  // In the unit circle, r = 1, so x = cos(theta), y = sin(theta)
  const cosValue = Math.cos(angleRad);
  const sinValue = Math.sin(angleRad);

  // Pixel coordinates for the point
  const pointPixelX = originX + cosValue * radiusVisual;
  const pointPixelY = originY - sinValue * radiusVisual; // Invert Y for SVG

  // Generate grid lines
  const gridLines = [];
  const gridCount = 4; // -2 to 2 with 0.5 steps
  const stepSize = radiusVisual / 2; // 0.5 units

  for (let i = -gridCount; i <= gridCount; i++) {
    gridLines.push(
      <g key={`grid-${i}`}>
        <line
          x1={originX + i * stepSize}
          y1={0}
          x2={originX + i * stepSize}
          y2={pixelSize}
          stroke={i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
          strokeWidth={i === 0 ? 2 : 1}
        />
        <line
          x1={0}
          y1={originY + i * stepSize}
          x2={pixelSize}
          y2={originY + i * stepSize}
          stroke={i === 0 ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)"}
          strokeWidth={i === 0 ? 2 : 1}
        />
        
        {/* Axis Labels */}
        {i !== 0 && i % 2 === 0 && (
          <>
            <text x={originX + i * stepSize + 5} y={originY + 15} fill="rgba(255,255,255,0.5)" fontSize="12">
              {i / 2}
            </text>
            <text x={originX - 25} y={originY - i * stepSize + 4} fill="rgba(255,255,255,0.5)" fontSize="12">
              {i / 2}
            </text>
          </>
        )}
      </g>
    );
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h2>4. الدائرة الوحدة (Unit Circle)</h2>
        <p>مرحباً بك في أهم مفهوم في حساب المثلثات! الدائرة الوحدة هي دائرة نصف قطرها يساوي <strong>1</strong> ومركزها نقطة الأصل. هذه الدائرة تحول الزوايا إلى إحداثيات يمكن قياسها.</p>
      </div>

      <div className="info-card">
        <strong>السر العظيم:</strong> لأن الوتر (نصف القطر) يساوي 1، فإن:
        <ul>
          <li><strong>الإسقاط الأفقي (x)</strong> هو مباشرة <strong>cos(θ)</strong>.</li>
          <li><strong>الإسقاط العمودي (y)</strong> هو مباشرة <strong>sin(θ)</strong>.</li>
        </ul>
        أي نقطة على الدائرة الوحدة تمتلك الإحداثيات <code>(cos θ, sin θ)</code>.
      </div>

      <div className="simulation-container">
        <h3>محاكاة تفاعلية: صانعة الـ Sin والـ Cos</h3>
        <p>غيّر الزاوية ولاحظ كيف يعبر الإسقاط الأفقي عن الكوساين (cos)، والإسقاط العمودي عن الساين (sin).</p>
        
        <div className="interactive-area">
          <div className="canvas-wrapper" style={{ cursor: 'default' }}>
            <svg width={pixelSize} height={pixelSize}>
              <rect width={pixelSize} height={pixelSize} fill="#12141c" />
              {gridLines}

              {/* The Unit Circle */}
              <circle
                cx={originX}
                cy={originY}
                r={radiusVisual}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
              />

              {/* Projection lines (dashed) */}
              {/* Vertical projection to X-axis (shows x / cos) */}
              <line 
                x1={pointPixelX} 
                y1={originY} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="var(--success-color)" 
                strokeWidth="2" 
                strokeDasharray="4"
              />
              {/* Horizontal projection to Y-axis (shows y / sin) */}
              <line 
                x1={originX} 
                y1={pointPixelY} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="var(--accent-color)" 
                strokeWidth="2" 
                strokeDasharray="4"
              />

              {/* Solid lines highlighting the values on the axes */}
              <line 
                x1={originX} 
                y1={originY} 
                x2={pointPixelX} 
                y2={originY} 
                stroke="var(--accent-color)" 
                strokeWidth="4" 
              />
              <line 
                x1={originX} 
                y1={originY} 
                x2={originX} 
                y2={pointPixelY} 
                stroke="var(--success-color)" 
                strokeWidth="4" 
              />

              {/* Rotating Ray */}
              <line 
                x1={originX} 
                y1={originY} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="#fff" 
                strokeWidth="2" 
              />

              {/* Ray Endpoint */}
              <circle
                cx={pointPixelX}
                cy={pointPixelY}
                r={6}
                fill="#fff"
              />
              
              {/* Origin Point */}
              <circle
                cx={originX}
                cy={originY}
                r={4}
                fill="white"
              />
            </svg>
          </div>

          <div className="controls-panel">
            <h3>القيم المثلثية</h3>
            
            <div className="control-group">
              <label>الزاوية (θ): {angleDeg}°</label>
              <input
                type="range"
                className="slider"
                min="0"
                max="360"
                step="1"
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
              />
            </div>

            <div className="control-group">
              <label>الإسقاط الأفقي (x)</label>
              <div className="value-display" style={{color: 'var(--accent-color)'}}>
                cos({angleDeg}°) = {cosValue.toFixed(3)}
              </div>
            </div>

            <div className="control-group">
              <label>الإسقاط العمودي (y)</label>
              <div className="value-display" style={{color: 'var(--success-color)'}}>
                sin({angleDeg}°) = {sinValue.toFixed(3)}
              </div>
            </div>

            <div className="control-group">
              <label>إحداثيات النقطة:</label>
              <p style={{fontFamily: 'monospace', fontSize: '1.2rem', marginTop: '0.5rem'}} dir="ltr">
                ({cosValue.toFixed(2)}, {sinValue.toFixed(2)})
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-section">
        <h3>اختبر فهمك</h3>
        
        <div className="question">
          <h4>سؤال الفهم</h4>
          <p>لماذا اختار علماء الرياضيات دائرة نصف قطرها 1 (دائرة الوحدة) وليس أي رقم آخر؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              لتسهيل الحسابات! الدالة sin هي (المقابل / الوتر). وبما أن الوتر (نصف القطر) هو 1، فإن القسمة على 1 لا تغير شيئاً، فيصبح sin هو المقابل (y) مباشرة. والشيء نفسه ينطبق على cos مع (x).
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال الحساب</h4>
          <p>عند الزاوية 90°، كم يتوقع أن تكون قيمة x (أو cos) وقيمة y (أو sin) بالنظر للمحاكاة؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              عند 90°، الشعاع يكون عمودياً للأعلى تماماً. قيمته على المحور الأفقي x هي 0، وقيمته على المحور العمودي y تصل لأقصاها وهي 1.
              إذن: cos(90°) = 0، و sin(90°) = 1.
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال تطبيق واقعي</h4>
          <p>إذا كنت تبرمج ذراع روبوت طولها متر واحد وتريدها أن تدور بزاوية θ لتلتقط شيئاً، كيف تحدد إحداثيات (x, y) لمكان يد الروبوت؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              ستستخدم الدائرة الوحدة مباشرة! إحداثيات اليد ستكون x = cos(θ) و y = sin(θ).
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Lesson4;
