import React from "react"
import { LDDecisionResultType } from "@/types/decision";

interface UserContext {
  key: string;
  kind: string;
  anonymous?: boolean;
  custom: {
    affinities: string[];
  };
}

interface LDSidePanelProps {
  decision: LDDecisionResultType | null;
  contextForDisplay: UserContext;
}

export function LDSidePanel({ decision, contextForDisplay }: LDSidePanelProps){
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-md font-semibold mb-2">Experiment Details</h2>
      <div className="mb-4">
        <p className="font-medium text-sm italic">Flag Decision:</p>
        <p className="text-green-600 font-bold text-sm">{decision && decision.ldFlagDecision.value ? "Active" : "Inactive"}</p>
      </div>
      {contextForDisplay ? (
        <div className="relative mb-4">
          <p className="font-medium text-sm italic">Context:</p>
          <p className="font-bold text-xs"><span>Key: </span><span className="font-medium">{`${JSON.stringify(contextForDisplay.key)}`}</span></p>
          <p className="font-bold text-xs"><span>Kind: </span><span className="font-medium">{`${JSON.stringify(contextForDisplay.kind)}`}</span></p>
          <p className="font-medium text-sm italic mt-4">Custom Attributes:</p>
          {Object.keys(contextForDisplay.custom).map((item: string, index: number)=> {
            const attribute = contextForDisplay.custom[item as keyof typeof contextForDisplay.custom];
            return item === 'affinities' ? (
              <div key={index}>
                <p className="font-bold text-sm">Affinities:</p>
                {attribute.map((affinity: string, index: number) => {
                  return (
                    <p key={index} className="font-medium text-xs">{affinity}</p>
                  )
                })}
              </div>
            ) : (
              <p key={index} className="font-bold">{`${item}: ${attribute}`}</p>
            )
          })}
        </div>
        ) : (
        <div className="mb-4">
          <p className="font-medium">Context:</p>
          <p className="font-bold">"No Context"</p>
        </div>
      )}

      <h2 className="text-md font-semibold mb-2 mt-8">GPT Activation Decision</h2>
      <div className="mb-2">
        <p className="font-semibold text-xs">Flag Name:</p>
        <p className="text-xs">{decision ? decision.gptActivationDecision.flag_name : "None"}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold text-xs">Relevance:</p>
        <p className="text-xs">{decision ? decision.gptActivationDecision.relevance : "None"}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold text-xs">Context Alignment:</p>
        <p className="capitalize text-xs">{decision ? decision.gptActivationDecision.context_alignment : "None"}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold text-xs">Reasoning:</p>
        <p className="text-xs text-gray-700 text-xs">{decision ? decision.gptActivationDecision.reasoning : "None"}</p>
      </div>
    </div>
  )
}