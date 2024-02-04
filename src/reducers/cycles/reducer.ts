import { ActionTypes } from "./actions"
import { produce } from 'immer'

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


export function cyclesReducer(state: CycleState, action: any){
    if(action.type == ActionTypes.ADD_NEW_CYCLE){
        // return {
        //     ...state,
        //     cycles: [...state.cycles, action.payload.newCycle],
        //     activeIdCycle: action.payload.newCycle.id
        // }

        return produce(state, draft => {
            draft.cycles.push(action.payload.newCycle)
            draft.activeIdCycle = action.payload.newCycle.id
        })
    }

    if(action.type == ActionTypes.INTERRUPT_CYCLE){
        // return {
        //     ...state,
        //     cycles: state.cycles.map((cycle) => {
        //         if(cycle.id == state.activeIdCycle){
        //             return { ...cycle, interruptedDate: new Date()}
        //         } else {
        //             return cycle
        //         }
        //     }),
        //     activeIdCycle: null
        // }

        const currentCycleIndex = state.cycles.findIndex(cycle => {
            return cycle.id == state.activeIdCycle
        })

        if (currentCycleIndex < 0){
            return state
        }
        return produce(state, (draft) => {
            draft.activeIdCycle = null
            draft.cycles[currentCycleIndex].interruptedDate = new Date()
        })
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

export { ActionTypes }
