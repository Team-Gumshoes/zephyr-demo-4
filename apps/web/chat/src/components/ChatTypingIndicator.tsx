import clsx from "clsx"

type Props = {
  isTyping?: boolean,
  color?: string,
  content?: string,
  className?: string,
}

const ChatTypingIndicator = ({isTyping = true, color = "black", content = "", className}: Props) => {

  if(!isTyping) return null

  return (
    <div style={{color: color}} className={clsx("flex text-sm gap-1", className)}>
      <BouncingBalls color={color}/>
      {content}
    </div>
  )
}


const BouncingBalls = ({color = "black"}:{color?: string}) => {
  
  return (
    <div className='bouncer pb-1.5 mx-1'>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
    </div>
  )
}

export default ChatTypingIndicator