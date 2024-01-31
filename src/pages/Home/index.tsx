import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInputContainer, SeparatorContainer, StartCountdownButton, StopCountdownButton, TaskInputContainer } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";




/*interface NewCycleFormData {
    task: string
    minutesAmount: number
}*/



interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

//quais informacoes vou ter no contexto?
interface CyclesContextType{
    activeCycle: Cycle | undefined
    activeIdCycle: string | null
    setCycles: React.Dispatch<React.SetStateAction<Cycle[]>>
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
    

    /*function handleCreateNewCycle(data: NewCycleFormData){
        
        const newCycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...state, newCycle])
        setActiveIdCycle(newCycle.id)
        setAmountSecondsPassed(0)

        reset()
    }*/

    const activeCycle = cycles.find((cycle) => cycle.id == activeIdCycle)



    function handleInterruptCycle() {
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

    //const task = watch('task')
    //const isSubmitDisabled = !task

    
    

    console.log(cycles)
    
    return (
        <HomeContainer>
            <form /*onSubmit={handleSubmit(handleCreateNewCycle)}*/>
                <CyclesContext.Provider value={{activeCycle, activeIdCycle, setCycles}}>
                    <NewCycleForm />
                    <Countdown />
                </CyclesContext.Provider>
                
                

                { activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton /*disabled={isSubmitDisabled}*/ type="submit">
                        <Play size={24}/>
                        Comecar
                    </StartCountdownButton>
                )
               
                }

                
            </form>
        </HomeContainer>
    )
}

