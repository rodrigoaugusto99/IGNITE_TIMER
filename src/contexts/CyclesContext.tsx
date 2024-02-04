import { ReactNode, createContext, useState } from "react"


interface CreateCycleData {
    task: string
    minutesAmount: number
}
interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CyclesContextType{
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeIdCycle: string | null
    setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>
    setActiveIdCycle: React.Dispatch<React.SetStateAction<string | null>>
    amountSecondsPassed: number
    setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
    createNewCycle(data: CreateCycleData): void
    interruptCycle(): void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProviderProps {
    children: ReactNode
}

export function CycleContextProvider({ children } : CycleContextProviderProps) { 
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id == activeIdCycle)

    function createNewCycle(data: CreateCycleData){
        const newCycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle])
        setActiveIdCycle(newCycle.id)
        setAmountSecondsPassed(0)

        //reset()
    }

    function interruptCycle() {
        setCycles((state) => 
                state.map((cycle) => {
                if(cycle.id == activeIdCycle){
                    return { ...cycle, interruptedDate: new Date()}
                } else {
                    return cycle
                }
            })
        )

        setActiveIdCycle(null)
    }
    return (
        <CyclesContext.Provider 
                value={{
                    cycles,
                    activeCycle, 
                    activeIdCycle, 
                    setCycles, 
                    setActiveIdCycle, 
                    amountSecondsPassed,
                    setAmountSecondsPassed,
                    createNewCycle,
                    interruptCycle
                }}>
                    {children}
        </CyclesContext.Provider>
    )
}