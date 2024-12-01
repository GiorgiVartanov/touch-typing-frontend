import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"
import {
  OptimizationConfig,
  OptimizationActions,
  OptimizationProgress,
  OptimizationState,
  ProcessStatus,
  Analysis,
} from "../../types/optimization.types"
import {
  initialAnalysisEffort,
  optimizationInitialState,
  optimizationProgressInitialState,
} from "../initial/optimizationInitialState"
import { useAuthStore } from "./authContext"
import { useSocket } from "../../hooks/useSocket"
import { Socket } from "socket.io-client"
import { convertFromPythonApiLayoutToCurrent } from "../../util/keyboardLayoutConverter"
import { KeyInterface } from "../../types/keyboard.types"

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
  }, [user])

  const StartListeners = () => {
    socket.on("custom_event", (data: any) => {})

    socket.on("result", (data: any) => {
      setOptimizedEditingKeyboard(
        structuredClone(convertFromPythonApiLayoutToCurrent(data.characters_set))
      )
      setOptimizationStatus(ProcessStatus.process_idle)
      setProgress(optimizationProgressInitialState)
    })

    socket.on("progress", (data: OptimizationProgress) => {
      setProgress(data)
    })

    socket.on("initialization_start", () => {
      setOptimizationStatus(ProcessStatus.initialization_started)
    })

    socket.on("initialization_finish", (data_progress: OptimizationProgress) => {
      setOptimizationStatus(ProcessStatus.initialization_finished)
      setProgress(data_progress)
    })

    socket.on("analysis_start", () => {
      setAnalysis(initialAnalysisEffort)
    })

    socket.on("analysis_result", (data: Analysis) => {
      setAnalysis(data)
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

  const setOptimizationStatus = (data_optimizationStatus: ProcessStatus) => {
    setOptimizationState((prevOptimization) => ({
      ...prevOptimization,
      optimizationStatus: data_optimizationStatus,
    }))
  }

  const setAnalysis = (analysis: Analysis | undefined) => {
    setOptimizationState((prevOptimization) => ({
      ...prevOptimization,
      analysis: analysis,
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

  const startOptimization = async (optimization_config: OptimizationConfig) => {
    socket.emit("generate_keyboard_layout", optimization_config)
    setOptimizationStatus(ProcessStatus.process_idle)
  }

  const startAnalysis = async (optimization_config: OptimizationConfig) => {
    socket.emit("analyse_keyboard", optimization_config)
  }

  const store = {
    ...optimizationState,
    setProgress,
    setSocket,
    setOptimizationStatus,
    setOptimizedEditingKeyboard,
    startOptimization,
    setAnalysis,
    startAnalysis,
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
