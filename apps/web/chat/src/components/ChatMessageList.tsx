import { useState } from 'react';
import clsx from 'clsx';
import { ChatStep } from '../app/app';
import { Plane, User, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button, Modal } from '@allorai/shared-ui';

type Props = {
  chat: ChatStep[];
  thinking: boolean;
  incrementStep: () => void;
  decrementStep: () => void;
  validationError?: string;
};

const ChatMessageList = ({
  chat,
  thinking,
  incrementStep,
  decrementStep,
  validationError,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentStep = chat[chat.length - 1];
  const isFirstStep = chat.length === 1;

  console.log('ChatMessageList debug:', {
    chatLength: chat.length,
    isFirstStep,
    currentStepName: currentStep?.stepName,
  });

  const handleModifyDetails = () => {
    setIsModalOpen(true);
  };

  const handleGoBack = () => {
    setIsModalOpen(false);
    decrementStep();
  };

  const handleOpenChat = () => {
    setIsModalOpen(false);
    // TODO: Implement chat functionality
    console.log('Open chat for more options');
  };

  return (
    <>
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

              <div
                className={clsx(
                  `flex items-end gap-2`,
                  chatStep.stepName === 'Summary'
                    ? 'justify-center'
                    : 'justify-end',
                )}
              >
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
                <div className="flex justify-end gap-2">
                  <div className={`flex flex-col items-end mr-14 justify-end`}>
                    <div className="flex gap-2">
                      {!isFirstStep && (
                        <Button
                          disabled={thinking}
                          onClick={handleModifyDetails}
                          variant="secondary"
                        >
                          Modify Details
                        </Button>
                      )}
                      <Button disabled={thinking} onClick={incrementStep}>
                        {thinking ? '...Thinking' : 'Next Step'}
                      </Button>
                    </div>
                    {validationError && (
                      <div className="text-red-600 font-semibold mt-2">
                        {validationError}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Modify Details"
      >
        <p className="text-gray-600 mb-6">
          How would you like to modify your trip details?
        </p>
        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
          >
            <ArrowLeft size={24} className="text-[#3358ae]" />
            <div>
              <div className="font-semibold text-gray-900">
                Return to Previous Step
              </div>
              <div className="text-sm text-gray-500">
                Go back and change your previous selection
              </div>
            </div>
          </button>
          <button
            onClick={handleOpenChat}
            className="w-full flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors text-left"
          >
            <MessageCircle size={24} className="text-[#3358ae]" />
            <div>
              <div className="font-semibold text-gray-900">
                Chat for More Options
              </div>
              <div className="text-sm text-gray-500">
                Tell us what you're looking for
              </div>
            </div>
          </button>
        </div>
      </Modal>
    </>
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
