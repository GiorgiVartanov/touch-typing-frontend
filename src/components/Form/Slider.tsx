import { useState, useCallback } from "react"
import { useTranslation } from "react-i18next"

interface Props {
  name: string
  minimalValue: number
  maximumValue: number
  step: number
  value: number
  onChange: (value: number) => void
}

const Slider = ({ name, minimalValue, maximumValue, step, value, onChange }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "keyboard" })

  return (
    <div className="slider-wrapper">
      <label htmlFor={name}>{name}</label>
      <div className="slider">
        <span>{t("Left")}</span>
        <div className="slider-value">
          <input
            id={name}
            name={name}
            type="range"
            min={minimalValue}
            max={maximumValue}
            step={step}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            data-value={value}
          />
          <div className="slider-marks">
            <span
              className={`${value <= 0.25 ? "nearest" : ""} ${value === 0 ? "exact" : ""}`}
              onClick={() => {
                onChange(0)
              }}
            >
              |
            </span>
            <span
              className={`${0.25 <= value && value < 0.75 ? "nearest" : ""} ${value === 0.5 ? "exact" : ""}`}
              onClick={() => {
                onChange(0.5)
              }}
            >
              |
            </span>
            <span
              className={`left-line ${0.75 <= value && value < 0.95 ? "nearest" : ""} ${value === 0.8 ? "exact" : ""}`}
              onClick={() => {
                onChange(0.8)
              }}
            >
              |
            </span>
            <span
              className={`${0.95 <= value && value < 1.1 ? "nearest" : ""} ${value === 1 ? "exact" : ""}`}
              onClick={() => {
                onChange(1)
              }}
            >
              |
            </span>
            <span
              className={`right-line ${1.1 <= value && value < 1.35 ? "nearest" : ""} ${value === 1.2 ? "exact" : ""}`}
              onClick={() => {
                onChange(1.2)
              }}
            >
              |
            </span>
            <span
              className={`${1.35 <= value && value < 1.75 ? "nearest" : ""} ${value === 1.5 ? "exact" : ""}`}
              onClick={() => {
                onChange(1.5)
              }}
            >
              |
            </span>
            <span
              className={`${value >= 1.75 ? "nearest" : ""} ${value === 2 ? "exact" : ""}`}
              onClick={() => {
                onChange(2)
              }}
            >
              |
            </span>
          </div>
        </div>
        <span>{t("Right")}</span>
      </div>
    </div>
  )
}

export default Slider
