import { FormContainer, MinutesAmountInputContainer, TaskInputContainer } from "../../styles";

export function NewCycleForm() {
    return (
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
    )
}