import React from "react"

interface LDDecisionResultType {
  ldFlagDecision: {
    reason: {
      kind: string;
    }
    value: string;
    variationIndex: number;
  };
  gptActivationDecision: {
    flag_name: string;
    relevance: number;
    reasoning: string;
    context_alignment: string;
  };
}

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
  contextForDisplay: UserContext
}

  

export function LDSidePanel({ decision, contextForDisplay }: LDSidePanelProps){
  return (
    <div className="bg-gray-100 p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Experiment Details</h2>
      <div className="mb-4">
        <p className="font-medium">Flag Decision:</p>
        <p className="text-green-600 font-bold">{decision && decision.ldFlagDecision.value ? "Active" : "Inactive"}</p>
      </div>
      {contextForDisplay ? (
        <div className="mb-4">
          <p className="font-medium">Context:</p>
          <p className="font-bold"><span>Key: </span><span className="font-medium">{`${JSON.stringify(contextForDisplay.key)}`}</span></p>
          <p className="font-bold"><span>Kind: </span><span className="font-medium">{`${JSON.stringify(contextForDisplay.kind)}`}</span></p>
          <p className="font-medium">--- Custom Attributes ---</p>
          {Object.keys(contextForDisplay.custom).map((item: string, index: number)=> {
            const attribute = contextForDisplay.custom[item as keyof typeof contextForDisplay.custom];
            return item === 'affinities' ? (
              <div key={index}>
                <p className="font-bold">Affinities</p>
                {attribute.map((affinity: string, index: number) => {
                  return (
                    <p key={index} className="font-medium">{affinity}</p>
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

      <h3 className="text-md font-semibold mb-2">GPT Activation Decision</h3>
      <div className="mb-2">
        <p className="font-medium">Flag Name:</p>
        <p>{decision ? decision.gptActivationDecision.flag_name : "None"}</p>
      </div>
      <div className="mb-2">
        <p className="font-medium">Relevance:</p>
        <p>{decision ? decision.gptActivationDecision.relevance : "None"}</p>
      </div>
      <div className="mb-2">
        <p className="font-medium">Context Alignment:</p>
        <p className="capitalize">{decision ? decision.gptActivationDecision.context_alignment : "None"}</p>
      </div>
      <div className="mb-4">
        <p className="font-medium">Reasoning:</p>
        <p className="text-sm text-gray-700">{decision ? decision.gptActivationDecision.reasoning : "None"}</p>
      </div>
    </div>
  )
}