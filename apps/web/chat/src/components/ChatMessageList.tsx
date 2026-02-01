import clsx from 'clsx';
import { ChatStep } from '../app/app';
import { Plane, User } from 'lucide-react';
import { Button } from '@allorai/shared-ui';

type Props = {
  chat: ChatStep[];
  thinking: boolean;
  incrementStep: () => void;
};

const ChatMessageList = ({ chat, thinking, incrementStep }: Props) => {
  const currentStep = chat[chat.length - 1];

  return (
    <div className={clsx('flex flex-col-reverse h-full my-4')}>
      <div className="space-y-0.5">
        {chat.map((chatStep) => (
          <div key={chatStep.stepName} className="space-y-3">
            {chatStep.instructions && (
              <div className="flex py-2 mr-14 text-left items-end gap-2 ">
                <Plane
                  size={30}
                  className="mx-1 bg-[#3358ae] text-white rounded-full p-1 shrink-0"
                />
                <div className="p-6 text-left whitespace-normal bg-[#3358ae] text-white max-w-96 rounded-t-xl rounded-r-xl">
                  {chatStep.instructions}
                </div>
              </div>
            )}

            <div className="flex justify-end items-end gap-2">
              <div
                className={clsx(
                  `ml-14 mb-8 text-black self-center rounded-t-xl rounded-l-xl justify-end break-words w-auto max-w-[50%]`,
                  chatStep.stepName === 'Summary'
                    ? 'bg-[#99abd7]'
                    : currentStep.stepName === chatStep.stepName
                      ? 'bg-[#97dbd9]'
                      : 'bg-[#99abd7]',
                )}
              >
                <div className="p-6 text-left whitespace-normal">
                  {chatStep.form}
                </div>
              </div>
              {currentStep.stepName === chatStep.stepName ? (
                <div className="w-12">
                  <User
                    size={30}
                    className={clsx(
                      'text-black bg-[#97dbd9] rounded-full p-1 mx-1 shrink-0',
                    )}
                  />
                </div>
              ) : (
                <div className="w-12"></div>
              )}
            </div>

            {currentStep.stepName === chatStep.stepName && (
              <div className="flex justify-end items-end gap-2">
                <div className={`mr-14 self-center justify-end`}>
                  <Button disabled={thinking} onClick={incrementStep}>
                    {thinking ? '...Thinking' : 'Next Step'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessageList;

/*
<div style={{color: 'white'}} className={clsx("flex text-sm")}>
  <BouncingBalls color={"white"}/>
</div>

const BouncingBalls = ({ color = 'black' }: { color?: string }) => {
  return (
    <div className="bouncer pb-1.5 mx-1">
      <div style={{ background: color }}></div>
      <div style={{ background: color }}></div>
      <div style={{ background: color }}></div>
      <div style={{ background: color }}></div>
    </div>
  );
};
*/
