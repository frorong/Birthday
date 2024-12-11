// Magic Particle Effect Worklet
class MagicParticlePainter {
  static get inputProperties() {
    return ["--animation-offset"];
  }

  paint(ctx, size, properties) {
    const offset = parseInt(properties.get("--animation-offset"), 10) || 0;
    const slowOffset = offset * 0.05;

    // 캔버스 초기화
    ctx.clearRect(0, 0, size.width, size.height);

    // 더 재미있는 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, size.width, size.height);
    gradient.addColorStop(
      0,
      `hsla(${(slowOffset * 3 + 280) % 360}, 80%, 85%, ${
        Math.sin(slowOffset * 0.2) * 0.2 + 0.3
      })`
    );
    gradient.addColorStop(
      0.5,
      `hsla(${(slowOffset * 4 + 180) % 360}, 70%, 80%, ${
        Math.cos(slowOffset * 0.15) * 0.15 + 0.25
      })`
    );
    gradient.addColorStop(
      1,
      `hsla(${(slowOffset * 5 + 330) % 360}, 90%, 90%, ${
        Math.sin(slowOffset * 0.25) * 0.2 + 0.3
      })`
    );
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size.width, size.height);

    // 더 장난스러운 파티클 생성
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      const noiseX =
        Math.sin(i * 0.2 + slowOffset * 0.3) * Math.cos(slowOffset * 0.1);
      const noiseY =
        Math.cos(i * 0.2 + slowOffset * 0.4) * Math.sin(slowOffset * 0.1);

      const bounceX = Math.sin(slowOffset * 0.2) * 30;
      const bounceY = Math.cos(slowOffset * 0.2) * 30;

      const x =
        size.width / 2 +
        Math.sin(slowOffset * 0.15 + i) * size.width * 0.45 * noiseX +
        bounceX;
      const y =
        size.height / 2 +
        Math.cos(slowOffset * 0.2 + i) * size.height * 0.45 * noiseY +
        bounceY;

      const wobble = Math.sin(slowOffset * 0.3 + i) * 10;
      const size1 =
        Math.abs(Math.sin(slowOffset * 0.15 + i * 0.5)) * 20 + wobble;
      const size2 =
        Math.abs(Math.cos(slowOffset * 0.15 + i * 0.5)) * 20 + wobble;

      ctx.beginPath();
      ctx.ellipse(x, y, size1, size2, slowOffset * 0.2 + i, 0, Math.PI * 2);

      const hue = (280 + slowOffset * 3 + i * 25) % 360;
      const alpha = Math.sin(slowOffset * 0.1 + i) * 0.3 + 0.4;
      ctx.fillStyle = `hsla(${hue}, 85%, 75%, ${alpha})`;
      ctx.fill();
    }

    // 더 활발한 중심 효과
    const burstCount = 16;
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;
      const pulseDistance = Math.sin(slowOffset * 0.3) * 120 + 80;
      const twistOffset = Math.sin(slowOffset * 0.1) * Math.PI * 0.25;

      const x =
        size.width / 2 +
        Math.cos(angle + slowOffset * 0.2 + twistOffset) * pulseDistance;
      const y =
        size.height / 2 +
        Math.sin(angle + slowOffset * 0.2 + twistOffset) * pulseDistance;

      ctx.beginPath();
      ctx.moveTo(size.width / 2, size.height / 2);

      // 더 구불구불한 선
      const points = 8;
      for (let j = 0; j <= points; j++) {
        const t = j / points;
        const wobble = Math.sin(slowOffset * 0.4 + i + j * 2) * 30;
        const spiral = t * Math.sin(slowOffset * 0.1) * 20;
        const currX =
          size.width / 2 +
          (x - size.width / 2) * t +
          wobble +
          Math.cos(t * Math.PI * 2) * spiral;
        const currY =
          size.height / 2 +
          (y - size.height / 2) * t +
          wobble +
          Math.sin(t * Math.PI * 2) * spiral;

        ctx.lineTo(currX, currY);
      }

      const hue = (330 + slowOffset * 2 + i * 40) % 360;
      ctx.strokeStyle = `hsla(${hue}, 90%, 75%, ${
        Math.sin(slowOffset * 0.2 + i) * 0.3 + 0.4
      })`;
      ctx.lineWidth = Math.sin(slowOffset * 0.15 + i) * 3 + 3;
      ctx.stroke();
    }
  }
}

if (typeof registerPaint !== "undefined") {
  let frameCount = 0;

  function animate() {
    frameCount += 0.7; // 애니메이션 속도 증가
    document.documentElement.style.setProperty(
      "--animation-offset",
      frameCount.toString()
    );
    requestAnimationFrame(animate);
  }

  registerPaint("magic-particle-effect", MagicParticlePainter);
  animate();
}
