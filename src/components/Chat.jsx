import { useParams } from "react-router-dom";

const Chat = () => {

    const {targetUserId} = useParams().targetUserId;
    console.log(targetUserId);
    
  return (
    <div>
        
    </div>
  )
}

export default Chat