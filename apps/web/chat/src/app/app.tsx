import { ReactNode, useState } from 'react';
import BudgetInstructions from '../components/instructions/BudgetInstructions';
import BudgetForm from '../components/forms/BudgetForm';
import ChatMessageList from '../components/ChatMessageList';
import clsx from 'clsx';
import FlightsForm from '../components/forms/FlightsForm';
import FlightInstructions from '../components/instructions/FlightInstructions';

// #3358ae dark
// #99abd7 light
// #97dbd9 teal

export type ChatStepName = 'Budget' | 'Flights' | 'Other';

export type ChatStep = {
  stepName: ChatStepName;
  instructions: ReactNode;
  form: ReactNode;
};

const BudgetChat: ChatStep = {
  stepName: 'Budget',
  instructions: <BudgetInstructions  />,
  form: <BudgetForm />,
};

const FlightsChat: ChatStep = {
  stepName: 'Flights',
  instructions: <FlightInstructions  />,
  form: <FlightsForm />,
};

const chatSteps= [BudgetChat, FlightsChat]

const ChatPage = () => {
  const [stepCount, setStepCount] = useState(1)
  const [thinking, setThinking] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      <div className={clsx('flex justify-between h-full flex-col')}>
        <ChatMessageList chat={chatSteps.slice(0,stepCount)} thinking={thinking} incrementStep={() => {
          setThinking(true)
          setTimeout(() => {
            setStepCount((prev) => prev + 1)
            setThinking(false)
          }, 1000)
        }} />
      </div>
    </div>
  );
};

export default ChatPage;
