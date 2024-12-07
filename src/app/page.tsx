"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useReducer, useRef, useState, useTransition } from "react";

import dynamic from "next/dynamic";

// 외부 패키지를 동적 로드
const ReactLottiePlayer = dynamic(() => import("react-lottie-player"), { ssr: false });

import doubleArrow from "@/assets/icons/double-arrow.svg";
import closeIcon from "@/assets/icons/close.svg";
import arrowDownIcon from "@/assets/icons/arrow-down.svg";
import starIcon from "@/assets/icons/star.svg";

import Header from "@/components/header/header";
import Textarea from "@/components/ui/textarea";
import OptionForm, { OptionData } from "@/components/option";
import { useForm, FormProvider } from "react-hook-form";
import { context } from "./data";
import * as animationData from "@/assets/lotties/loader.json";

import { cn } from "@/lib/utils";
import { sendChatGPT } from "./actions";

const USER_TYPE = {
  MALE: "male",
  FEMALE: "female",
} as const;

type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

interface Result {
  translatedText: string;
  detailDescription: string;
}

export default function Home() {
  const [userType, setUserType] = useState<UserType>(USER_TYPE.FEMALE);
  const [descriptionText, setDescriptionText] = useState("");
  const [translateText, setTranslateText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState({
    translatedText: "",
    detailDescription: "",
  });
  const [isPending, startTransition] = useTransition();

  const methods = useForm<OptionData>();

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

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const handleTranslateButtonClick = async () => {
    const { age, relation, mbti } = methods.getValues();
    const data = `{
    "age": ${age},
    "relation": ${relation},
    "userType": ${userType === "female" ? "여성" : "남성"},
    "mbti": ${mbti},
    "descriptionText": ${descriptionText},
    "translateText": ${translateText},
}`;

    startTransition(async () => {
      const res = await sendChatGPT(context, data);
      setResult(res);
    });
  };

  return (
    <div>
      <Header />
      <FilterBar userType={userType} toggleUserType={toggleUserType} />
      <DescriptionTextarea value={descriptionText} onChange={handleChangeDescriptionText} />
      <TranslateTextarea
        userType={userType}
        value={translateText}
        onChange={handleChangeTranslateText}
        clearTranslateText={clearTranslateText}
      />
      <TranslateResult
        isLoading={isPending}
        userType={userType}
        gptTranslatedText={result}
        onOpenBottomSheet={handleOpenBottomSheet}
      />
      <button
        type="button"
        className={cn(
          "flex justify-center items-center max-w-[358px] w-full py-3.5 rounded-2xl text-white bg-[#8949FF] font-bold mx-auto disabled:text-[#BCBCBC] disabled:bg-[#E8E8E8]",
        )}
        onClick={handleTranslateButtonClick}
        disabled={!translateText || isPending}
      >
        번역하기
      </button>
      {isOpen && (
        <FormProvider {...methods}>
          <OptionForm onCloseBottomSheet={handleCloseBottomSheet} />
        </FormProvider>
      )}
    </div>
  );
}

type FilterBarProps = {
  userType: UserType;
  toggleUserType: () => void;
};

function FilterBar({ userType, toggleUserType }: FilterBarProps) {
  return (
    <div className="flex justify-between items-center py-3 px-4 font-semibold border-b border-[#EEEEEE]">
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
    <div className="min-h-[112px] py-6 px-4 border border-[#EEEEEE]">
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
  gptTranslatedText: Result;
  onOpenBottomSheet: () => void;
  isLoading: boolean;
};

function TranslateResult({ isLoading, userType, gptTranslatedText, onOpenBottomSheet }: TranslateResultProps) {
  return (
    <div className="pt-6 pb-4 px-4">
      <div className="flex justify-between items-center">
        <div className={cn("font-medium")}>{userType === USER_TYPE.FEMALE ? "남자어" : "여자어"}</div>
        <div
          className="font-semibold text-[#8949FF] underline cursor-pointer"
          role="button"
          onClick={onOpenBottomSheet}
        >
          상대는 어떤 사람?
        </div>
      </div>
      {!isLoading ? (
        <div className="mt-2 text-xl font-semibold min-h-14">
          <p>{gptTranslatedText.translatedText}</p>

          {gptTranslatedText.translatedText && (
            <div
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                color: "#8949FF",
                background: "#F6F0FF",
                marginTop: "16px",
              }}
              className="rounded-lg max-w-[358px] mx-auto"
            >
              <p style={{ display: "flex", gap: "4px" }}>
                <Image src={starIcon} alt="" />
                <span style={{ fontWeight: "600", fontSize: "16px" }}>문장 해석</span>
              </p>
              <div style={{ fontWeight: "400", fontSize: "16px" }}>
                <TextTypingAnimation text={gptTranslatedText.detailDescription} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <ReactLottiePlayer loop animationData={animationData} play />
      )}
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
        <div className="mt-4">
          <Textarea
            ref={textareaRef}
            className="text-base placeholder:text-sm placeholder:whitespace-pre-line scrollbar-hide bg-white border border-[#EEEEEE] rounded-[8px] p-2 h-24"
            value={value}
            placeholder={`전후 사정을 입력해주시면 더 정확한 결과를 알려드려요.\nex) 데이트 중 저녁메뉴를 정하고 있는 상황, 3년 장기연애해서 편안한 커플사이, 썸녀가 나에게 질문을 하고 있는 상황 등`}
            onChange={handleChange}
          />
          <Textarea ref={hiddenTextareaRef} className="sr-only h-24" />
        </div>
      )}
    </div>
  );
}

interface TextTypingAnimationProps {
  text: string;
}

const TextTypingAnimation = ({ text }: TextTypingAnimationProps) => {
  const [sequence, setSequence] = useState<string>("");
  const [textCount, setTextCount] = useState<number>(0);
  const [isTypingPaused, setIsTypingPaused] = useState<boolean>(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (textCount >= text.length) {
        setIsTypingPaused(true);
        return;
      }

      const nextChar = text[textCount];
      setSequence((prevSequence) => prevSequence + nextChar);

      if (nextChar === "\n") {
        setTextCount((prevCount) => prevCount + 2);
      } else {
        setTextCount((prevCount) => prevCount + 1);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [text, textCount, isTypingPaused]);

  return (
    <p className="landing-p whitespace-pre-line break-normal">
      {sequence}
      <span className="inline-block align-top w-0.5 h-[1em] ml-1 blink" />
    </p>
  );
};
