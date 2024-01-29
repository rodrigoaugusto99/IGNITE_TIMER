import { HistoryContainer, HistoryList, StatusContainer } from "./styles";

export function History(){
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
                            <tr>
                                <td>tarefa</td>
                                <td>20 minutos</td>
                                <td>Ha 2 meses</td>
                                <td>
                                <StatusContainer statusColor="green">Concluido</StatusContainer>
                                </td>
                            </tr>
                            <tr>
                                <td>tarefa</td>
                                <td>20 minutos</td>
                                <td>Ha 2 meses</td>
                                <td>
                                <StatusContainer statusColor="green">Concluido</StatusContainer>
                                </td>
                            </tr>
                            <tr>
                                <td>tarefa</td>
                                <td>20 minutos</td>
                                <td>Ha 2 meses</td>
                                <td>
                                <StatusContainer statusColor="green">Concluido</StatusContainer>
                                </td>
                            </tr>
                            <tr>
                                <td>tarefa</td>
                                <td>20 minutos</td>
                                <td>Ha 2 meses</td>
                                <td>
                                <StatusContainer statusColor="yellow">Em andamento</StatusContainer>
                                </td>
                            </tr>
                            <tr>
                                <td>tarefa</td>
                                <td>20 minutos</td>
                                <td>Ha 2 meses</td>
                                <td>
                                <StatusContainer statusColor="red">Interrompido</StatusContainer>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </HistoryList>
            </HistoryContainer>
        </div>
    )
}