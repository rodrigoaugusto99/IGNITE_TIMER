export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CycleState{
    cycles: Cycle[]
    activeIdCycle: string | null
}

export const enum ActionTypes{
    ADD_NEW_CYCLE =  'ADD_NEW_CYCLE',
    INTERRUPT_CYCLE =  'INTERRUPT_CYCLE',
    MARK_CYCLE_AS_FINISHED =  'MARK_CYCLE_AS_FINISHED',
}

export function cyclesReducer(state: CycleState, action: any){
    if(action.type == ActionTypes.ADD_NEW_CYCLE){
        return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeIdCycle: action.payload.newCycle.id
        }
    }

    if(action.type == ActionTypes.INTERRUPT_CYCLE){
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

    if(action.type == ActionTypes.MARK_CYCLE_AS_FINISHED){
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
}