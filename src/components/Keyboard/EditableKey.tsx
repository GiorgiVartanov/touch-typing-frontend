import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

import "./styles.scss"

import Key from "./Key"

interface Props {
  value: string | string[]
  id: string
  isPressed: boolean
  isEditable: boolean
  showBoth: boolean
  inUppercase: boolean
  isDraggingOver: boolean
  onDrop: () => void
  onDragStart: () => void
  onDragFinish: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  className?: string
}

const EditableKey = ({
  value,
  id,
  isPressed,
  isEditable,
  showBoth,
  inUppercase,
  onDrop,
  onDragStart,
  isDraggingOver,
  onDragFinish,
  onMouseEnter,
  onMouseLeave,
  className = "",
}: Props) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  // const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleStartDragging = () => {
    if (!isEditable) return

    setIsDragging(true)
    onDragStart()
  }

  const handleFinishDragging = () => {
    if (!isEditable) return

    setPosition({ x: 0, y: 0 })
    setIsDragging(false)
    onDrop()
    // onDragFinish()
  }

  const renderKeyValues = () => {
    if (typeof value === "string") return <div className="key-value">{value}</div>

    if (!showBoth) return <div className="key-value">{value[inUppercase ? 1 : 0]}</div>

    return value.map((key) => (
      <div
        className="key-value"
        key={key}
      >
        {key}
      </div>
    ))
  }

  const renderDraggedKey = () => {
    return createPortal(
      <Key
        value={value}
        id={id}
        isPressed={false}
        isActive={isEditable}
        showBoth={showBoth}
        inUppercase={false}
        className={`dragged-key ${className}`}
        style={{
          position: "absolute",
          left: position.x - 32,
          top: position.y - 32,
          zIndex: 100,
        }}
      />,
      document.querySelector(".App") || document.body
    )
  }

  useEffect(() => {
    const currentKey = ref.current
    if (currentKey) {
      const rect = currentKey.getBoundingClientRect()
      setPosition({ x: rect.left + 32, y: rect.top + 32 })
    }

    if (!isDragging) return

    const trackMouse = (event: MouseEvent) => {
      const mouseX = event.clientX
      const mouseY = event.clientY

      setPosition({ x: mouseX, y: mouseY })
    }

    document.addEventListener("mousemove", trackMouse)

    return () => document.removeEventListener("mousemove", trackMouse)
  }, [isDragging])

  return (
    <div
      ref={ref}
      onMouseDown={handleStartDragging}
      onMouseUp={handleFinishDragging}
      className={`key ${isEditable ? "editable-key" : ""} ${typeof value !== "string" && value.length > 1 ? `keys-${value.length}` : ""} ${isEditable ? "" : "inactive"} ${isPressed ? "pressed" : ""} ${inUppercase && typeof value !== "string" && value.length > 1 && showBoth ? "uppercase" : ""} ${className} ${isDragging ? "dragging" : ""} ${isDraggingOver ? "dragging-over" : null}`}
      onMouseEnter={() => {
        if (!isDragging) return
        onMouseEnter()
      }}
      onMouseLeave={() => {
        if (!isDragging) return
        onMouseLeave()
      }}
    >
      {isDragging ? renderDraggedKey() : renderKeyValues()}
    </div>
  )
}
export default EditableKey
