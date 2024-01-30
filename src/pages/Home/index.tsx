import { HandPalm, Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInputContainer, SeparatorContainer, StartCountdownButton, StopCountdownButton, TaskInputContainer } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(1, 'mais de 5 minutos, por favor.')
    .max(60, '60min eh o maximo'),
})

/*interface NewCycleFormData {
    task: string
    minutesAmount: number
}*/

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptDate?: Date
    finishedDate?: Date
}

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, formState, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

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

    const activeCycle = cycles.find((cycle) => cycle.id == activeIdCycle)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    
    useEffect(() => {
        let interval: number

        if(activeCycle){
            
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if(secondsDifference >= totalSeconds){
                    setCycles((state) =>
                            state.map((cycle) => {
                            if(cycle.id == activeIdCycle){
                                return { ...cycle, finishedDate: new Date()}
                            } else {
                                return cycle
                            }
                        })
                    ) 
                    setAmountSecondsPassed(totalSeconds)
                    clearInterval(interval)
                } else {
                    setAmountSecondsPassed(secondsDifference)
                }
                
            }, 1000)
        }
        return () => {
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeIdCycle])

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

    
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    console.log(cycles)
    
    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInputContainer 
                        id="task" 
                        list="task-sugg"
                        placeholder="De um nome a sua task"
                        {...register('task')}
                        disabled={!!activeCycle}
                    />
                    <datalist id="task-sugg">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Projeto 4" />
                    </datalist>
                    

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInputContainer 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        step={5}
                        max={60}
                        min={1}
                        {...register('minutesAmount', { valueAsNumber: true })}
                        disabled={!!activeCycle}
                    />
                    <span>minutos.</span>
                </FormContainer>
                
                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <SeparatorContainer>:</SeparatorContainer>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

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

