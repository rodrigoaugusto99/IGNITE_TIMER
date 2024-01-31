import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInputContainer, SeparatorContainer, StartCountdownButton, StopCountdownButton, TaskInputContainer } from "./styles";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
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
    setActiveIdCycle: React.Dispatch<React.SetStateAction<string | null>>
    amountSecondsPassed: number
    setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>
}

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(1, 'mais de 5 minutos, por favor.')
    .max(60, '60min eh o maximo'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export const CyclesContext = createContext({} as CyclesContextType)

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
    
    function handleCreateNewCycle(data: NewCycleFormData){
        
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
    }

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const { register, handleSubmit, watch, formState, reset} = newCycleForm
    

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

    const task = watch('task')
    const isSubmitDisabled = !task

    
    
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <CyclesContext.Provider 
                value={{
                    activeCycle, 
                    activeIdCycle, 
                    setCycles, 
                    setActiveIdCycle, 
                    amountSecondsPassed,
                    setAmountSecondsPassed
                }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    
                    <Countdown />
                </CyclesContext.Provider>
                
                

                { activeCycle ? (
                    <StopCountdownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24}/>
                        Comecar
                    </StartCountdownButton>
                )
               
                }

                
            </form>
        </HomeContainer>
    )
}

