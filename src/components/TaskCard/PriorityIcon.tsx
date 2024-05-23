import { FcHighPriority, FcLowPriority,FcMediumPriority } from "react-icons/fc";

const PriorityIcon = ({priority}:{priority: string}) => {
    return (
        <>
            {priority === 'low' && <FcLowPriority className="text-green-500" />}
            {priority === 'medium' && <FcMediumPriority className="text-yellow-500" />}
            {priority === 'high' && <FcHighPriority className="text-red-500" />}
        </>
    )
}


export default PriorityIcon