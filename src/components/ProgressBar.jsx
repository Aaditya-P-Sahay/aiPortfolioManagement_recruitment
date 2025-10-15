export default function ProgressBar({ step }) {
  const progress = (step / 4) * 100

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  )
}
