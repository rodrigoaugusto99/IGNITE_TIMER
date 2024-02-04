import { useContext, useEffect, useState } from "react";
import { CountdownContainer, SeparatorContainer } from "../../styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function Countdown(){

    const { activeCycle, activeIdCycle, dispatch, amountSecondsPassed, setAmountSecondsPassed } = useContext(CyclesContext)
    

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    

    useEffect(() => {
        let interval: number

        if(activeCycle){
            
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)

                if(secondsDifference >= totalSeconds){
                    dispatch({
                        type: 'MARK_CYCLE_AS_FINISHED',
                        payload: {
                            activeIdCycle
                        }
                    })
                    /*setCycles((state) =>
                            state.map((cycle) => {
                            if(cycle.id == activeIdCycle){
                                return { ...cycle, finishedDate: new Date()}
                            } else {
                                return cycle
                            }
                        })
                    ) */
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
    }, [activeCycle, totalSeconds, activeIdCycle, setAmountSecondsPassed])
    
    return (
        <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <SeparatorContainer>:</SeparatorContainer>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>
    )
}