import { HandPalm, Play } from "phosphor-react";
import { HomeContainer,  StartCountdownButton, StopCountdownButton } from "./styles";
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { createContext, useContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";





const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(1, 'mais de 5 minutos, por favor.')
    .max(60, '60min eh o maximo'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>



export function Home(){

    const {activeCycle, createNewCycle, interruptCycle} = useContext(CyclesContext)
    
   

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm
    
    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    
                    <Countdown />
                { activeCycle ? (
                    <StopCountdownButton onClick={interruptCycle} type="button">
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

