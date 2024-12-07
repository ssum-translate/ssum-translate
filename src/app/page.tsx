"use client";

import Image from "next/image";
import { ChangeEvent, useReducer, useRef, useState } from "react";

import doubleArrow from "@/assets/icons/double-arrow.svg";
import closeIcon from "@/assets/icons/close.svg";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";

import Header from "@/components/header/header";
import Textarea from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

const USER_TYPE = {
  MALE: "male",
  FEMALE: "female",
} as const;

type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export default function Home() {
  const [userType, setUserType] = useState<UserType>(USER_TYPE.FEMALE);
  const [descriptionText, setDescriptionText] = useState("");
  const [translateText, setTranslateText] = useState("");

  const toggleUserType = () => {
    const nextUserType = userType === USER_TYPE.FEMALE ? USER_TYPE.MALE : USER_TYPE.FEMALE;

    setUserType(nextUserType);
  };

  const handleChangeTranslateText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTranslateText(event.target.value);
  };

  const handleChangeDescriptionText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionText(event.target.value);
  };

  const clearTranslateText = () => {
    setTranslateText("");
  };

  return (
    <div>
      <Header title="남자어, 여자어 번역기" />
      <FilterBar userType={userType} toggleUserType={toggleUserType} />
      <DescriptionTextarea value={descriptionText} onChange={handleChangeDescriptionText} />
      <TranslateTextarea
        userType={userType}
        value={translateText}
        onChange={handleChangeTranslateText}
        clearTranslateText={clearTranslateText}
      />
      <TranslateResult userType={userType} gptTranslatedText="" />
      <button
        type="button"
        className={cn(
          "flex justify-center items-center max-w-[358px] w-full py-3.5 rounded-full text-white bg-[#8949FF] font-bold mx-auto disabled:text-[#BCBCBC] disabled:bg-[#E8E8E8]",
        )}
        disabled={!translateText}
      >
        번역하기
      </button>
    </div>
  );
}

type FilterBarProps = {
  userType: UserType;
  toggleUserType: () => void;
};

function FilterBar({ userType, toggleUserType }: FilterBarProps) {
  return (
    <div className="flex justify-between items-center py-3 px-4 font-semibold">
      <div className="w-[135px] text-center">{userType === USER_TYPE.FEMALE ? "여자어" : "남자어"}</div>
      <div
        className="w-14 h-8 flex justify-center items-center border rounded-full cursor-pointer border-[#8949FF] bg-[#F6F0FF]"
        role="button"
        onClick={toggleUserType}
      >
        <Image src={doubleArrow} alt="" />
      </div>
      <div className="w-[135px] text-center">{userType === USER_TYPE.FEMALE ? "남자어" : "여자어"}</div>
    </div>
  );
}

type TranslateTextareaProps = {
  userType: UserType;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  clearTranslateText: () => void;
};

function TranslateTextarea({ userType, value, onChange, clearTranslateText }: TranslateTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;

    if (!textarea || !hiddenTextarea) {
      return;
    }

    onChange(event);

    hiddenTextarea.value = value;
    hiddenTextarea.style.height = "auto";
    textarea.style.height = `${hiddenTextarea.scrollHeight}px`;
  };

  return (
    <div className="min-h-[112px] py-6 px-4 border shadow-sm  border-[#EEEEEE]">
      <div className="flex justify-between items-center">
        <label
          className={cn({
            "text-[#FF3A3A]": userType === USER_TYPE.FEMALE,
            "text-[#3C5CFF]": userType === USER_TYPE.MALE,
          })}
        >
          {userType === USER_TYPE.FEMALE ? "여자어" : "남자어"}
        </label>
        {value.length > 0 && (
          <button type="button" onClick={clearTranslateText}>
            <Image src={closeIcon} alt="" />
          </button>
        )}
      </div>
      <Textarea
        ref={textareaRef}
        className="mt-2 scrollbar-hide h-6"
        placeholder="번역할 내용을 입력해주세요"
        value={value}
        onChange={handleChange}
      />
      <Textarea ref={hiddenTextareaRef} className="sr-only h-6" />
    </div>
  );
}

type TranslateResultProps = {
  userType: UserType;
  gptTranslatedText: string;
};

function TranslateResult({ userType, gptTranslatedText }: TranslateResultProps) {
  return (
    <div className="pt-6 pb-4 px-4">
      <div className="flex justify-between items-center">
        <div
          className={cn("font-medium", {
            "text-[#FF3A3A]": userType === USER_TYPE.MALE,
            "text-[#3C5CFF]": userType === USER_TYPE.FEMALE,
          })}
        >
          {userType === USER_TYPE.FEMALE ? "남자어" : "여자어"}
        </div>
        <div className="font-semibold text-[#8949FF] underline cursor-pointer" role="button">
          상대는 어떤 사람?
        </div>
      </div>
      <div className="mt-2 text-2xl font-semibold min-h-14">{gptTranslatedText}</div>
    </div>
  );
}

type DescriptionTextareaProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

function DescriptionTextarea({ value, onChange }: DescriptionTextareaProps) {
  const [isOpen, toggle] = useReducer((state) => !state, false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    const hiddenTextarea = hiddenTextareaRef.current;

    if (!textarea || !hiddenTextarea) {
      return;
    }

    onChange(event);

    hiddenTextarea.value = value;
    hiddenTextarea.style.height = "auto";
    textarea.style.height = `${hiddenTextarea.scrollHeight}px`;
  };

  return (
    <div className="p-4 bg-[#FAFAFA] w-full mx-auto">
      <div className="flex justify-between items-center cursor-pointer" role="button" onClick={toggle}>
        <div className="font-semibold text-[#595959]">더 기똥찬 번역 결과를 보고 싶다면?</div>
        <Image className={cn({ "rotate-180": isOpen })} src={arrowDownIcon} alt="" />
      </div>
      {isOpen && (
        <div className="mt-4 space-y-2">
          <Textarea
            ref={textareaRef}
            className="bg-[#FAFAFA] text-base placeholder:text-base scrollbar-hide h-6"
            value={value}
            placeholder="전후 사정을 입력해주시면 더 정확한 결과를 알려드려요"
            onChange={handleChange}
          />
          <Textarea ref={hiddenTextareaRef} className="sr-only h-6" />
        </div>
      )}
    </div>
  );
}
