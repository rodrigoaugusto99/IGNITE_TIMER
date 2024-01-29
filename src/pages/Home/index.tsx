import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInputContainer, SeparatorContainer, StarCountdownButton, TaskInputContainer } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'


const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'mais de 5 minutos, por favor.')
    .max(60, '60min eh o maximo'),
})


export function Home(){

    const { register, handleSubmit, watch, formState} = useForm({
        resolver: zodResolver(newCycleFormValidationSchema)
    })

    function handleCreateNewCycle(data: any){
        console.log(data)
    }

    console.log(formState.errors)

    const task = watch('task')
    const isSubmitDisabled = !task
    
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
                    <span>0</span>
                    <span>0</span>
                    <SeparatorContainer>:</SeparatorContainer>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StarCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Comecar
                </StarCountdownButton>
            </form>
        </HomeContainer>
    )
}
