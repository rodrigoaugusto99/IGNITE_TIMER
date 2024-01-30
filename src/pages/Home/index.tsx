import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInputContainer, SeparatorContainer, StarCountdownButton, TaskInputContainer } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useState } from "react";


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'mais de 5 minutos, por favor.')
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
}

export function Home(){

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
    const [amountMinutesPassed, setAmountMinutesPassed] = useState(0)

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
        }

        setCycles((state) => [...state, newCycle])
        setActiveIdCycle(newCycle.id)

        reset()
    }

    const activeCycle = cycles.find((cycle) => cycle.id == activeIdCycle)
    console.log(activeCycle)

    const task = watch('task')
    const isSubmitDisabled = !task

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountMinutesPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')
    
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
                        min={5}
                        {...register('minutesAmount', { valueAsNumber: true })}
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

                <StarCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Comecar
                </StarCountdownButton>
            </form>
        </HomeContainer>
    )
}

