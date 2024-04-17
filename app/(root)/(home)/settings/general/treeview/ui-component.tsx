import React from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

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
