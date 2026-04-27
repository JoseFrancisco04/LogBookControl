import { useParams } from "react-router-dom";

export const LaboratorySchedule = () => {
    const { labNumber } = useParams<{ labNumber: string }>();
    
    return (
        <div>Horario del laboratorio {labNumber}</div>
    )
}
