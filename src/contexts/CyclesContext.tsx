import { ReactNode, createContext, useReducer, useState } from "react"


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
    //setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>
    dispatch: React.Dispatch<any>
    //setActiveIdCycle: React.Dispatch<React.SetStateAction<string | null>>
    amountSecondsPassed: number
    setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
    createNewCycle(data: CreateCycleData): void
    interruptCycle(): void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleContextProviderProps {
    children: ReactNode
}

interface CycleState{
    cycles: Cycle[]
    activeIdCycle: string | null
}

export function CycleContextProvider({ children } : CycleContextProviderProps) { 
    //const [cycles, setCycles] = useState<Cycle[]>([])
    const [cyclesState, dispatch] = useReducer((state: CycleState, action: any) => {
        if(action.type == 'ADD_NEW_CYCLE'){
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activeIdCycle: action.payload.newCycle.id
            }
        }

        if(action.type == 'INTERRUPT_CYCLE'){
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if(cycle.id == state.activeIdCycle){
                        return { ...cycle, interruptedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeIdCycle: null
            }
        }

        if(action.type == 'MARK_CYCLE_AS_FINISHED'){
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if(cycle.id == state.activeIdCycle){
                        return { ...cycle, finishedDate: new Date()}
                    } else {
                        return cycle
                    }
                }),
                activeIdCycle: null
            }
        }
        
        return state;
    }, {
        cycles: [],
        activeIdCycle: null,
    })
    //const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    const { cycles, activeIdCycle } = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id == activeIdCycle)

    function createNewCycle(data: CreateCycleData){
        const newCycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        //setCycles((state) => [...state, newCycle])
        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                newCycle
            }
        })
        //setActiveIdCycle(newCycle.id)
        setAmountSecondsPassed(0)
    }

    function interruptCycle() {
        dispatch({
            type: 'INTERRUPT_CYCLE',
            payload: {
                activeIdCycle
            }
        })
        /*setCycles((state) => 
                state.map((cycle) => {
                if(cycle.id == activeIdCycle){
                    return { ...cycle, interruptedDate: new Date()}
                } else {
                    return cycle
                }
            })
        )*/

        //setActiveIdCycle(null)
    }
    return (
        <CyclesContext.Provider 
                value={{
                    cycles,
                    activeCycle, 
                    activeIdCycle, 
                    dispatch, 
                    amountSecondsPassed,
                    setAmountSecondsPassed,
                    createNewCycle,
                    interruptCycle
                }}>
                    {children}
        </CyclesContext.Provider>
    )
}