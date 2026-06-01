"use client"

interface DownloadCVButtonProps {
  fileName?: string
  label?: string
}

export default function DownloadCVButton({
  fileName = "CV-Evan.pdf",
  label = "Voir CV",
}: DownloadCVButtonProps) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = `/${fileName}`
    link.download = fileName
    link.click()
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="flex items-center justify-between bg-white hover:bg-white/90 text-black rounded-full px-6 py-3.5 text-sm font-semibold transition-colors group cursor-pointer"
    >
      {label}
      <span className="w-8 h-8 bg-(--red) rounded-full flex items-center justify-center ml-6 text-white text-base shrink-0">
        ↓
      </span>
    </button>
  )
}
