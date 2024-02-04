import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, StatusContainer } from "./styles";
import { formatDistanceToNow } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

export function History(){

    const { cycles } = useContext(CyclesContext)
    return (
        <div>
            <HistoryContainer>
                <h1>Meu historico</h1>
                <HistoryList>
                    <table>
                        <thead>
                            <th>tarefa</th>
                            <th>duracao</th>
                            <th>inicio</th>
                            <th>status</th>
                        </thead>   
                        <tbody>
                        {cycles.map((cycle) => {
                                return (
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(cycle.startDate, {
                                            addSuffix: true,
                                            locale: ptBr,
                                        })}</td>
                                        <td>
                                        {cycle.finishedDate && (<StatusContainer statusColor="green">Concluido</StatusContainer>)}
                                        {cycle.interruptedDate && (<StatusContainer statusColor="red">Interrompido</StatusContainer>)}
                                        {(!cycle.finishedDate && !cycle.interruptedDate) && (<StatusContainer statusColor="yellow">Em andamento</StatusContainer>)}
                                        </td>
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                    </table>
                </HistoryList>
            </HistoryContainer>
        </div>
    )
}