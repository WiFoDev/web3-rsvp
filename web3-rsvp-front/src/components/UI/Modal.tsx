import {Ring} from "@uiball/loaders";
import {FC} from "react";
import Link from "next/link";

import {Portal} from "@/HOC";

type ModalProps = {
  isLoading?: boolean;
  isSuccess?: boolean;
  eventID?: string;
};

export const Modal: FC<ModalProps> = ({
  isLoading,
  isSuccess,
  eventID,
}) => {
  return (
    <Portal>
      <div className="fixed inset-0 z-30 grid w-full h-full backdrop-blur-sm place-items-center">
        <div className="bg-white w-[40rem] h-96 rounded-lg flex flex-col items-center justify-center gap-10">
          <div className="transition-all duration-300">
            {isLoading && (
              <Ring
                color="black"
                lineWeight={5}
                size={56}
                speed={2}
              />
            )}
            {isSuccess && (
              <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          <p className="text-2xl font-semibold text-background">
            {isLoading
              ? "Creating Event..."
              : "Event created sucessfully"}
          </p>
          {eventID && (
            <div className="underline text-background">
              <Link href={`events/${eventID}`}>Go to your event</Link>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};
