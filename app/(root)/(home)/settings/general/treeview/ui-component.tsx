import React from "react";
import { Button } from "@/components/ui/button";
import { Check, CirclePlus, SquareX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BeatLoader } from "react-spinners";

interface buttonProps {
  onAddClick: () => void;
}

export const ButtonNew: React.FC<buttonProps> = ({ onAddClick }) => (
  <Button variant="ghost" className="p-1" onClick={onAddClick}>
    <CirclePlus height={20} width={20} />
  </Button>
);

interface headerProps {
  title: string;
  count: number;
}

export const HeaderTreeview: React.FC<headerProps> = ({ title, count }) => (
  <p className="text-[14px]">
    {title} ({count})
  </p>
);

interface inputCreateProps {
  inputName: string;
  placeholder: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export const FormInputNewCountry: React.FC<inputCreateProps> = ({
  inputName,
  placeholder,
  onSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex space-x-2 items-center justify-end w-full">
        <Input
          name={inputName}
          type="text"
          placeholder={placeholder}
          className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
        />
        <div className="ml-auto flex items-center">
          <button type="submit" className="icon-button">
            <Check
              height={25}
              width={25}
              className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
            />
          </button>
          <SquareX
            height={25}
            width={25}
            onClick={onCancel}
            className="cursor-pointer hover:bg-sidebar-background"
          />
        </div>
      </div>
    </form>
  );
};

interface inputCreateTreeviewProps {
  inputName: string;
  placeholder: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  parentID?: number;
}

export const FormInputNewTreeview: React.FC<inputCreateTreeviewProps> = ({
  inputName,
  placeholder,
  onSubmit,
  onCancel,
  parentID,
}) => {
  return (
    <form onSubmit={onSubmit}>
      {parentID && <input type="hidden" name="parentID" value={parentID} />}
      <div className="flex space-x-2 items-center justify-end w-full">
        <Input
          name={inputName}
          type="text"
          placeholder={placeholder}
          className="w-full h-[30px] focus:ring-0 focus-visible:ring-1 capitalize"
        />
        <div className="ml-auto flex items-center">
          <button type="submit" className="icon-button">
            <Check
              height={25}
              width={25}
              className="cursor-pointer justify-end hover:bg-sidebar-background mr-1"
            />
          </button>
          <SquareX
            height={25}
            width={25}
            onClick={onCancel}
            className="cursor-pointer hover:bg-sidebar-background"
          />
        </div>
      </div>
    </form>
  );
};

export const Loader: React.FC = () => (
  <div className="flex items-center justify-center mt-5 mb-2">
    <BeatLoader color="#253A79" />
  </div>
);
