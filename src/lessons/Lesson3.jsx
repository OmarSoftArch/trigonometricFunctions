import React, { useState } from 'react';

const Lesson3 = () => {
  const [angleDeg, setAngleDeg] = useState(45);

  const gridSize = 20; // 20 units (-10 to 10)
  const pixelSize = 400;
  const scale = pixelSize / gridSize;
  const radius = 8; // length of the ray in math units

  // Convert angle to radians for math calculations
  const angleRad = (angleDeg * Math.PI) / 180;
  
  // Calculate endpoint of the ray
  const mathX = radius * Math.cos(angleRad);
  const mathY = radius * Math.sin(angleRad); // In standard math, up is positive y

  // Convert to pixel coordinates
  const originX = pixelSize / 2;
  const originY = pixelSize / 2;
  const pointPixelX = originX + mathX * scale;
  const pointPixelY = originY - mathY * scale; // Invert Y for SVG

  // Generate grid lines
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

  // Draw arc for the angle
  // To draw an arc in SVG, we use the path element
  // Arc path should start at (radius, 0) and go to (x, y)
  const arcRadius = 40; // pixel radius for the arc visualization
  const arcStartX = originX + arcRadius;
  const arcStartY = originY;
  const arcEndX = originX + arcRadius * Math.cos(angleRad);
  const arcEndY = originY - arcRadius * Math.sin(angleRad);
  
  // Determine if the arc is greater than 180 degrees (large arc flag)
  // Need to handle positive and negative angles properly for the path
  let pathD = '';
  if (angleDeg === 0 || angleDeg === 360 || angleDeg === -360) {
    if (angleDeg !== 0) {
      // Draw a full circle for 360 or -360
      pathD = `M ${originX + arcRadius} ${originY} A ${arcRadius} ${arcRadius} 0 1 0 ${originX - arcRadius} ${originY} A ${arcRadius} ${arcRadius} 0 1 0 ${originX + arcRadius} ${originY}`;
    }
  } else {
    const normalizedAngle = ((angleDeg % 360) + 360) % 360; // 0 to 360
    const largeArcFlag = normalizedAngle > 180 ? 1 : 0;
    const sweepFlag = angleDeg > 0 ? 0 : 1; // SVG y-axis is inverted
    
    // For negative angles, we draw from start to end, but the sweep direction changes
    let actualSweepFlag = angleDeg >= 0 ? 0 : 1;
    let actualLargeArcFlag = Math.abs(angleDeg) > 180 ? 1 : 0;

    pathD = `M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${actualLargeArcFlag} ${actualSweepFlag} ${arcEndX} ${arcEndY}`;
  }

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h2>3. معنى الزاوية كدوران (Angle as Rotation)</h2>
        <p>الزاوية ليست مجرد شكل هندسي جامد، بل هي <strong>حركة ودوران</strong>. تخيل أنك تقف في المركز وتنظر لليمين (محور x الموجب)، الزاوية هي مقدار دورانك من هذا الموضع.</p>
      </div>

      <div className="info-card">
        <strong>اتجاه الدوران:</strong>
        <ul>
          <li><strong>دوران موجب (+):</strong> عكس عقارب الساعة (لأعلى ثم لليسار).</li>
          <li><strong>دوران سالب (-):</strong> مع عقارب الساعة (لأسفل ثم لليسار).</li>
        </ul>
        الزاوية الصفرية (0°) تعني عدم الدوران، بينما 360° تعني دورة كاملة والعودة لنفس نقطة البداية.
      </div>

      <div className="simulation-container">
        <h3>محاكاة تفاعلية: عجلة القيادة</h3>
        <p>استخدم شريط التمرير (Slider) لتغيير الزاوية ولاحظ كيف يدور الشعاع.</p>
        
        <div className="interactive-area">
          <div className="canvas-wrapper" style={{ cursor: 'default' }}>
            <svg width={pixelSize} height={pixelSize}>
              <rect width={pixelSize} height={pixelSize} fill="#12141c" />
              {gridLines}

              {/* Angle Arc Visualization */}
              {angleDeg !== 0 && (
                <path
                  d={pathD}
                  fill="rgba(255, 8, 68, 0.2)"
                  stroke="var(--danger-color)"
                  strokeWidth="2"
                />
              )}

              {/* Initial reference line (x-axis) */}
              <line 
                x1={originX} 
                y1={originY} 
                x2={originX + radius * scale} 
                y2={originY} 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="2" 
                strokeDasharray="4"
              />

              {/* Rotating Ray */}
              <line 
                x1={originX} 
                y1={originY} 
                x2={pointPixelX} 
                y2={pointPixelY} 
                stroke="var(--accent-color)" 
                strokeWidth="4" 
                strokeLinecap="round"
              />

              {/* Ray Endpoint */}
              <circle
                cx={pointPixelX}
                cy={pointPixelY}
                r={6}
                fill="var(--success-color)"
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
            <h3>التحكم بالدوران</h3>
            
            <div className="control-group">
              <label>الزاوية (درجات): {angleDeg}°</label>
              <input
                type="range"
                className="slider"
                min="-360"
                max="360"
                step="1"
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
              />
              <div className="value-display" style={{color: 'var(--danger-color)'}}>
                {angleDeg}°
              </div>
            </div>

            <div className="control-group">
              <label>موقع رأس الشعاع:</label>
              <p style={{fontFamily: 'monospace', fontSize: '1.2rem', marginTop: '0.5rem'}} dir="ltr">
                ({mathX.toFixed(2)}, {mathY.toFixed(2)})
              </p>
            </div>

            <div className="control-group">
              <label>معلومات:</label>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                {angleDeg === 0 && 'الزاوية 0: البداية (على يمين المحور الأفقي).'}
                {angleDeg === 90 && 'الزاوية 90: ربع دورة للأعلى.'}
                {angleDeg === 180 && 'الزاوية 180: نصف دورة (نحو اليسار).'}
                {angleDeg === 270 && 'الزاوية 270: ثلاثة أرباع دورة (للأسفل).'}
                {angleDeg === 360 && 'الزاوية 360: دورة كاملة موجبة.'}
                {angleDeg === -90 && 'الزاوية -90: ربع دورة للأسفل (عكس عقارب الساعة).'}
              </p>
            </div>
            
            <button 
              className="btn" 
              style={{width: '100%'}}
              onClick={() => setAngleDeg(0)}
            >
              إعادة للصفر
            </button>
          </div>
        </div>
      </div>

      <div className="quiz-section">
        <h3>اختبر فهمك</h3>
        
        <div className="question">
          <h4>سؤال الفهم</h4>
          <p>ما الفرق بين الزاوية 90° والزاوية -270°؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              لا يوجد فرق في الموقع النهائي! الزاوية 90° تعني الدوران ربع دورة عكس عقارب الساعة، والزاوية -270° تعني الدوران ثلاثة أرباع الدورة مع عقارب الساعة. كلاهما يؤدي إلى نفس النقطة (المحور العمودي الأعلى).
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال الحساب</h4>
          <p>إذا كنت تواجه الزاوية 45°، ثم درت بمقدار 180° إضافية. في أي اتجاه (زاوية) ستكون الآن؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              الزاوية الجديدة = 45° + 180° = 225°. ستكون في الجهة المعاكسة تماماً (الربع الثالث).
            </p>
          </details>
        </div>

        <div className="question">
          <h4>سؤال تطبيق واقعي</h4>
          <p>في الألعاب ثنائية الأبعاد، لتوجيه مدفع نحو اليمين نستخدم الزاوية 0°. لتوجيهه نحو الأعلى نستخدم الزاوية 90°. ما الزاوية التي سنستخدمها لتوجيهه نحو اليسار؟</p>
          <details>
            <summary>أظهر الإجابة</summary>
            <p style={{marginTop: '0.5rem', color: 'var(--success-color)'}}>
              الزاوية 180° (أو -180°). لأنها تمثل نصف دورة من نقطة البداية (اليمين).
            </p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Lesson3;
