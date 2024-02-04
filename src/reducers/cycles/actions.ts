import { Cycle } from "./reducer";

export const enum ActionTypes{
    ADD_NEW_CYCLE =  'ADD_NEW_CYCLE',
    INTERRUPT_CYCLE =  'INTERRUPT_CYCLE',
    MARK_CYCLE_AS_FINISHED =  'MARK_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle){
    return {
        type: 'ADD_NEW_CYCLE',
        payload: {
            newCycle
        }
    }
}

export function interruptedCycleAction(){
    return {
        type: 'INTERRUPT_CYCLE',
    }
}

export function markCurrentCycleAsFinishedAction(){
    return {
        type: 'MARK_CYCLE_AS_FINISHED',
    }
}