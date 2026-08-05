export function BackgroundBlob({ colorType, top, left, size = 400 }: { colorType: 'blue' | 'yellow' | 'purple' | 'orange', top: string, left: string, size?: number }) {
  const colors = {
    blue: 'var(--accent-blue-bg)',
    yellow: 'var(--accent-yellow-bg)',
    purple: 'var(--accent-purple-bg)',
    orange: 'var(--accent-orange-bg)'
  };

  return (
    <div style={{
      position: 'absolute',
      top: top,
      left: left,
      width: `${size}px`,
      height: `${size}px`,
      background: colors[colorType],
      filter: 'blur(100px)',
      borderRadius: '50%',
      opacity: 0.4,
      zIndex: 0,
      pointerEvents: 'none',
      animation: 'float 8s ease-in-out infinite'
    }} />
  );
}