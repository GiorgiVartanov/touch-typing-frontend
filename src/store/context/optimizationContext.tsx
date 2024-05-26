import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import {
  OptimizationActions,
  OptimizationProgress,
  OptimizationState,
} from "../../types/optimization.types"
import {
  optimizationInitialState,
  optimizationProgressInitialState,
} from "../initial/optimizationInitialState"
import { useAuthStore } from "./authContext"
import { useSocket } from "../../hooks/useSocket"
import { Socket } from "socket.io-client"
import keyboardLayoutConverter from "../../util/keyboardLayoutConverter"
import { KeyInterface } from "../../types/keyboard.types"
import config from "../../keyboardLayouts/config.json"
import { defaultKeyboardLayout } from "../initial/typingSettingsInitialState"

const PYTHON_SERVER_URL = import.meta.env.VITE_PYTHON_SERVER_URL

interface ContextInterface extends OptimizationState, OptimizationActions {}

const OptimizationContext = createContext<ContextInterface>({} as ContextInterface)

export interface Props extends PropsWithChildren {}

export const OptimizationProvider: React.FunctionComponent<Props> = ({ children }: Props) => {
  const [optimizationState, setOptimizationState] =
    useState<OptimizationState>(optimizationInitialState)
  const { user, token } = useAuthStore()

  const socket = useSocket(PYTHON_SERVER_URL, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  })

  useEffect(() => {
    if (socket.connected) {
      socket.disconnect()
    }
    socket.connect()
    setSocket(socket)
    StartListeners()
    // SendHandshake()
  }, [user])

  const StartListeners = () => {
    socket.on("custom_event", (data: any) => {
      console.log(data)
    })

    socket.on("result", (data: any) => {
      console.log("result: ", data)
      setOptimizedEditingKeyboard(
        structuredClone(
          keyboardLayoutConverter(data.characters_set, defaultKeyboardLayout.Geo.keyboard)
        )
      )
      setOptimizationStatus(false)
      setProgress(optimizationProgressInitialState)
    })

    socket.on("progress", (data: OptimizationProgress) => {
      console.log("progress: ", data)
      setProgress(data)
    })
  }

  const setProgress = (data_progress: OptimizationProgress) => {
    setOptimizationState((prevOptimization) => ({
      ...prevOptimization,
      progress: data_progress,
    }))
  }

  const setSocket = (data_socket: Socket) => {
    setOptimizationState((prevOptimization) => ({
      ...prevOptimization,
      socket: data_socket,
    }))
  }

  const setOptimizationStatus = (data_optimizationStatus: boolean) => {
    setOptimizationState((prevOptimization) => ({
      ...prevOptimization,
      optimizationStatus: data_optimizationStatus,
    }))
  }

  const setOptimizedEditingKeyboard = (
    data_optimizedEditingKeyboard: KeyInterface[] | undefined
  ) => {
    setOptimizationState((prevOptimization) => ({
      ...prevOptimization,
      optimizedEditingKeyboard: data_optimizedEditingKeyboard,
    }))
  }

  const startOptimization = async () => {
    socket.emit("generate_keyboard_layout", config)
    setOptimizationStatus(true)
  }

  const store = {
    ...optimizationState,
    setProgress,
    setSocket,
    setOptimizationStatus,
    setOptimizedEditingKeyboard,
    startOptimization,
  }

  return <OptimizationContext.Provider value={store}>{children}</OptimizationContext.Provider>
}

export const useOptimizationStore = (): ContextInterface => {
  const context = useContext(OptimizationContext)
  if (!context) {
    throw new Error("useMetrics must be used within a MetricsProvider")
  }
  return context
}
